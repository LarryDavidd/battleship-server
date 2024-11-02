import { WebSocketClient } from '../types';
import { database } from '../database/database';
import Game from '../model/Game';
import Player from '../model/player';
import { updateRoomsDataAll } from '../utils/update';

export interface ISWMessage {
  type: string;
  data: string;
  id: number;
}

export const createRoom = (ws: WebSocketClient) => {
  const player = database.getPlayer(ws.playerId)!;
  database.addRoom(0, player);
  ws.gameId = createGame(player);
  updateRoomsDataAll();
};

const createGame = (player: Player): number => {
  const gameId = 0;
  database.games.push(new Game(gameId, player));
  return gameId;
};
