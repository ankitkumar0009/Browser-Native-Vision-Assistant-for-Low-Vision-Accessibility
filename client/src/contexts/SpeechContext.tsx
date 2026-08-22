import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';

interface SpeechContextProps {
  speak: (text: string) => void;
  stopSpeaking: () => void;
  isSpeaking: boolean;
  rate: number;
  setRate: (rate: number) => void;
}

const SpeechContext = createContext<SpeechContextProps | undefined>(undefined);

export const SpeechProvider = ({ children }: { children: ReactNode }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [rate, setRate] = useState(1);
  const synth = window.speechSynthesis;

  useEffect(() => {
    // Some browsers have issues with 'end' event firing.
    // Interval check as a fallback.
    const interval = setInterval(() => {
      setIsSpeaking(synth.speaking);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const speak = useCallback((text: string) => {
    if (!synth) return;
    synth.cancel();
    
    if (text) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      synth.speak(utterance);
    }
  }, [synth, rate]);

  const stopSpeaking = useCallback(() => {
    if (!synth) return;
    synth.cancel();
    setIsSpeaking(false);
  }, [synth]);

  return (
    <SpeechContext.Provider value={{ speak, stopSpeaking, isSpeaking, rate, setRate }}>
      {children}
    </SpeechContext.Provider>
  );
};

export const useSpeech = () => {
  const context = useContext(SpeechContext);
  if (context === undefined) {
    throw new Error('useSpeech must be used within a SpeechProvider');
  }
  return context;
};
