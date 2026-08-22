import React from 'react';
import { useAccessibility } from '../contexts/AccessibilityContext';
import { useSpeech } from '../contexts/SpeechContext';
import { clearHistory } from '../services/storageService';

export default function Settings() {
  const { theme, setTheme, fontSize, setFontSize, lineSpacing, setLineSpacing, reducedMotion, setReducedMotion, voiceFeedback, setVoiceFeedback } = useAccessibility();
  const { rate, setRate, pitch, setPitch, voiceURI, setVoiceURI, voices } = useSpeech();

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <h1 className="text-4xl font-bold border-b-4 border-[var(--accent)] pb-4">Settings</h1>

      <section className="space-y-8 bg-[var(--secondary)] p-8 rounded-2xl border-2 border-[var(--accent)]">
        <h2 className="text-3xl font-bold flex items-center gap-3">Visual Accessibility</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="text-2xl font-bold block" htmlFor="theme-select">Theme / Contrast</label>
            <select 
              id="theme-select"
              value={theme}
              onChange={(e) => setTheme(e.target.value as any)}
              className="w-full text-xl p-4 rounded-xl border-4 border-[var(--accent)] bg-[var(--background)] text-[var(--foreground)]"
            >
              <option value="light">Light Mode</option>
              <option value="dark">Dark Mode</option>
              <option value="high-contrast">High Contrast</option>
            </select>
          </div>

          <div className="space-y-4">
            <label className="text-2xl font-bold block" htmlFor="font-size">Font Size</label>
            <select 
              id="font-size"
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value as any)}
              className="w-full text-xl p-4 rounded-xl border-4 border-[var(--accent)] bg-[var(--background)] text-[var(--foreground)]"
            >
              <option value="normal">Normal</option>
              <option value="large">Large</option>
              <option value="x-large">Extra Large</option>
            </select>
          </div>

          <div className="space-y-4">
            <label className="text-2xl font-bold block" htmlFor="line-spacing">Line Spacing</label>
            <select 
              id="line-spacing"
              value={lineSpacing}
              onChange={(e) => setLineSpacing(e.target.value as any)}
              className="w-full text-xl p-4 rounded-xl border-4 border-[var(--accent)] bg-[var(--background)] text-[var(--foreground)]"
            >
              <option value="normal">Normal</option>
              <option value="loose">Loose (More Space)</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-4 bg-[var(--background)] rounded-xl border-4 border-[var(--accent)] mt-8">
            <span className="text-2xl font-bold">Reduce Motion</span>
            <input 
              type="checkbox" 
              checked={reducedMotion}
              onChange={(e) => setReducedMotion(e.target.checked)}
              className="w-8 h-8 accent-[var(--primary)]"
              aria-label="Reduce motion"
            />
          </div>
        </div>
      </section>

      <section className="space-y-8 bg-[var(--secondary)] p-8 rounded-2xl border-2 border-[var(--accent)]">
        <h2 className="text-3xl font-bold">Speech Preferences</h2>
        
        <div className="space-y-8">
          <div className="space-y-4">
            <label className="text-2xl font-bold block" htmlFor="voice-select">Voice</label>
            <select 
              id="voice-select"
              value={voiceURI}
              onChange={(e) => setVoiceURI(e.target.value)}
              className="w-full text-xl p-4 rounded-xl border-4 border-[var(--accent)] bg-[var(--background)] text-[var(--foreground)]"
            >
              {voices.map(voice => (
                <option key={voice.voiceURI} value={voice.voiceURI}>
                  {voice.name} ({voice.lang})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-2xl font-bold" htmlFor="speech-rate">Speed ({rate}x)</label>
            </div>
            <input 
              id="speech-rate"
              type="range" 
              min="0.5" max="2" step="0.1" 
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              className="w-full h-4 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-[var(--background)] rounded-xl border-4 border-[var(--accent)]">
            <span className="text-2xl font-bold">Voice Feedback for UI</span>
            <input 
              type="checkbox" 
              checked={voiceFeedback}
              onChange={(e) => setVoiceFeedback(e.target.checked)}
              className="w-8 h-8 accent-[var(--primary)]"
              aria-label="Enable voice feedback for UI interactions"
            />
          </div>
        </div>
      </section>

      <section className="space-y-8 bg-[var(--secondary)] p-8 rounded-2xl border-2 border-[var(--accent)]">
        <h2 className="text-3xl font-bold">Privacy & Data</h2>
        
        <div className="flex items-center justify-between p-4 bg-[var(--background)] rounded-xl border-4 border-[var(--accent)]">
          <span className="text-2xl font-bold">Store History Locally</span>
          <input 
            type="checkbox" 
            defaultChecked={localStorage.getItem('privacy_storeHistory') === 'true'}
            onChange={(e) => {
              localStorage.setItem('privacy_storeHistory', e.target.checked ? 'true' : 'false');
              if (!e.target.checked) clearHistory();
            }}
            className="w-8 h-8 accent-[var(--primary)]"
            aria-label="Store analysis history locally in browser"
          />
        </div>

        <button 
          onClick={() => {
            if(window.confirm('Are you sure you want to clear all history?')) {
              clearHistory();
              alert('History cleared.');
            }
          }}
          className="w-full text-left p-4 bg-red-100 text-red-900 dark:bg-red-900/30 dark:text-red-300 rounded-xl border-4 border-red-500 font-bold text-xl hover:bg-red-200"
        >
          Clear Local History
        </button>
      </section>
    </div>
  );
}
