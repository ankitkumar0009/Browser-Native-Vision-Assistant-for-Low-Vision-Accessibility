import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useCamera } from '../hooks/useCamera';
import { Button } from '../components/UI/Button';
import { Camera, StopCircle, AlertTriangle } from 'lucide-react';
import { useSpeech } from '../contexts/SpeechContext';

export default function LiveVision() {
  const { videoRef, startCamera, stopCamera, captureImageBase64, stream, error } = useCamera();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [description, setDescription] = useState<string | null>(null);
  const { speak } = useSpeech();
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Open WebSocket connection
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/live-vision`;
    
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('Connected to live vision websocket');
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'text') {
          setDescription(data.text);
          speak(data.text);
        } else if (data.type === 'error') {
          console.error('Backend error:', data.text);
        }
      } catch (err) {
        console.error('Error parsing WS message:', err);
      }
    };

    ws.onclose = () => {
      console.log('Disconnected from live vision websocket');
    };

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (stream) {
      interval = setInterval(() => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          const base64 = captureImageBase64();
          if (base64) {
            setIsAnalyzing(true);
            wsRef.current.send(JSON.stringify({ type: 'image', data: base64 }));
            // Set analyzing to false shortly after sending to simulate the "pulse"
            setTimeout(() => setIsAnalyzing(false), 1000);
          }
        }
      }, 1000); // Analyze 1 frame per second
    } else {
      setIsAnalyzing(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [stream]);

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Live Vision Mode</h1>
        <div className="bg-[var(--destructive)]/10 border-l-8 border-[var(--destructive)] p-4 rounded text-left flex gap-4 items-start">
          <AlertTriangle className="text-[var(--destructive)] shrink-0" size={32} />
          <p className="text-lg font-medium text-[var(--foreground)]">
            <strong>Warning:</strong> For safety, this application is an assistive tool and should not be used as the only source of information for navigation or emergency situations.
          </p>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        {!stream ? (
          <Button size="lg" onClick={startCamera} icon={<Camera size={24} />}>
            Start Camera
          </Button>
        ) : (
          <Button size="lg" variant="destructive" onClick={stopCamera} icon={<StopCircle size={24} />}>
            Stop Camera
          </Button>
        )}
      </div>

      {error && (
        <div className="text-[var(--destructive)] text-center text-xl font-bold p-4 bg-[var(--destructive)]/10 rounded-xl">
          {error}
        </div>
      )}

      <div className="relative rounded-2xl overflow-hidden border-8 border-[var(--secondary)] bg-black aspect-video flex items-center justify-center shadow-2xl">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          className={`w-full h-full object-cover ${!stream ? 'hidden' : ''}`}
        />
        {!stream && (
           <div className="text-white flex flex-col items-center gap-4">
             <Camera size={64} className="opacity-50" />
             <p className="text-xl">Camera is turned off</p>
           </div>
        )}
        
        {isAnalyzing && (
          <div className="absolute top-4 right-4 bg-black/75 text-white px-4 py-2 rounded-full flex items-center gap-2">
             <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
             Analyzing...
          </div>
        )}
      </div>

      {description && (
        <div className="p-8 border-4 border-[var(--primary)] rounded-2xl bg-[var(--secondary)]" aria-live="polite">
          <h2 className="text-2xl font-bold mb-4">Latest Description:</h2>
          <p className="text-2xl leading-relaxed">{description}</p>
        </div>
      )}
    </div>
  );
}
