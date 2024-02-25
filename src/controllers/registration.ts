import { WebSocket } from 'ws';
import { database } from '../database/database';
import Player from '../model/Player';
import { IMessage, WebSocketClient } from '../types';

export const registration = (wsClient: WebSocketClient, message: IMessage) => {
  const { type, data } = message;
  const { name, password } = JSON.parse(data);

  const player = getPlayer(wsClient, name, password);
  database.addWsClient(wsClient);

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
  updateRoomInfo();
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

export const updateRoomInfo = (): void => {
  const { rooms, winners } = database;

  setMessageForAll(
    createMessage('update_room', {
      data: JSON.stringify(rooms),
      id: 0,
    }),
  );

  setMessageForAll(
    createMessage('update_winners', {
      data: JSON.stringify(winners),
      id: 0,
    }),
  );
};

const createMessage = (type: string, data: object): string => {
  return JSON.stringify({
    type,
    data: JSON.stringify(data),
  });
};

const setMessageForAll = (message: string): void => {
  database.wsClients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};
