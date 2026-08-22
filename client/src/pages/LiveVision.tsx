import React, { useEffect, useState, useRef } from 'react';
import { useCamera } from '../hooks/useCamera';
import { useSpeech } from '../contexts/SpeechContext';
import { Button } from '../components/UI/Button';
import { Camera, CameraOff, Video, Mic, MicOff, Volume2, VolumeX, AlertTriangle, SwitchCamera, Pause, Play } from 'lucide-react';
import { WebSocketService } from '../services/websocketService';

export default function LiveVision() {
  const { videoRef, startCamera, stopCamera, toggleCamera, captureImageBase64, stream, error } = useCamera();
  const { speak, stopSpeaking, isSpeaking } = useSpeech();
  const [isMuted, setIsMuted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [status, setStatus] = useState<'offline' | 'ready' | 'analyzing' | 'error'>('offline');
  const [alerts, setAlerts] = useState<string[]>([]);
  const wsRef = useRef<WebSocketService | null>(null);
  const analysisIntervalRef = useRef<any>(null);

  useEffect(() => {
    const wsUrl = import.meta.env.VITE_WS_BASE_URL || (window.location.protocol === 'https:' ? 'wss:' : 'ws:') + '//' + window.location.host + '/live-vision';
    wsRef.current = new WebSocketService(
      wsUrl,
      (type, payload) => {
        if (type === 'text') {
          if (payload.toLowerCase().includes('alert') || payload.toLowerCase().includes('warning')) {
            setAlerts(prev => [payload, ...prev].slice(0, 3));
            if (!isMuted) speak(payload);
          } else {
            if (!isMuted && !isSpeaking) speak(payload);
          }
        } else if (type === 'error') {
           console.error(payload);
           setStatus('error');
        }
      },
      (newStatus) => setStatus(newStatus)
    );
    wsRef.current.connect();

    return () => {
      wsRef.current?.disconnect();
      if (analysisIntervalRef.current) clearInterval(analysisIntervalRef.current);
    };
  }, [isMuted, isSpeaking]);

  useEffect(() => {
    if (wsRef.current) {
      wsRef.current.isPaused = isPaused;
    }
  }, [isPaused]);

  useEffect(() => {
    if (stream && !isPaused && status === 'ready') {
      analysisIntervalRef.current = setInterval(() => {
        const frame = captureImageBase64();
        if (frame && wsRef.current) {
          wsRef.current.sendImage(frame);
          setStatus('analyzing');
          setTimeout(() => setStatus('ready'), 1000); // Reset visual status
        }
      }, 3000); // Send frame every 3s
    } else {
      if (analysisIntervalRef.current) clearInterval(analysisIntervalRef.current);
    }
  }, [stream, isPaused, status]);

  const handleStart = () => {
    startCamera();
    setIsPaused(false);
  };

  const handleStop = () => {
    stopCamera();
    if (analysisIntervalRef.current) clearInterval(analysisIntervalRef.current);
  };

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-4xl font-bold flex items-center gap-3">
          <Video size={40} className="text-[var(--primary)]" />
          Live Vision
        </h1>
        <div className="flex items-center gap-3">
          <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase ${
            status === 'analyzing' ? 'bg-green-100 text-green-800' : 
            status === 'ready' ? 'bg-blue-100 text-blue-800' :
            status === 'error' ? 'bg-red-100 text-red-800' :
            'bg-gray-200 text-gray-800'
          }`}>
            {isPaused ? 'Paused' : status}
          </span>
          <Button
            variant="outline"
            onClick={() => setIsMuted(!isMuted)}
            icon={isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            aria-label={isMuted ? "Unmute voice" : "Mute voice"}
          >
            {isMuted ? 'Muted' : 'Sound On'}
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border-l-8 border-red-500 text-red-900 p-6 rounded-lg text-xl" role="alert">
          <p className="font-bold flex items-center gap-2"><AlertTriangle /> Camera Error</p>
          <p>{error}</p>
        </div>
      )}

      {alerts.length > 0 && (
        <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-500 rounded-xl p-6 mb-4" role="alert" aria-live="assertive">
          <h2 className="text-2xl font-bold text-red-700 dark:text-red-400 flex items-center gap-2 mb-4">
            <AlertTriangle /> Safety Alerts
          </h2>
          <ul className="space-y-3">
            {alerts.map((alert, i) => (
              <li key={i} className="text-xl font-medium">{alert}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border-4 border-[var(--accent)] shadow-2xl flex items-center justify-center">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          className="w-full h-full object-cover"
        />
        {!stream && !error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 text-center bg-black/50">
            <CameraOff size={64} className="mb-4 opacity-50" />
            <h2 className="text-3xl font-bold mb-2">Camera is Off</h2>
            <p className="text-xl opacity-75">Start the camera to begin live analysis of your surroundings.</p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-4 bg-[var(--secondary)] p-6 rounded-2xl">
        {!stream ? (
          <Button size="lg" onClick={handleStart} icon={<Camera size={24} />}>
            Start Camera
          </Button>
        ) : (
          <>
            <Button size="lg" variant="destructive" onClick={handleStop} icon={<CameraOff size={24} />}>
              Stop Camera
            </Button>
            <Button size="lg" variant="secondary" onClick={toggleCamera} icon={<SwitchCamera size={24} />}>
              Switch Camera
            </Button>
            <Button 
              size="lg" 
              variant={isPaused ? "primary" : "outline"} 
              onClick={() => setIsPaused(!isPaused)} 
              icon={isPaused ? <Play size={24} /> : <Pause size={24} />}
            >
              {isPaused ? 'Resume Analysis' : 'Pause Analysis'}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
