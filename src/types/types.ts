import { RawData, WebSocket } from 'ws';

export type WebSocketClient = WebSocket & {
  socketId: string;
  gameId: number;
  playerId: number;
};

export type RouterType = (incomingMessage: RawData, ws: WebSocketClient) => void;

export interface IRoutes {
  [key: string]: (incomingMessage: IMessage, ws: WebSocketClient) => void;
}

export interface IMessage {
  type: string;
  data: MessageData;
  id: number;
}

export type MessageData = {
  name: string;
  password: string;
};
