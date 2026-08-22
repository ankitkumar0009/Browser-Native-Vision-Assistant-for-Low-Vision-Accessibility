import React from 'react';
import { NavLink } from 'react-router-dom';
import { Eye, Home, Settings, Info, Camera, Image as ImageIcon } from 'lucide-react';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { Button } from '../UI/Button';

export default function Header() {
  const { fontSize, setFontSize, theme, setTheme } = useAccessibility();

  const toggleHighContrast = () => {
    setTheme(theme === 'high-contrast' ? 'light' : 'high-contrast');
  };

  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-4 py-3 rounded-lg text-lg font-semibold transition-colors
    ${isActive ? 'bg-[var(--primary)] text-[var(--primary-foreground)]' : 'hover:bg-[var(--secondary)]'}`;

  return (
    <header className="sticky top-0 z-50 py-4 backdrop-blur-xl border-b border-[var(--primary)]/20 bg-[var(--background)]/70 shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-[var(--primary)] text-[var(--primary-foreground)] p-3 rounded-xl shadow-lg shadow-[var(--primary)]/30">
              <Eye size={36} />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">Vision Assistant</h1>
          </div>

          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              onClick={() => setFontSize(fontSize === 'normal' ? 'large' : fontSize === 'large' ? 'x-large' : 'normal')}
              aria-label={`Current font size is ${fontSize}. Click to change.`}
            >
              Aa
            </Button>
            <Button 
              variant={theme === 'high-contrast' ? 'primary' : 'outline'}
              onClick={toggleHighContrast}
              aria-label="Toggle high contrast mode"
            >
              High Contrast
            </Button>
          </div>
        </div>

        <nav className="mt-6">
          <ul className="flex flex-wrap items-center justify-center md:justify-start gap-2 md:gap-4">
            <li>
              <NavLink to="/" className={navItemClass}>
                <Home size={24} /> <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/assistant" className={navItemClass}>
                <ImageIcon size={24} /> <span>Assistant</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/live" className={navItemClass}>
                <Camera size={24} /> <span>Live Vision</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/settings" className={navItemClass}>
                <Settings size={24} /> <span>Settings</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={navItemClass}>
                <Info size={24} /> <span>About</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
