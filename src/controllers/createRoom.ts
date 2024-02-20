import Player from '../model/Player';
import { WebSocketClient } from '../types';

export const createRoom = (ws: WebSocketClient) => {
  const player = this.playerController.getPlayerById(ws.playerId);
  ws.gameId = this.gameController.createGame(player);
  const response = this.createResponse(Action.CREATE_GAME, {
    idGame: ws.gameId,
    idPlayer: ws.playerId,
  });
  ws.send(response);
};
