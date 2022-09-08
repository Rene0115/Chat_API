import { Server } from 'socket.io';
import pino from 'pino';

const logger = pino();

const io = new Server(3000, {
  cors: {
    origin: ['http://localhost:8080']
  }
});

io.on('connection', (socket) => {
  logger.info(socket.id);
  socket.on('send-message', (message) => {
    socket.broadcast.emit('receive-message', message);
    logger.info(message);
  });
});

export default logger;
