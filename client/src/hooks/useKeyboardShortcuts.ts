import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccessibility } from '../contexts/AccessibilityContext';

export function useKeyboardShortcuts() {
  const navigate = useNavigate();
  const { theme, setTheme } = useAccessibility();
  const themeRef = useRef(theme);
  const setThemeRef = useRef(setTheme);

  // Keep refs up to date
  useEffect(() => {
    themeRef.current = theme;
    setThemeRef.current = setTheme;
  }, [theme, setTheme]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid triggering when user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.altKey) {
        switch (e.key.toLowerCase()) {
          case 'h':
            e.preventDefault();
            navigate('/');
            break;
          case 'a':
            e.preventDefault();
            navigate('/assistant');
            break;
          case 'l':
            e.preventDefault();
            navigate('/live');
            break;
          case 's':
            e.preventDefault();
            navigate('/settings');
            break;
          case 'c':
            e.preventDefault();
            setThemeRef.current(themeRef.current === 'high-contrast' ? 'light' : 'high-contrast');
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);
}
