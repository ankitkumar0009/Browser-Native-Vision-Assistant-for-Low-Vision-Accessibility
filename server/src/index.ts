import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import visionRoutes from './routes/visionRoutes';
import { GeminiLiveService } from './services/geminiLiveService';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/vision', visionRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

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

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
