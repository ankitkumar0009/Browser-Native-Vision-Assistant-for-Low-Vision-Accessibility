import React, { useEffect } from 'react';
import { Volume2, Square, Copy, Type } from 'lucide-react';
import { Button } from '../UI/Button';
import { useSpeech } from '../../contexts/SpeechContext';

interface AnalysisResultsProps {
  description?: string;
  objects?: string[];
  ocrText?: string;
  isLoading: boolean;
}

export function AnalysisResults({ description, objects, ocrText, isLoading }: AnalysisResultsProps) {
  const { speak, stopSpeaking, isSpeaking } = useSpeech();

  useEffect(() => {
    if (description) {
      speak(description);
    }
  }, [description]);

  if (isLoading) {
    return (
      <div className="w-full max-w-3xl mx-auto mt-8 p-8 border-4 border-[var(--primary)] rounded-2xl bg-[var(--secondary)] text-center">
        <div className="animate-spin w-16 h-16 border-8 border-[var(--primary)] border-t-transparent rounded-full mx-auto mb-6"></div>
        <h2 className="text-3xl font-bold">Analyzing Image...</h2>
        <p className="text-xl mt-4">Please wait while the AI processes the image.</p>
      </div>
    );
  }

  if (!description && !ocrText) return null;

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 space-y-8" role="region" aria-live="polite">
      {description && (
        <div className="p-8 border-4 border-[var(--accent)] rounded-2xl bg-[var(--secondary)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <h2 className="text-3xl font-bold">Image Description</h2>
            <div className="flex gap-2">
              <Button 
                variant={isSpeaking ? 'destructive' : 'primary'}
                onClick={() => isSpeaking ? stopSpeaking() : speak(description)}
                icon={isSpeaking ? <Square size={20} /> : <Volume2 size={20} />}
                aria-label={isSpeaking ? "Stop reading description" : "Read description aloud"}
              >
                {isSpeaking ? 'Stop' : 'Listen'}
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigator.clipboard.writeText(description)}
                icon={<Copy size={20} />}
                aria-label="Copy description to clipboard"
              >
                Copy
              </Button>
            </div>
          </div>
          <p className="text-xl md:text-2xl leading-relaxed">{description}</p>
          
          {objects && objects.length > 0 && (
            <div className="mt-6 pt-6 border-t-2 border-[var(--accent)]">
              <h3 className="text-2xl font-bold mb-4">Detected Objects</h3>
              <ul className="flex flex-wrap gap-3">
                {objects.map((obj, i) => (
                  <li key={i} className="bg-[var(--primary)] text-[var(--primary-foreground)] px-4 py-2 rounded-lg text-lg font-medium">
                    {obj}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {ocrText && (
        <div className="p-8 border-4 border-[var(--accent)] rounded-2xl bg-[var(--secondary)]">
           <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Type size={32} />
              Extracted Text (OCR)
            </h2>
            <div className="flex gap-2">
              <Button 
                variant={isSpeaking ? 'destructive' : 'primary'}
                onClick={() => isSpeaking ? stopSpeaking() : speak(ocrText)}
                icon={isSpeaking ? <Square size={20} /> : <Volume2 size={20} />}
                aria-label="Read extracted text aloud"
              >
                {isSpeaking ? 'Stop' : 'Listen'}
              </Button>
            </div>
          </div>
          <p className="text-xl md:text-2xl leading-relaxed font-mono bg-[var(--background)] p-6 rounded-xl border-2 border-[var(--accent)]">
            {ocrText}
          </p>
        </div>
      )}
    </div>
  );
}
