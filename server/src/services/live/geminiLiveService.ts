import WebSocket from 'ws';
import { env } from '../../config/env';

const GEMINI_HOST = 'generativelanguage.googleapis.com';

export class GeminiLiveService {
  private geminiWs: WebSocket | null = null;
  private clientWs: WebSocket;

  constructor(clientWs: WebSocket) {
    this.clientWs = clientWs;
  }

  public start() {
    if (!env.geminiApiKey) {
      this.clientWs.send(JSON.stringify({ type: 'error', text: 'GEMINI_API_KEY is not configured on the server.' }));
      return;
    }

    const url = `wss://${GEMINI_HOST}/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent?key=${env.geminiApiKey}`;
    this.geminiWs = new WebSocket(url);

    this.geminiWs.on('open', () => {
      console.log('Connected to Gemini Live API');
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
  }
}
