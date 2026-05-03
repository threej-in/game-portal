
define([],
function() {
    var isLocalHost = window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1";
    var socketPort = window.THREEJ_BROWSERQUEST_PORT ||
        (isLocalHost ? 8000 : window.location.port);

    var config = {
        dev: { host: "localhost", port: 8000, dispatcher: false },
        build: {
            host: window.THREEJ_BROWSERQUEST_HOST || window.location.hostname,
            port: socketPort,
            dispatcher: false
        }
    };

    return config;
});
