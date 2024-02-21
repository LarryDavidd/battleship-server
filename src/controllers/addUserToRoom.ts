import Player from '../model/Player';
import { database } from '../database/database';
import { IMessage, WebSocketClient } from '../types';

export const addUserToRoom = async (wsClient: WebSocketClient, message: IMessage) => {
  const { data } = message;
  const { indexRoom } = JSON.parse(data);
  const player: Player = database.getPlayer(wsClient.playerId)!;
  database.setUserToRoom(player, indexRoom);
  const response = JSON.stringify({
    type: 'create_game',
    data: JSON.stringify({
      idGame: wsClient.gameId,
      idPlayer: player.playerId,
    }),
  });
  wsClient.send(response);
};
