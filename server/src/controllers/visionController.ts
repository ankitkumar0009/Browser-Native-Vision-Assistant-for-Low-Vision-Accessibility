import { Request, Response, NextFunction } from 'express';
import { GeminiVisionProvider } from '../services/ai/geminiVisionProvider';

const visionProvider = new GeminiVisionProvider();

export const analyzeImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, error: 'No image uploaded' });
      return;
    }

    const result = await visionProvider.analyzeImage(req.file.buffer, req.file.mimetype);
    res.json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

export const extractText = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, error: 'No image uploaded' });
      return;
    }

    const text = await visionProvider.extractText(req.file.buffer, req.file.mimetype);
    res.json({ success: true, text });
  } catch (error) {
    next(error);
  }
};
