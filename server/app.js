import { Server } from 'socket.io';
import pino from 'pino';

const logger = pino();

const io = new Server(3000);

io.on('connection', (socket) => {
  logger.info(socket.id);
});
