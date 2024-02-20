import { database } from '../database/database';
import Player from '../model/Player';
import { IMessage, WebSocketClient } from '../types';

export const registration = (wsClient: WebSocketClient, message: IMessage) => {
  const { type, data } = message;
  console.log(data);
  const { name, password } = data;

  const player = new Player(0, name, password);
  console.log(player);

  database.addPlayer(player);
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
