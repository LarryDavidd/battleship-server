import { httpServer } from './src/http_server';
import WebSocket, { WebSocketServer } from 'ws';
// import { randomUUID } from 'crypto';

const HTTP_PORT = 8181;
const WSS_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

console.log(`Start static ws server on the ${WSS_PORT} port!`);

const websocketServer = new WebSocketServer({ port: 3000 });

export default class Player {
  public playerId: number;
  public name: string;
  public password: string;
  public wins: number;

  constructor(playerId: number, name: string, password: string) {
    this.playerId = playerId;
    this.name = name;
    this.password = password;
    this.wins = 0;
  }
}

export interface IWebSocket extends WebSocketServer {
  socketId: string;
  gameId: number;
  playerId: number;
}

interface Command {
  type: string;
  data: {
    name: string;
    password: string;
  };
  id: number;
}

websocketServer.on('connection', function connection(ws) {
  console.log('Client connected');

  ws.on('message', function incoming(message) {
    console.log('Received: %s', message);
    const command: Command = JSON.parse(message.toString());
    const { type, data } = command;
    console.log(type, data);
    if (type === 'reg') registration(command, ws);
  });

  ws.send('Hello, client!');
});

const players = [];

const registration = (message: Command, wsClient: WebSocket) => {
  const { type, data } = message;
  const { name, password } = data;

  const player = new Player(0, name, password);

  players.push(player);
  const response = JSON.stringify({
    type,
    data: JSON.stringify({
      name: name,
      index: 0,
      error: false,
      errorText: '',
    }),
  });
  wsClient.send(response);
};
