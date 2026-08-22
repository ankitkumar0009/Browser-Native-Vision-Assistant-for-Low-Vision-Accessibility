import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'high-contrast';
type FontSize = 'normal' | 'large' | 'x-large';

interface AccessibilityContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  reducedMotion: boolean;
  setReducedMotion: (reduced: boolean) => void;
  voiceFeedback: boolean;
  setVoiceFeedback: (voice: boolean) => void;
}

const AccessibilityContext = createContext<AccessibilityContextProps | undefined>(undefined);

export const AccessibilityProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('a11y-theme') as Theme) || 'light');
  const [fontSize, setFontSize] = useState<FontSize>(() => (localStorage.getItem('a11y-fontsize') as FontSize) || 'normal');
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => localStorage.getItem('a11y-reducedmotion') === 'true');
  const [voiceFeedback, setVoiceFeedback] = useState<boolean>(() => localStorage.getItem('a11y-voicefeedback') !== 'false');

  useEffect(() => {
    localStorage.setItem('a11y-theme', theme);
    document.documentElement.classList.remove('light', 'dark', 'high-contrast');
    if (theme !== 'light') {
      document.documentElement.classList.add(theme);
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('a11y-fontsize', fontSize);
    const html = document.documentElement;
    if (fontSize === 'normal') html.style.fontSize = '16px';
    if (fontSize === 'large') html.style.fontSize = '20px';
    if (fontSize === 'x-large') html.style.fontSize = '24px';
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('a11y-reducedmotion', reducedMotion.toString());
    if (reducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
  }, [reducedMotion]);
  
  useEffect(() => {
    localStorage.setItem('a11y-voicefeedback', voiceFeedback.toString());
  }, [voiceFeedback]);

  return (
    <AccessibilityContext.Provider value={{ theme, setTheme, fontSize, setFontSize, reducedMotion, setReducedMotion, voiceFeedback, setVoiceFeedback }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
