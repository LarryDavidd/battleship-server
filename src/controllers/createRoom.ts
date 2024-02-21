import { IMessage, WebSocketClient } from '../types';
import { database } from '../database/database';
import Game from '../model/Game';
import Player from '../model/Player';

export interface ISWMessage {
  type: string;
  data: string;
  id: number;
}

export const createRoom = (ws: WebSocketClient, _incomingMessage: IMessage) => {
  const player = database.getPlayer(ws.playerId)!;
  database.addRoom(0, player);
  ws.gameId = createGame(player);
  const message: ISWMessage = {
    type: 'update_room',
    data: JSON.stringify(database.rooms),
    id: 0,
  };
  ws.send(JSON.stringify(message));
  // updadeGame()
};

const createGame = (player: Player): number => {
  const gameId = 0;
  database.games.push(new Game(gameId, player));
  return gameId;
};
