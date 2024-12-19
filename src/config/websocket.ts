import { Server as HTTPServer } from 'http';
import { Server as SocketServer, Socket } from 'socket.io';
import { handlePaymentProcessing } from '../websocket/handler';

export const setupWebSocket = (server: HTTPServer): SocketServer => {
  const io = new SocketServer(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"]
    }
  });

  io.on('connection', (socket: Socket) => {
    console.log('Client connected:', socket.id);

    socket.on('process-payment', async (data) => {
      console.log('Received payment request:', data);
      try {
        const result = await handlePaymentProcessing(data);
        console.log('Payment result:', result);
        socket.emit('payment-response', result);
      } catch (error) {
        console.error('Payment processing error:', error);
        socket.emit('payment-error', error instanceof Error ? error.message : 'Payment processing failed');
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
};
