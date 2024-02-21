import Player from "../model/Player";
import { database } from "../database/database";
import { IMessage, WebSocketClient } from "../types";
import Game from "../model/Game";

export const addUserToRoom = async (wsClient: WebSocketClient, message: IMessage) => {
  const { data } = message;
  const { indexRoom } = JSON.parse(data);
  const player: Player = database.getPlayer(wsClient.playerId)!;
  createGame()
  const response = JSON.stringify({
    'create_game'
    data: JSON.stringify({
      idGame: gameId,
      idPlayer: player.playerId,
    }),
  });
  wsClient.send(response);
};

const createGame = (player: Player): number => {
  const gameId = 0;
  database.games.push(new Game(gameId, player))
  return gameId;
}
