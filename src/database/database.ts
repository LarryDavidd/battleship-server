import Game from '../model/Game';

export interface Player {
  playerId: number;
  name: string;
  password: string;
  wins: number;
}

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
}

export const database = new Database();
