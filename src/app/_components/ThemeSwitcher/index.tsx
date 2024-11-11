'use client';
// components/ThemeSwitcher.tsx
import React from 'react';
import { useTheme } from 'next-themes';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button onClick={toggleTheme} aria-label='Toggle theme'>
      {theme === 'light' ? '🌞' : '🌜 '}
    </button>
  );
};

export default ThemeSwitcher;
