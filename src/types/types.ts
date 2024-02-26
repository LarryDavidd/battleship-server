import { RawData, WebSocket } from 'ws';

export type WebSocketClient = WebSocket & {
  socketId: string;
  gameId: number;
  playerId: number;
};

export type RouterType = (ws: WebSocketClient, incomingMessage: RawData) => void;

export interface IRoutes {
  [key: string]: (ws: WebSocketClient, incomingMessage: IMessage) => void;
}

export interface IMessage {
  type: string;
  data: string;
  id: number;
}

export type MessageData = {
  name: string;
  password: string;
};
