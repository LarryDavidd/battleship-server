import { IMessage, WebSocketClient } from '../types';
import { database } from '../database/database';

export interface ISWMessage {
  type: string;
  data: string;
  id: number;
}

export const createRoom = (ws: WebSocketClient, _incomingMessage: IMessage) => {
  const player = database.getPlayer(ws.playerId)!;
  console.log(player);
  database.addRoom(0, player);
  const message: ISWMessage = {
    type: 'update_room',
    data: JSON.stringify(database.rooms),
    id: 0,
  };
  ws.send(JSON.stringify(message));
};
