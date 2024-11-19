'use client';
// components/ThemeSwitcher.tsx
import React, { useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from 'next-themes';

const ThemeSwitcher = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className='flex items-center gap-3'>
      <label className='theme-switch'>
        <input
          type='checkbox'
          checked={resolvedTheme === 'dark'}
          onChange={() =>
            setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
          }
          className='sr-only'
        />
        <div className='switch-track'>
          <div className='switch-thumb'>
            {resolvedTheme === 'dark' ? (
              <FiMoon size={14} />
            ) : (
              <FiSun size={14} />
            )}
          </div>
        </div>
      </label>

      <span className='text-sm'>
        {resolvedTheme === 'dark' ? 'Dark Mode' : 'Light Mode'}
      </span>
    </div>
  );
};

export default ThemeSwitcher;
