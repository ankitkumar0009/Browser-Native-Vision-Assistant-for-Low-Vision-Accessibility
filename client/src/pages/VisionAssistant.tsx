import React, { useState, useEffect } from 'react';
import { ImageUploader } from '../components/Vision/ImageUploader';
import { AnalysisResults } from '../components/Vision/AnalysisResults';
import { Button } from '../components/UI/Button';
import { Mic, MicOff, Search, FileText } from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { analyzeImageApi, extractTextApi } from '../services/visionService';
import type { AnalysisResponse } from '../services/visionService';
import { saveHistory } from '../services/storageService';
import { useSpeech } from '../contexts/SpeechContext';

export default function VisionAssistant() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{description?: string, objects?: string[], ocrText?: string, safetyAlerts?: string[]} | null>(null);
  const { speak } = useSpeech();

  const handleImageSelected = (file: File) => {
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setResults(null);
  };

  const handleClear = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResults(null);
  };

  const analyzeImage = async () => {
    if (!selectedFile) return;
    setIsLoading(true);
    try {
      const res = await analyzeImageApi(selectedFile);
      setResults(prev => ({ ...prev, description: res.description, objects: res.objects, safetyAlerts: res.safetyAlerts }));
      saveHistory({ type: 'analysis', content: res.description || 'Analysis complete' });
      if (res.description) speak(res.description);
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to analyze image.');
    } finally {
      setIsLoading(false);
    }
  };

  const extractText = async () => {
    if (!selectedFile) return;
    setIsLoading(true);
    try {
      const res = await extractTextApi(selectedFile);
      setResults(prev => ({ ...prev, ocrText: res.text }));
      saveHistory({ type: 'ocr', content: res.text || 'No text found' });
      if (res.text) speak(res.text);
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to extract text.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceCommand = (command: string) => {
    const lower = command.toLowerCase();
    if (lower.includes('analyze') || lower.includes('describe')) {
      analyzeImage();
    } else if (lower.includes('read') || lower.includes('text')) {
      extractText();
    } else if (lower.includes('clear') || lower.includes('remove')) {
      handleClear();
    }
  };

  const { isListening, startListening, stopListening, supported, commandHistory } = useSpeechRecognition(handleVoiceCommand);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-4xl font-bold">Vision Assistant</h1>
        {supported && (
          <div className="flex items-center gap-4">
            {commandHistory.length > 0 && (
              <span className="text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded" aria-live="polite">
                Said: "{commandHistory[0]}"
              </span>
            )}
            <Button
              variant={isListening ? 'destructive' : 'secondary'}
              onClick={isListening ? stopListening : startListening}
              icon={isListening ? <MicOff size={24} /> : <Mic size={24} />}
              aria-label={isListening ? "Stop voice commands" : "Start voice commands"}
              size="lg"
            >
              {isListening ? 'Listening...' : 'Voice Command'}
            </Button>
          </div>
        )}
      </div>

      <ImageUploader 
        onImageSelected={handleImageSelected} 
        previewUrl={previewUrl} 
        onClear={handleClear} 
      />

      {previewUrl && !isLoading && (
        <div className="flex flex-col sm:flex-row justify-center gap-6 mt-4">
          <Button size="lg" onClick={analyzeImage} icon={<Search size={24} />}>
            Describe Image
          </Button>
          <Button size="lg" variant="secondary" onClick={extractText} icon={<FileText size={24} />}>
            Read Text (OCR)
          </Button>
        </div>
      )}

      {(isLoading || results) && (
        <AnalysisResults 
          isLoading={isLoading} 
          description={results?.description} 
          objects={results?.objects} 
          ocrText={results?.ocrText} 
        />
      )}
    </div>
  );
}
