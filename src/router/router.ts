import { registration } from '@/controllers/registration';
import { IMessage, RouterType, IRoutes } from '@/types';

export const routes: IRoutes = {
  'reg': registration,
};

export const router: RouterType = (message, ws) => {
  try {
    const parseMessage: IMessage = JSON.parse(message.toString());
    const { type } = parseMessage;
    const route = routes[type];
    if (route) route(parseMessage, ws)
    else throw Error(`Unknown message type "${type}".`);
  }
}
