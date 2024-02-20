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

export class Database {
  players: Player[];
  rooms: Room[];

  constructor() {
    this.players = [];
    this.rooms = [];
  }
}
