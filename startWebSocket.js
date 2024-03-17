import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const WebSocket = require('ws');
import webSocketHandlers from './webSocketHandlers.js';

export default function startWebSocket(httpServer, app, expressSession) {
  const wss = new WebSocket.Server({ server: httpServer });
  const clientConnections = new Map();

  app.set('wss', wss);
  app.set('clientConnections', clientConnections);

  wss.on('connection', (ws, req) => {
    expressSession(req, {}, () => {
      const sessionId = req.session.id;
      ws.sessionId = sessionId;
      clientConnections.set(sessionId, ws);
    });

    ws.on('message', (message) => {
      if (message.toString() === 'clearHistory') {
        webSocketHandlers.clearHistory(ws);
        return;
      }
      if (message.toString() === 'Hello from client') {
        ws.send('Hello from server!');
        return;
      }
    });

    ws.on('error', (error) => {
      console.error('WebSocket Error:', error);
    });

    setTimeout(() => {
      ws.send('Websocket started');
    }, 1000);
  });

  console.log('* WebSocket Server started');
}
