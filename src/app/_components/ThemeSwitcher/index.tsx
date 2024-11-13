'use client';
// components/ThemeSwitcher.tsx
import React from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from 'next-themes';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <label className='theme-switch'>
      <input
        type='checkbox'
        checked={theme === 'dark'}
        onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className='sr-only' // visually hidden but accessible
      />
      <div className='switch-track'>
        <div className='switch-thumb'>
          {theme === 'dark' ? <FiMoon size={14} /> : <FiSun size={14} />}
        </div>
      </div>
    </label>
  );
};

export default ThemeSwitcher;
