import { database } from '../database/database';
import Player from '../model/Player';
import { IMessage, WebSocketClient } from '../types';

export const registration = (wsClient: WebSocketClient, message: IMessage) => {
  const { type, data } = message;
  const { name, password } = JSON.parse(data);

  const player = new Player(0, name, password);
  wsClient.playerId = 0;

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
