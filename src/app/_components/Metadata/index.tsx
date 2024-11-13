import { Metadata } from 'next';

const siteMetadata: Metadata = {
  metadataBase: new URL('https://birminghamnow.co.uk'),
  title: 'Birmingham NOW Sound Map',
  description: 'Birmingham NOW Sound Map',

  // Basic metadata
  applicationName: 'Birmingham NOW Sound Map',
  authors: [
    { name: 'Birmingham NOW Sound Map', url: 'https://birminghamnow.co.uk' },
  ],
  keywords: ['dance', 'berlin', 'underground'],
  referrer: 'origin-when-cross-origin',
  creator: 'landozone',
  publisher: 'Birmingham NOW Sound Map',

  // Open Graph metadata
  openGraph: {
    title: 'Birmingham NOW Sound Map',
    description: 'Birmingham NOW Sound Map',
    url: 'https://birminghamnow.co.uk',
    siteName: 'Birmingham NOW Sound Map',
    images: [
      {
        url: 'https://birminghamnow.co.uk/logo_SEO.png',
        width: 1200,
        height: 630,
        alt: 'Birmingham NOW Sound Map Image',
      },
    ],
    locale: 'en_UK',
    type: 'website',
  },

  // Twitter metadata
  twitter: {
    card: 'summary_large_image',
    title: 'Birmingham NOW Sound Map',
    description: 'Birmingham NOW Sound Map',
    images: ['https://birminghamnow.co.uk/logo_SEO.png'],
  },

  // Verification for search engines
  verification: {
    google: 'google-site-verification=your-google-verification-code',
    yandex: 'yandex-verification=your-yandex-verification-code',
    yahoo: 'yahoo-site-verification=your-yahoo-verification-code',
  },

  // Alternate languages
  alternates: {
    canonical: 'https://birminghamnow.co.uk',
    languages: {
      'en-US': 'https://birminghamnow.co.uk',
    },
  },

  // Icons
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.icon',
    // apple: '/apple-touch-icon.png',
    // other: [
    //   {
    //     rel: 'apple-touch-icon-precomposed',
    //     url: '/apple-touch-icon-precomposed.png',
    //   },
    // ],
  },

  // Manifest
  manifest: '/site.webmanifest',

  // App-specific metadata
  appleWebApp: {
    capable: false,
    title: 'Birmingham NOW Sound Map',
    statusBarStyle: 'black-translucent',
  },

  // Robots directives
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Format detection
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

const MetadataComponent = () => {
  return null;
};

export default MetadataComponent;
export { siteMetadata };
