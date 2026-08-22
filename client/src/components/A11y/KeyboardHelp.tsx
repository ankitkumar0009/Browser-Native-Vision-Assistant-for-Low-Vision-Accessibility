import React, { useState } from 'react';
import { Keyboard, X } from 'lucide-react';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';

export default function KeyboardHelp() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Initialize global shortcuts
  useKeyboardShortcuts();

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-[var(--primary)] text-[var(--primary-foreground)] p-4 rounded-full shadow-xl hover:scale-110 transition-transform focus:ring-4 focus:ring-offset-2 focus:ring-[var(--primary)] outline-none z-50"
        aria-label="Show keyboard shortcuts"
      >
        <Keyboard size={32} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 bg-[var(--secondary)] border-4 border-[var(--primary)] p-6 rounded-2xl shadow-2xl z-50 max-w-sm w-full">
      <div className="flex justify-between items-center mb-4 border-b-2 border-[var(--accent)] pb-2">
        <h3 className="text-2xl font-bold flex items-center gap-2">
          <Keyboard size={28} /> Shortcuts
        </h3>
        <button 
          onClick={() => setIsOpen(false)}
          className="text-[var(--foreground)] hover:bg-[var(--accent)] p-2 rounded-lg"
          aria-label="Close shortcuts panel"
        >
          <X size={24} />
        </button>
      </div>
      <ul className="space-y-3 text-lg">
        <li className="flex justify-between"><kbd className="bg-[var(--accent)] px-2 py-1 rounded">Alt + H</kbd> <span>Home</span></li>
        <li className="flex justify-between"><kbd className="bg-[var(--accent)] px-2 py-1 rounded">Alt + A</kbd> <span>Assistant</span></li>
        <li className="flex justify-between"><kbd className="bg-[var(--accent)] px-2 py-1 rounded">Alt + L</kbd> <span>Live Vision</span></li>
        <li className="flex justify-between"><kbd className="bg-[var(--accent)] px-2 py-1 rounded">Alt + S</kbd> <span>Settings</span></li>
        <li className="flex justify-between"><kbd className="bg-[var(--accent)] px-2 py-1 rounded">Alt + C</kbd> <span>Toggle Contrast</span></li>
      </ul>
    </div>
  );
}
