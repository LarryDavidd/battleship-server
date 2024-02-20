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

  constructor() {
    this.players = [];
    this.rooms = [];
  }

  public getPlayer = (id: number) => this.players.find((player) => player.playerId === id);

  public addPlayer = (player: Player) => this.players.push(player);

  public addRoom = (id: number, player: Player) =>
    this.rooms.push({ roomId: id, roomUsers: [{ index: player.playerId, name: player.name }] });
}

export const database = new Database();
