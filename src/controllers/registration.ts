import { database } from '../database/database';
import Player from '../model/Player';
import { IMessage, WebSocketClient } from '../types';

export const registration = (wsClient: WebSocketClient, message: IMessage) => {
  const { type, data } = message;
  const { name, password } = JSON.parse(data);

  const player = getPlayer(wsClient, name, password);

  const response = JSON.stringify({
    type,
    data: JSON.stringify({
      name: name,
      index: player.playerId,
      error: false,
      errorText: '',
    }),
  });
  wsClient.send(response);
};

const getPlayer = (wsClient: WebSocketClient, name: string, password: string) => {
  const oldPlayer = database.getPlayerByNamePassword(name, password);
  if (oldPlayer === null) {
    const player = new Player(name, password);
    wsClient.playerId = 0;
    database.addPlayer(player);
    return player;
  } else {
    wsClient.playerId = oldPlayer.playerId;
    return oldPlayer;
  }
};
