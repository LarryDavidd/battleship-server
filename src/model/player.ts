import { WebSocketClient } from '@/types';

export default class Player {
  static staticIndex: number = 0;
  public ws: WebSocketClient;
  public playerId: number;
  public name: string;
  public password: string;
  public wins: number;

  constructor(name: string, password: string) {
    this.playerId = Player.staticIndex;
    this.name = name;
    this.password = password;
    this.wins = 0;
    Player.staticIndex++;
  }
}
