import React, { useState } from 'react';
import axios from 'axios';
import { ImageUploader } from '../components/Vision/ImageUploader';
import { AnalysisResults } from '../components/Vision/AnalysisResults';
import { Button } from '../components/UI/Button';
import { Mic, MicOff, Search, FileText } from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

export default function VisionAssistant() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{description?: string, objects?: string[], ocrText?: string} | null>(null);

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
      const formData = new FormData();
      formData.append('image', selectedFile);
      
      const res = await axios.post('/api/vision/analyze', formData);
      setResults(prev => ({ ...prev, description: res.data.description, objects: res.data.objects }));
    } catch (error) {
      console.error(error);
      alert('Failed to analyze image.');
    } finally {
      setIsLoading(false);
    }
  };

  const extractText = async () => {
    if (!selectedFile) return;
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      
      const res = await axios.post('/api/vision/ocr', formData);
      setResults(prev => ({ ...prev, ocrText: res.data.text }));
    } catch (error) {
      console.error(error);
      alert('Failed to extract text.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceCommand = (command: string) => {
    if (command.includes('analyze') || command.includes('describe')) {
      analyzeImage();
    } else if (command.includes('read') || command.includes('text')) {
      extractText();
    } else if (command.includes('clear') || command.includes('remove')) {
      handleClear();
    }
  };

  const { isListening, startListening, stopListening, supported } = useSpeechRecognition(handleVoiceCommand);

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-4xl font-bold">Vision Assistant</h1>
        {supported && (
          <Button
            variant={isListening ? 'destructive' : 'secondary'}
            onClick={isListening ? stopListening : startListening}
            icon={isListening ? <MicOff size={24} /> : <Mic size={24} />}
            aria-label={isListening ? "Stop voice commands" : "Start voice commands"}
            size="lg"
          >
            {isListening ? 'Listening...' : 'Voice Command'}
          </Button>
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
