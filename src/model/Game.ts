import { Player } from '../database/database';

export default class Game {
  public gameId: number;
  public players: Player[];
  public winner: number;
  public currentPlayer: number;

  constructor(gameId: number, player: Player) {
    this.gameId = gameId;
    this.players = [player];
    this.currentPlayer = player.playerId;
    this.winner = player.playerId;
  }
}
