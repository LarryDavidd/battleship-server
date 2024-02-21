import Player from '../model/Player';
import Game from '../model/Game';

export interface Room {
  roomId: number;
  roomUsers: RoomUserType[];
}

export type RoomUserType = {
  name: string;
  index: number;
};

class Database {
  players: Player[];
  rooms: Room[];
  games: Game[];

  constructor() {
    this.players = [];
    this.rooms = [];
    this.games = [];
  }

  public getPlayer = (id: number) => this.players.find((player) => player.playerId === id);

  public addPlayer = (player: Player) => this.players.push(player);

  public addRoom = (id: number, player: Player) =>
    this.rooms.push({ roomId: id, roomUsers: [{ index: player.playerId, name: player.name }] });

  public getRoom = (index: number) => this.rooms.find((room) => room.roomId === index);

  public setUserToRoom = (player: Player, indexRoom: number) =>
    this.rooms.push({ roomId: indexRoom, roomUsers: [{ name: player.name, index: player.playerId }] });
}

export const database = new Database();
