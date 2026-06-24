var fs = require('fs');
var net = require('net');
var path = require('path');
var url = require('url');
var WebSocket = require('ws');

var DEFAULT_PROXY_PATH = '/tfm-ws';

function attach(httpServer, options) {
    options = options || {};

    if (process.env.TFM_PROXY_ENABLED === 'false') {
        log.info('TFM proxy disabled by TFM_PROXY_ENABLED=false');
        return;
    }

    var proxyPath = normalizeProxyPath(process.env.TFM_PROXY_PATH || options.path || DEFAULT_PROXY_PATH);
    var routes = loadRoutes(options.tokenSource);
    var routeCount = Object.keys(routes).length;

    if (!routeCount) {
        log.error('TFM proxy did not start because no token routes were loaded.');
        return;
    }

    var wss = new WebSocket.Server({ noServer: true });

    httpServer.on('upgrade', function tfmUpgrade(request, socket, head) {
        var parsedUrl = url.parse(request.url, true);

        if (normalizeProxyPath(parsedUrl.pathname) !== proxyPath) {
            return;
        }

        var route = routes[parsedUrl.query.token];

        if (!route) {
            socket.write('HTTP/1.1 403 Forbidden\r\n\r\n');
            socket.destroy();
            return;
        }

        wss.handleUpgrade(request, socket, head, function upgraded(ws) {
            wss.emit('connection', ws, request, route);
        });
    });

    wss.on('connection', function tfmConnection(ws, request, route) {
        var remoteAddress = request.socket && request.socket.remoteAddress ? request.socket.remoteAddress : 'unknown';
        var tcp = new net.Socket();
        var tcpReady = false;
        var closed = false;
        var pendingMessages = [];

        log.info('TFM proxy connection from ' + remoteAddress + ' to ' + route.host + ':' + route.port);

        tcp.on('connect', function connected() {
            if (closed || ws.readyState !== WebSocket.OPEN) {
                closeTcp(tcp);
                return;
            }

            tcpReady = true;
            pendingMessages.forEach(function flush(message) {
                writeTcp(tcp, message);
            });
            pendingMessages = [];
        });

        tcp.on('data', function data(chunk) {
            if (closed || ws.readyState !== WebSocket.OPEN) {
                closeTcp(tcp);
                return;
            }

            ws.send(chunk, function sent(err) {
                if (err) {
                    log.error('TFM websocket send error: ' + err.message);
                    closePair();
                }
            });
        });

        tcp.on('error', function error(err) {
            if (!isExpectedSocketClose(err)) {
                log.error('TFM TCP proxy error: ' + err.message);
            }
            closePair();
        });

        tcp.on('close', function close() {
            closePair();
        });

        ws.on('message', function message(data) {
            if (closed) {
                return;
            }

            var buffer = Buffer.isBuffer(data) ? data : Buffer.from(data);

            if (tcpReady) {
                writeTcp(tcp, buffer);
            } else {
                pendingMessages.push(buffer);
            }
        });

        ws.on('close', function close() {
            closePair();
        });

        ws.on('error', function error(err) {
            log.error('TFM websocket proxy error: ' + err.message);
            closePair();
        });

        tcp.connect(route.port, route.host);

        function closePair() {
            if (closed) {
                return;
            }

            closed = true;
            tcpReady = false;
            pendingMessages = [];
            closeTcp(tcp);
            closeWebSocket(ws);
        }
    });

    log.info('TFM proxy is listening on ' + proxyPath + ' with ' + routeCount + ' token routes.');
}

function closeWebSocket(ws) {
    if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
        ws.close();
    }
}

function closeTcp(tcp) {
    if (!tcp.destroyed) {
        tcp.destroy();
    }
}

function writeTcp(tcp, data) {
    if (tcp.destroyed || !tcp.writable) {
        return;
    }

    try {
        tcp.write(data);
    } catch (err) {
        if (!isExpectedSocketClose(err)) {
            log.error('TFM TCP write error: ' + err.message);
        }
        closeTcp(tcp);
    }
}

function isExpectedSocketClose(err) {
    return err && (err.code === 'ENOTCONN' || err.code === 'ECONNRESET' || err.code === 'EPIPE' || err.code === 'ECONNABORTED');
}

function normalizeProxyPath(proxyPath) {
    if (!proxyPath || proxyPath === '/') {
        return DEFAULT_PROXY_PATH;
    }

    if (proxyPath.charAt(0) !== '/') {
        proxyPath = '/' + proxyPath;
    }

    return proxyPath.replace(/\/+$/, '');
}

function loadRoutes(explicitTokenSource) {
    var tokenSource = explicitTokenSource || process.env.TFM_PROXY_TOKEN_SOURCE || findDefaultTokenSource();
    var routes = {};

    if (!tokenSource || !fs.existsSync(tokenSource)) {
        log.error('TFM proxy token source not found: ' + tokenSource);
        return routes;
    }

    fs.readFileSync(tokenSource, 'utf8')
        .split(/\r?\n/)
        .forEach(function parseLine(line) {
            var trimmed = line.trim();
            var match;

            if (!trimmed || trimmed.charAt(0) === '#') {
                return;
            }

            match = trimmed.match(/^([^:]+):\s*([^:]+):(\d+)$/);
            if (!match) {
                log.error('Skipping invalid TFM proxy token route: ' + trimmed);
                return;
            }

            routes[match[1]] = {
                host: match[2],
                port: parseInt(match[3], 10)
            };
        });

    log.info('Loaded TFM proxy token routes from ' + tokenSource);
    return routes;
}

function findDefaultTokenSource() {
    var candidates = [
        path.resolve(process.cwd(), 'tfm-browser-server/proxypaths'),
        path.resolve(process.cwd(), '../tfm-browser-server/proxypaths'),
        path.resolve(__dirname, '../../../tfm-browser-server/proxypaths')
    ];

    for (var i = 0; i < candidates.length; i += 1) {
        if (fs.existsSync(candidates[i])) {
            return candidates[i];
        }
    }

    return candidates[0];
}

module.exports = {
    attach: attach
};
