import { WebSocketClient } from '../types';
import { database } from '../database/database';
import { WebSocket } from 'ws';
import { createMessage } from './createMessge';

const setMessageForAll = (message: string): void => {
  database.wsClients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};

export const updateRoomsData = (wsClient: WebSocketClient): void => {
  const message = createMessage('update_room', JSON.stringify(database.rooms));
  wsClient.send(message);
};

export const updateRoomsDataAll = (): void => {
  const message = createMessage('update_room', JSON.stringify(database.rooms));
  setMessageForAll(message);
};

export const updateWinnersData = (wsClient: WebSocketClient): void => {
  const message = createMessage('update_winners', JSON.stringify(database.winners));
  wsClient.send(message);
};

export const updateWinnersDataAll = (): void => {
  const message = createMessage('update_winners', JSON.stringify(database.winners));
  setMessageForAll(message);
};
