# TFM Browser Backend

TFM Browser cannot use BrowserQuest's Socket.IO game protocol directly. It needs a plain WebSocket endpoint that proxies raw bytes to the official Transformice TCP servers.

This project now hosts that raw TCP bridge inside the existing BrowserQuest Node backend process:

```text
BrowserQuest Socket.IO: /socket.io
TFM TCP WebSocket proxy: /tfm-ws
```

No Python or `websockify` process is required.

## How It Works

The BrowserQuest server loads:

```text
browserquest-server/server/js/tfmproxy.js
```

That module:

- listens for WebSocket upgrades on `/tfm-ws`
- reads token routes from `tfm-browser-server/proxypaths`
- opens a TCP socket to the matching Transformice host and port
- pipes binary WebSocket traffic to TCP and TCP traffic back to the browser

The game page is served from:

```text
/games/tfm-browser/index.html
```

Transformice asset files are proxied by Next.js:

```text
/api/tfm-resource-proxy
```

## Production Nginx

Keep your existing BrowserQuest proxy for `/socket.io`, then add `/tfm-ws` to the same backend port.

```nginx
location /tfm-ws {
    proxy_pass http://127.0.0.1:8000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_read_timeout 3600s;
}
```

The browser will automatically use:

```text
wss://threej.in/tfm-ws/?token=...
```

## Environment Overrides

```bash
TFM_PROXY_ENABLED=false
TFM_PROXY_PATH=/tfm-ws
TFM_PROXY_TOKEN_SOURCE=/var/www/game-portal/tfm-browser-server/proxypaths
```

## Required Install Step

After pulling this change on production, install the BrowserQuest backend dependencies again so the direct `ws` dependency is present:

```bash
cd /var/www/game-portal/browserquest-server
npm install
pm2 restart browserquest
```
