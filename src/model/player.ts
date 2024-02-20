import { WebSocketClient } from '@/types';

export default class Player {
  public ws: WebSocketClient;
  public playerId: number;
  public name: string;
  public password: string;
  public wins: number;

  constructor(playerId: number, name: string, password: string) {
    this.playerId = playerId;
    this.name = name;
    this.password = password;
    this.wins = 0;
  }
}
