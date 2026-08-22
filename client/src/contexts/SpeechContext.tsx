import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';

interface SpeechContextProps {
  speak: (text: string) => void;
  stopSpeaking: () => void;
  isSpeaking: boolean;
  rate: number;
  setRate: (rate: number) => void;
  pitch: number;
  setPitch: (pitch: number) => void;
  voiceURI: string;
  setVoiceURI: (uri: string) => void;
  voices: SpeechSynthesisVoice[];
}

const SpeechContext = createContext<SpeechContextProps | undefined>(undefined);

export const SpeechProvider = ({ children }: { children: ReactNode }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [rate, setRate] = useState<number>(() => parseFloat(localStorage.getItem('speech-rate') || '1'));
  const [pitch, setPitch] = useState<number>(() => parseFloat(localStorage.getItem('speech-pitch') || '1'));
  const [voiceURI, setVoiceURI] = useState<string>(() => localStorage.getItem('speech-voice') || '');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const loadVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  useEffect(() => {
    localStorage.setItem('speech-rate', rate.toString());
    localStorage.setItem('speech-pitch', pitch.toString());
    localStorage.setItem('speech-voice', voiceURI);
  }, [rate, pitch, voiceURI]);

  const speak = useCallback((text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = pitch;
    
    if (voiceURI) {
      const selectedVoice = voices.find(v => v.voiceURI === voiceURI);
      if (selectedVoice) utterance.voice = selectedVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  }, [rate, pitch, voiceURI, voices]);

  const stopSpeaking = useCallback(() => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  return (
    <SpeechContext.Provider value={{ speak, stopSpeaking, isSpeaking, rate, setRate, pitch, setPitch, voiceURI, setVoiceURI, voices }}>
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
