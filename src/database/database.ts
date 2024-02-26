import Player from '../model/Player';
import Game from '../model/Game';
import { WebSocketClient } from '../types';

export interface Room {
  roomId: number;
  roomUsers: RoomUserType[];
}

export type RoomUserType = {
  name: string;
  index: number;
};

export interface Winner {
  name: string;
  wins: number;
}

export type wsClientsType = Map<number, WebSocketClient>;

class Database {
  wsClients: wsClientsType;
  players: Player[];
  rooms: Room[];
  games: Game[];
  winners: Winner[];

  constructor() {
    this.wsClients = new Map();
    this.players = [];
    this.rooms = [];
    this.games = [];
    this.winners = [];
  }

  public getWsClientById = (id: number) => this.wsClients.get(id);

  public addWsClient = (wsClient: WebSocketClient) => this.wsClients.set(wsClient.playerId, wsClient);

  public getPlayer = (id: number) => this.players.find((player) => player.playerId === id);

  public getPlayerByNamePassword = (name: string, password: string) =>
    this.players.find((player) => player && player.name === name && player.password === password) || null;

  public addPlayer = (player: Player) => this.players.push(player);

  public addRoom = (id: number, player: Player) =>
    this.rooms.push({ roomId: id, roomUsers: [{ index: player.playerId, name: player.name }] });

  public getRoom = (index: number) => this.rooms.find((room) => room.roomId === index);

  public setUserToRoom = (player: Player, indexRoom: number) => {
    const room = this.getRoom(indexRoom);
    room?.roomUsers.push({ name: player.name, index: player.playerId });
  };

  public userInRoom = (index: number, roomId: number) => this.rooms[roomId].roomUsers[0].index === index;

  public set setWinner(name: string) {
    const winnerIndex = this.winners.findIndex((winner) => winner && winner.name === name);
    if (winnerIndex === null) this.winners.push({ name: name, wins: 1 });
    else this.winners[winnerIndex].wins++;
  }

  public get getWinners() {
    return this.winners;
  }
}

export const database = new Database();
