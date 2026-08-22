import { api } from './api';

export interface AnalysisResponse {
  success: boolean;
  description?: string;
  objects?: string[];
  importantText?: string[];
  safetyAlerts?: string[];
  confidence?: number;
  error?: string;
}

export interface OcrResponse {
  success: boolean;
  text?: string;
  error?: string;
}

export const analyzeImageApi = async (file: File): Promise<AnalysisResponse> => {
  const formData = new FormData();
  formData.append('image', file);
  const { data } = await api.post<AnalysisResponse>('/api/vision/analyze', formData);
  return data;
};

export const extractTextApi = async (file: File): Promise<OcrResponse> => {
  const formData = new FormData();
  formData.append('image', file);
  const { data } = await api.post<OcrResponse>('/api/vision/ocr', formData);
  return data;
};
