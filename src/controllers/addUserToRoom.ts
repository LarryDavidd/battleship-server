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
  }
};

const createGame = (indexRoom: number) => {
  const room = database.getRoom(indexRoom);
  const users = room?.roomUsers;
  console.log(users);
  users?.forEach((user) => {
    const wsClient: WebSocketClient | undefined = database.getWsClientById(user.index);
    const response = createMessage(
      'create_game',
      JSON.stringify({
        idGame: wsClient?.gameId,
        idPlayer: user.index,
      }),
    );
    wsClient?.send(response);
  });
};
