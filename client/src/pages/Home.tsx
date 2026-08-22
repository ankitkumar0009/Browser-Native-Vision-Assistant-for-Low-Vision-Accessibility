import { useNavigate } from 'react-router-dom';
import { Camera, Image as ImageIcon, Volume2, Mic } from 'lucide-react';
import { Button } from '../components/UI/Button';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-12 max-w-4xl mx-auto">
      <section className="text-center space-y-6">
        <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
          See More. Understand More. Navigate the Digital World with Confidence.
        </h2>
        <p className="text-xl md:text-2xl text-[var(--secondary-foreground)] opacity-90 max-w-3xl mx-auto">
          Browser-Native Vision Assistant is an AI-powered accessibility platform designed to assist people with low vision by converting visual information into meaningful spoken and textual descriptions directly inside the browser.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Button 
            size="lg" 
            onClick={() => navigate('/assistant')}
            icon={<ImageIcon size={28} />}
            className="w-full sm:w-auto"
            aria-label="Get started with image analysis"
          >
            Analyze Image
          </Button>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => navigate('/live')}
            icon={<Camera size={28} />}
            className="w-full sm:w-auto"
            aria-label="Open live camera vision"
          >
            Live Camera
          </Button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12 border-t-4 border-[var(--secondary)]">
        <div className="bg-[var(--secondary)] p-8 rounded-2xl space-y-4">
          <div className="bg-[var(--primary)] text-[var(--primary-foreground)] w-16 h-16 rounded-full flex items-center justify-center mb-6">
            <Volume2 size={32} />
          </div>
          <h3 className="text-2xl font-bold">Text to Speech</h3>
          <p className="text-lg">Every result, description, and piece of text extracted from images can be read aloud with clear, understandable speech synthesis.</p>
        </div>
        
        <div className="bg-[var(--secondary)] p-8 rounded-2xl space-y-4">
          <div className="bg-[var(--primary)] text-[var(--primary-foreground)] w-16 h-16 rounded-full flex items-center justify-center mb-6">
            <Mic size={32} />
          </div>
          <h3 className="text-2xl font-bold">Voice Commands</h3>
          <p className="text-lg">Control the interface with your voice. Use simple commands to take photos, analyze images, and change accessibility settings.</p>
        </div>
      </section>
    </div>
  );
}
