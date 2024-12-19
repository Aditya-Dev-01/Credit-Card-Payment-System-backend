import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database';
import { setupWebSocket } from './config/websocket';
import { errorHandler } from './middleware/error';
import paymentRoutes from './routes/paymentRoutes';
import cardRoutes from './routes/cardRoutes';

dotenv.config();

const app = express();
const server = http.createServer(app);

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/payment', paymentRoutes);
app.use('/api/card', cardRoutes);

// Error handling
app.use(errorHandler);

// Connect to MongoDB
connectDatabase();

// Setup WebSocket
const io = setupWebSocket(server);

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`WebSocket server is ready for connections`);
  console.log(`Accepting connections from: ${corsOptions.origin}`);
});

export { app, io };