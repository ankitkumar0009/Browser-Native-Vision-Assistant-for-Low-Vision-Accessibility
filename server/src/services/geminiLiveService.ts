import WebSocket from 'ws';
import { getMockImageDescription } from './mockVisionService';

const GEMINI_HOST = 'generativelanguage.googleapis.com';

export class GeminiLiveService {
  private geminiWs: WebSocket | null = null;
  private clientWs: WebSocket;
  private mockInterval: NodeJS.Timeout | null = null;

  constructor(clientWs: WebSocket) {
    this.clientWs = clientWs;
  }

  public start() {
    const apiKey = process.env.AI_API_KEY;

    if (!apiKey) {
      console.log('No AI_API_KEY found, using mock live vision service.');
      this.startMock();
      return;
    }

    const url = `wss://${GEMINI_HOST}/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent?key=${apiKey}`;
    this.geminiWs = new WebSocket(url);

    this.geminiWs.on('open', () => {
      console.log('Connected to Gemini Live API');
      // Send setup message
      const setupMsg = {
        setup: {
          model: 'models/gemini-2.0-flash-exp',
          generationConfig: {
            responseModalities: ["TEXT"],
          }
        }
      };
      this.geminiWs?.send(JSON.stringify(setupMsg));
    });

    this.geminiWs.on('message', (data) => {
      try {
        const response = JSON.parse(data.toString());
        if (response.serverContent && response.serverContent.modelTurn) {
          const parts = response.serverContent.modelTurn.parts;
          for (const part of parts) {
            if (part.text) {
               // Send the text back to the client
               this.clientWs.send(JSON.stringify({ type: 'text', text: part.text }));
            }
          }
        }
      } catch (err) {
        console.error('Error parsing Gemini response:', err);
      }
    });

    this.geminiWs.on('close', () => {
      console.log('Gemini Live API connection closed');
    });

    this.geminiWs.on('error', (error) => {
      console.error('Gemini Live API error:', error);
      this.clientWs.send(JSON.stringify({ type: 'error', text: 'Backend connection to Gemini failed.' }));
    });
  }

  public handleClientMessage(data: string) {
    try {
      const msg = JSON.parse(data);
      if (msg.type === 'image' && msg.data) {
        // Send image frame to Gemini
        if (this.geminiWs && this.geminiWs.readyState === WebSocket.OPEN) {
          const clientContent = {
            realtimeInput: {
              mediaChunks: [
                {
                  mimeType: 'image/jpeg',
                  data: msg.data
                }
              ]
            }
          };
          this.geminiWs.send(JSON.stringify(clientContent));
        } else if (!process.env.AI_API_KEY) {
          // Mock mode: ignoring incoming frames as we just mock every 10s
        }
      }
    } catch (err) {
      console.error('Error handling client message:', err);
    }
  }

  public stop() {
    if (this.geminiWs) {
      this.geminiWs.close();
      this.geminiWs = null;
    }
    if (this.mockInterval) {
      clearInterval(this.mockInterval);
      this.mockInterval = null;
    }
  }

  private startMock() {
    // Send a mock description every 10 seconds
    this.mockInterval = setInterval(() => {
      if (this.clientWs.readyState === WebSocket.OPEN) {
        const desc = getMockImageDescription();
        this.clientWs.send(JSON.stringify({ type: 'text', text: `(Mock) ${desc}` }));
      }
    }, 10000);
  }
}
