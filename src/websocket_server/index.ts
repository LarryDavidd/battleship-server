import { WebSocketServer } from 'ws';

const websocketServer = new WebSocketServer({ port: 3000 });

websocketServer.on('connection', function connection(ws) {
  console.log('Client connected');

  ws.on('message', function incoming(message) {
    console.log('Received: %s', message);
  });

  ws.send('Hello, client!');
});

export default websocketServer;
