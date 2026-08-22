import { Request, Response } from 'express';
import { getMockImageDescription, getMockOcrText } from '../services/mockVisionService';
// In a real scenario, you'd call a service using process.env.AI_API_KEY

export const analyzeImage = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No image uploaded' });
      return;
    }

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Here we use a mock service since no API key is guaranteed.
    // We could check if AI_API_KEY exists and use openai SDK here.
    const description = getMockImageDescription();
    const objects = ['Person', 'Computer', 'Coffee Cup', 'Desk'];

    res.json({
      description,
      objects,
      success: true
    });
  } catch (error) {
    console.error('Error analyzing image:', error);
    res.status(500).json({ error: 'Failed to analyze image' });
  }
};

export const extractText = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No image uploaded' });
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
    const text = getMockOcrText();

    res.json({
      text,
      success: true
    });
  } catch (error) {
    console.error('Error extracting text:', error);
    res.status(500).json({ error: 'Failed to extract text' });
  }
};
