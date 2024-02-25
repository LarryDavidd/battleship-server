import Player from '../model/Player';
import { database } from '../database/database';
import { IMessage, WebSocketClient } from '../types';
import { createMessage } from '../utils/createMessge';

export const addUserToRoom = (wsClient: WebSocketClient, message: IMessage) => {
  const { data } = message;
  const { indexRoom } = JSON.parse(data);
  const player: Player = database.getPlayer(wsClient.playerId)!;
  if (!database.userInRoom(player.playerId, indexRoom)) {
    database.setUserToRoom(player, indexRoom);
    createGame(indexRoom);
    const response = createMessage(
      'create_game',
      JSON.stringify({
        idGame: wsClient.gameId,
        idPlayer: player.playerId,
      }),
    );
    wsClient.send(response);
  }
};

const createGame = (indexRoom: number) => {
  const room = database.getRoom(indexRoom);
  const users = room?.roomUsers;
  users?.forEach((user) => user.index);
};
