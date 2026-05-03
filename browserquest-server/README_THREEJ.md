# BrowserQuest Server

This folder contains the server side needed by the BrowserQuest card in the Threej Games portal.

The portal serves the BrowserQuest client from:

```text
/games/browserquest/index.html
```

The client expects a Socket.IO server on the same site in production, or on `localhost:8000` during local development.

## Local Run

Redis is required.

```bash
cd browserquest-server
npm install
npm run start
```

Then open the game from the portal:

```text
http://localhost:3000/play/browserquest
```

## VPS Run With PM2

```bash
cd /path/to/game-portal/browserquest-server
npm install
pm2 start npm --name browserquest -- run start
pm2 save
```

## Nginx

For production over `https://threej.in`, proxy Socket.IO traffic to the BrowserQuest server:

```nginx
location /socket.io/ {
    proxy_pass http://127.0.0.1:8000/socket.io/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

Keep your existing Next.js proxy for the rest of the site.

## Notes

This is based on the community `browserquest/BrowserQuest` fork because Mozilla's archived original depends on npm packages that are no longer installable from the public registry.
