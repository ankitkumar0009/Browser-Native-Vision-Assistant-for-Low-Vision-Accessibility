import { GoogleGenAI } from '@google/genai';
import { env } from '../../config/env';

export class GeminiVisionProvider {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: env.geminiApiKey });
  }

  async analyzeImage(imageBuffer: Buffer, mimeType: string = 'image/jpeg') {
    if (!env.geminiApiKey) throw new Error('GEMINI_API_KEY is not configured');

    const prompt = 'Analyze this image for a user with low vision. Provide a natural-language description prioritizing safety, navigation, people, obstacles, text, signs, doors, stairs, and traffic signals. Return a structured JSON with these exact fields: { "description": "string", "objects": ["string"], "importantText": ["string"], "safetyAlerts": ["string"], "confidence": 0.95 }';

    const response = await this.ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: [
        { role: 'user', parts: [ { text: prompt }, { inlineData: { data: imageBuffer.toString('base64'), mimeType } } ] }
      ],
      config: {
        responseMimeType: 'application/json',
      }
    });

    if (!response.text) throw new Error('No response from Gemini');
    return JSON.parse(response.text);
  }

  async extractText(imageBuffer: Buffer, mimeType: string = 'image/jpeg') {
    if (!env.geminiApiKey) throw new Error('GEMINI_API_KEY is not configured');

    const prompt = 'Extract all readable text from this image exactly as it appears. Preserve line breaks, paragraphs, and headings if possible. If there is no text, return an empty string. Only return the text, no extra explanation.';

    const response = await this.ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: [
        { role: 'user', parts: [ { text: prompt }, { inlineData: { data: imageBuffer.toString('base64'), mimeType } } ] }
      ]
    });

    if (!response.text) return '';
    return response.text;
  }
}
