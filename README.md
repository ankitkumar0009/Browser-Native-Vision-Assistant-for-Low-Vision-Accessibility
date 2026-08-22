# VisionBridge AI — Browser-Native Vision Assistant

**See More. Understand More. Navigate with Confidence.**

An AI-powered visual assistance web application designed to help people with low vision understand images, text, and their surroundings. It provides real image understanding, OCR, live camera assistance, voice interaction, and accessibility controls—all accessible via the browser.

## Features
- **Browser APIs:** MediaDevices API, Web Speech API
- **AI/OCR:** Configurable to use OpenAI Vision / Tesseract (currently using mock services for immediate demo capability)

## Installation & Setup

1. **Clone the repository** (if not already local).

2. **Setup Backend:**
   ```bash
   cd server
   npm install
   npm run dev
   ```
   The backend will run on `http://localhost:5000`.

3. **Setup Frontend:**
   ```bash
   cd client
   npm install
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`.

## Environment Variables
If you wish to integrate real AI services, configure the `.env` file in the `server` directory:
```env
PORT=5000
AI_API_KEY=your_openai_api_key
```

## Accessibility Features
- Semantic HTML and ARIA labels.
- Visible keyboard focus.
- High contrast themes.
- Global keyboard shortcuts (`Alt + H`, `Alt + A`, etc.).
- Large touch targets and typography.

## Future Improvements
- Integration with external smart glasses.
- Offline AI models using WebNN or ONNX runtime for privacy-first inference.
- Multi-language support for TTS and descriptions.

## Privacy Note
This application processes images dynamically and does not store them permanently. Camera access is strictly managed and requires explicit user consent.
