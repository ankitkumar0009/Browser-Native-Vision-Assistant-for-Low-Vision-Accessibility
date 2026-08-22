# Browser-Native Vision Assistant for Low-Vision Accessibility

**“See More. Understand More. Navigate the Digital World with Confidence.”**

Browser-Native Vision Assistant is an AI-powered accessibility platform designed to assist people with low vision by converting visual information into meaningful spoken and textual descriptions directly inside the browser.

## Problem Statement
People with low vision or visual impairments often face challenges interpreting visual content online or in their physical surroundings. Existing tools are sometimes expensive, require specialized hardware, or lack modern AI capabilities. This project bridges that gap by providing a fully browser-native, accessible, and AI-powered solution.

## Features
- **AI Image Understanding:** Upload images to get detailed descriptions, object detection, and scene understanding.
- **Live Vision Mode:** Use your device's camera for real-time analysis of your surroundings.
- **OCR Text Recognition:** Extract text from images and have it read aloud.
- **Text-to-Speech (TTS):** Integrated Web Speech API for reading results aloud with adjustable speed.
- **Voice Commands:** Control the app hands-free using speech recognition.
- **Accessibility First UI:** High contrast modes, adjustable font sizes, reduced animations, and full keyboard navigation.

## Technology Stack
- **Frontend:** React.js, TypeScript, Vite, Tailwind CSS v4, Lucide React
- **Backend:** Node.js, Express.js, Multer
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
