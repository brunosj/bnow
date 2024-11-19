'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { ThemeProvider } from 'next-themes';

const ClientOnlyWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <>{children}</>;
};

export const Providers: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <ThemeProvider enableSystem={true} attribute='class' defaultTheme='system'>
      <ClientOnlyWrapper>{children}</ClientOnlyWrapper>
    </ThemeProvider>
  );
};
