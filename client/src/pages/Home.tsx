import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Video, FileText, Settings, ShieldAlert, ArrowRight } from 'lucide-react';
import { Button } from '../components/UI/Button';

export default function Home() {
  return (
    <div className="flex flex-col gap-16 max-w-6xl mx-auto py-8">
      
      {/* Hero Section */}
      <section className="text-center space-y-8 bg-[var(--secondary)] p-12 rounded-3xl border-4 border-[var(--accent)]">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
          See More. <span className="text-[var(--primary)]">Understand More.</span>
        </h1>
        <p className="text-2xl md:text-3xl max-w-4xl mx-auto leading-relaxed">
          AI-powered visual assistance designed to help people understand images, text, and their surroundings with confidence.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6 pt-8">
          <Link to="/assistant" className="w-full sm:w-auto">
            <Button size="lg" className="w-full text-xl py-6" icon={<Eye size={28} />}>
              Try Vision Assistant
            </Button>
          </Link>
          <Link to="/live" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full text-xl py-6 border-4" icon={<Video size={28} />}>
              Start Live Vision
            </Button>
          </Link>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard 
          icon={<Eye size={40} />} 
          title="AI Image Understanding" 
          description="Upload photos to get detailed, spoken descriptions of scenes and objects." 
        />
        <FeatureCard 
          icon={<Video size={40} />} 
          title="Real-Time Camera" 
          description="Point your device to hear continuous descriptions of your surroundings." 
        />
        <FeatureCard 
          icon={<FileText size={40} />} 
          title="Text Recognition" 
          description="Extract and read aloud text from signs, documents, and screens." 
        />
        <FeatureCard 
          icon={<ShieldAlert size={40} />} 
          title="Safety Alerts" 
          description="AI automatically highlights potential obstacles like stairs and vehicles." 
        />
        <FeatureCard 
          icon={<Settings size={40} />} 
          title="Accessibility First" 
          description="High contrast, large text, and full keyboard/screen-reader support." 
        />
      </section>

      {/* How it Works */}
      <section className="bg-[var(--foreground)] text-[var(--background)] p-12 rounded-3xl">
        <h2 className="text-4xl font-bold mb-12 text-center">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-12 text-center">
          <Step number="1" title="Capture or Upload" desc="Start your camera or select an image from your device." />
          <Step number="2" title="AI Analysis" desc="Our advanced AI processes the visual information instantly." />
          <Step number="3" title="Listen & Understand" desc="Receive clear, spoken feedback and safety alerts." />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-[var(--secondary)] p-8 rounded-2xl border-2 border-[var(--accent)] hover:border-[var(--primary)] transition-colors">
      <div className="text-[var(--primary)] mb-6 bg-[var(--background)] w-16 h-16 flex items-center justify-center rounded-xl">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-xl leading-relaxed">{description}</p>
    </div>
  );
}

function Step({ number, title, desc }: { number: string, title: string, desc: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full flex items-center justify-center text-3xl font-bold mb-6">
        {number}
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-xl opacity-90">{desc}</p>
    </div>
  );
}
