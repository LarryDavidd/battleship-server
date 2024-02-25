import { createMessage } from '../utils/createMessge';
import { database } from '../database/database';
import Player from '../model/Player';
import { IMessage, WebSocketClient } from '../types';
import { updateRoomsData, updateWinnersData } from '../utils/update';

export const registration = (wsClient: WebSocketClient, message: IMessage) => {
  const { data } = message;
  const { name, password } = JSON.parse(data);

  const player = getPlayer(wsClient, name, password);
  database.addWsClient(wsClient);

  const response = createMessage(
    'reg',
    JSON.stringify({
      name: name,
      index: player.playerId,
      error: false,
      errorText: '',
    }),
  );
  wsClient.send(response);
  updateRoomsData(wsClient);
  updateWinnersData(wsClient);
};

const getPlayer = (wsClient: WebSocketClient, name: string, password: string) => {
  const oldPlayer = database.getPlayerByNamePassword(name, password);
  if (oldPlayer === null) {
    const player = new Player(name, password);
    wsClient.playerId = player.playerId;
    database.addPlayer(player);
    return player;
  } else {
    wsClient.playerId = oldPlayer.playerId;
    return oldPlayer;
  }
};
