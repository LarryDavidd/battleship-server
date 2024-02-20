import { router } from './src/router/router';
import { httpServer } from './src/http_server';
import { WebSocketServer } from 'ws';
import { WebSocketClient } from '@/types';
// import { randomUUID } from 'crypto';

const HTTP_PORT = 8181;
const WSS_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

console.log(`Start static ws server on the ${WSS_PORT} port!`);

const websocketServer = new WebSocketServer({ port: 3000 });

websocketServer.on('connection', function connection(ws: WebSocketClient) {
  console.log('Client connected');

  ws.on('message', (message) => router(message, ws));
  // function incoming(message) {
  //   console.log('Received: %s', message);
  //   const command: Command = JSON.parse(message.toString());

  // });

  // ws.send('Hello, client!');
});
