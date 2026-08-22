import express from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import { env } from './config/env';
import visionRoutes from './routes/visionRoutes';
import { GeminiLiveService } from './services/live/geminiLiveService';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(cors({ origin: env.clientUrl }));
app.use(express.json({ limit: '50mb' }));

app.use('/api/vision', visionRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Centralized error handler
app.use(errorHandler);

const server = createServer(app);
const wss = new WebSocketServer({ server, path: '/live-vision' });

wss.on('connection', (ws) => {
  console.log('Client connected to live vision websocket');
  const geminiLive = new GeminiLiveService(ws);
  
  geminiLive.start();

  ws.on('message', (message) => {
    geminiLive.handleClientMessage(message.toString());
  });

  ws.on('close', () => {
    console.log('Client disconnected from live vision websocket');
    geminiLive.stop();
  });
});

server.listen(env.port, () => {
  console.log(`Server running on port ${env.port} in ${env.nodeEnv} mode`);
});
