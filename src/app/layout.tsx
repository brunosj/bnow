import React from 'react';
import { Metadata } from 'next';
import localFont from 'next/font/local';
import { siteMetadata } from './_components/Metadata';
import { Providers } from './_providers';
import type { Viewport } from 'next';
import PlausibleProvider from 'next-plausible'

import './_css/globals.css';

const Inter = localFont({
  src: '../app/_fonts/Inter-VariableFont_slnt,wght.ttf',
  display: 'swap',
  variable: '--editorial',
  weight: '1 1000',
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning className={`${Inter.className}`}>
      <head>
        <link rel='icon' href='/favicon.ico' sizes='32x32' />
        <link rel='icon' href='/favicon.svg' type='image/svg+xml' />
        <PlausibleProvider domain="brumnow-plausible.birminghammuseums.org.uk" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  ...siteMetadata,
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
};
