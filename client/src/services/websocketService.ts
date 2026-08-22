type WsCallback = (type: string, payload: string) => void;

export class WebSocketService {
  private ws: WebSocket | null = null;
  private url: string;
  private onMessage: WsCallback;
  private onStatusChange: (status: 'ready' | 'offline' | 'error' | 'analyzing') => void;
  private reconnectInterval: any;
  public isPaused: boolean = false;

  constructor(
    url: string, 
    onMessage: WsCallback,
    onStatusChange: (status: 'ready' | 'offline' | 'error' | 'analyzing') => void
  ) {
    this.url = url;
    this.onMessage = onMessage;
    this.onStatusChange = onStatusChange;
  }

  connect() {
    if (this.ws?.readyState === WebSocket.OPEN) return;

    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      this.onStatusChange('ready');
      if (this.reconnectInterval) clearInterval(this.reconnectInterval);
    };

    this.ws.onmessage = (event) => {
      if (this.isPaused) return;
      try {
        const data = JSON.parse(event.data);
        this.onMessage(data.type, data.text);
      } catch (e) {
        console.error('Failed to parse WS message', e);
      }
    };

    this.ws.onclose = () => {
      this.onStatusChange('offline');
      this.ws = null;
      this.reconnectInterval = setTimeout(() => this.connect(), 5000);
    };

    this.ws.onerror = () => {
      this.onStatusChange('error');
    };
  }

  sendImage(base64: string) {
    if (this.ws?.readyState === WebSocket.OPEN && !this.isPaused) {
      this.ws.send(JSON.stringify({ type: 'image', data: base64 }));
    }
  }

  disconnect() {
    if (this.reconnectInterval) clearInterval(this.reconnectInterval);
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}
