import Player from '../model/Player';
import { IMessage, WebSocketClient } from '../types';

const players = [];

export const registration = (message: IMessage, wsClient: WebSocketClient) => {
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
