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
  socket.on('send-message', (message, room) => {
    if (room === '') {
      socket.broadcast.emit('receive-message', message); // tells server to send message to every socket  // sends request to all clients except client that made request
      logger.info(message);
    } else {
      socket.to(room).emit('receive-message, message');
    }
  });
});

export default logger;
