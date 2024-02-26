import { addUserToRoom } from '../controllers/addUserToRoom';
import { createRoom } from '../controllers/createRoom';
import { registration } from '../controllers/registration';
import { IMessage, RouterType, IRoutes } from '../types';

export const routes: IRoutes = {
  reg: registration,
  create_room: createRoom,
  add_user_to_room: addUserToRoom,
};

export const router: RouterType = (ws, message) => {
  console.log(JSON.parse(message.toString()));
  try {
    const parseMessage: IMessage = JSON.parse(message.toString());
    const { type } = parseMessage;
    const route = routes[type];
    if (route) route(ws, parseMessage);
    else throw Error(`Unknown message type "${type}".`);
  } catch {
    throw Error('Router error');
  }
};
