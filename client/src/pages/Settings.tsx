import { useAccessibility } from '../contexts/AccessibilityContext';
import { useSpeech } from '../contexts/SpeechContext';
import { Button } from '../components/UI/Button';

export default function Settings() {
  const { theme, setTheme, fontSize, setFontSize, reducedMotion, setReducedMotion } = useAccessibility();
  const { rate, setRate } = useSpeech();

  return (
    <div className="max-w-3xl mx-auto space-y-12">
      <h1 className="text-4xl font-bold border-b-4 border-[var(--primary)] pb-4">Accessibility Settings</h1>

      <section className="space-y-6 bg-[var(--secondary)] p-8 rounded-2xl">
        <h2 className="text-3xl font-bold">Visual Appearance</h2>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Theme & Contrast</h3>
          <div className="flex flex-wrap gap-4">
            <Button 
              variant={theme === 'light' ? 'primary' : 'outline'}
              onClick={() => setTheme('light')}
            >
              Light Mode
            </Button>
            <Button 
              variant={theme === 'dark' ? 'primary' : 'outline'}
              onClick={() => setTheme('dark')}
            >
              Dark Mode
            </Button>
            <Button 
              variant={theme === 'high-contrast' ? 'primary' : 'outline'}
              onClick={() => setTheme('high-contrast')}
            >
              High Contrast
            </Button>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t-2 border-[var(--accent)]">
          <h3 className="text-xl font-semibold">Text Size</h3>
          <div className="flex flex-wrap gap-4">
            <Button 
              variant={fontSize === 'normal' ? 'primary' : 'outline'}
              onClick={() => setFontSize('normal')}
            >
              Normal
            </Button>
            <Button 
              variant={fontSize === 'large' ? 'primary' : 'outline'}
              onClick={() => setFontSize('large')}
            >
              Large
            </Button>
            <Button 
              variant={fontSize === 'x-large' ? 'primary' : 'outline'}
              onClick={() => setFontSize('x-large')}
            >
              Extra Large
            </Button>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t-2 border-[var(--accent)]">
          <h3 className="text-xl font-semibold">Motion & Animations</h3>
          <div className="flex items-center gap-4">
            <label className="text-lg flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={reducedMotion} 
                onChange={(e) => setReducedMotion(e.target.checked)}
                className="w-6 h-6 rounded accent-[var(--primary)]"
              />
              Reduce Animations
            </label>
          </div>
        </div>
      </section>

      <section className="space-y-6 bg-[var(--secondary)] p-8 rounded-2xl">
        <h2 className="text-3xl font-bold">Voice & Speech</h2>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Reading Speed</h3>
          <div className="flex items-center gap-4 max-w-md">
            <span className="text-lg">Slower</span>
            <input 
              type="range" 
              min="0.5" 
              max="2" 
              step="0.1" 
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              className="flex-1 h-4 bg-[var(--accent)] rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
              aria-label="Adjust reading speed"
            />
            <span className="text-lg">Faster</span>
          </div>
          <p className="text-lg mt-2">Current Speed: {rate}x</p>
        </div>
      </section>
    </div>
  );
}
