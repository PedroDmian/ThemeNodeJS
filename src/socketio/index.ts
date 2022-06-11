
import { error } from 'loglevel';
import io, { Server, ServerOptions } from 'socket.io';
import { Server as HttpServer } from 'http';

// ? Values External "Configuration"
// import { createRedisAdapter } from './redis'
import { REDIS_URL, REDIS_AUTH, REDIS_ENABLED, SOCKET_ENABLED } from '../config';
import { configureSocketListeners } from './events';

/*
const socketOptions: ServerOptions = {
  path: '/socket.io', //! this is the default path but can be changed to anything
  transports: ['polling', 'websocket'],
  // transports: ['websocket'],
  pingInterval: 60000, // ! default 25000
  pingTimeout: 180000 // ! default 60000
}
*/

export let socketIO: Server = new io.Server();

export function createSocketServer (http: HttpServer): Server | any {
  if (SOCKET_ENABLED) {
    socketIO = new io.Server(http);

    /*if (REDIS_ENABLED) {
      console.info('Se va a configurar el adaptador de socket a REDIS 🔨')

      socketIO.adapter(createRedisAdapter(REDIS_URL, REDIS_AUTH))
    }*/

    configureSocketListeners(socketIO);
    console.log('SocketIO Server created ✅');

    return socketIO;
  } else {
    error(new Error('Se ha tratado de levantar Servidor Socket pero no esta habilitado en CONFIG 😢 \n'))
  }
}

export function getSocketInstance () {
  if (socketIO === null) {
    throw new Error('Socket instance is null');
  }
  return socketIO;
}
