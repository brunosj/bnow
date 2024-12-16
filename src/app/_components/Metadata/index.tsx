import { Metadata } from 'next';

const siteMetadata: Metadata = {
  metadataBase: new URL('https://brumnow.birminghammuseums.org.uk'),
  title: 'Birmingham Now',
  description:
    'An interactive digital map which brings together sound clips from the past and present from across Birmingham',

  // Basic metadata
  applicationName: 'Birmingham Now',
  authors: [{ name: 'Birmingham Now', url: 'https://brumnow.birminghammuseums.org.uk' }],
  keywords: ['dance', 'berlin', 'underground'],
  referrer: 'origin-when-cross-origin',
  creator: 'landozone',
  publisher: 'Birmingham Museums',

  // Open Graph metadata
  openGraph: {
    title: 'Birmingham Now',
    description: 'An interactive digital map which brings together sound clips from the past and present from across Birmingham',
    url: 'https://brumnow.birminghammuseums.org.uk',
    siteName: 'Birmingham Now',
    images: [
      {
        url: 'https://brumnow.birminghammuseums.org.uk/og-image.png',
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
    title: 'Birmingham Now',
    description: 'An interactive digital map which brings together sound clips from the past and present from across Birmingham',
    images: ['https://brumnow.birminghammuseums.org.uk/og-image.png'],
  },

  // Verification for search engines
  verification: {
    google: 'google-site-verification=your-google-verification-code',
    yandex: 'yandex-verification=your-yandex-verification-code',
    yahoo: 'yahoo-site-verification=your-yahoo-verification-code',
  },

  // Alternate languages
  alternates: {
    canonical: 'https://brumnow.birminghammuseums.org.uk',
    languages: {
      'en-US': 'https://brumnow.birminghammuseums.org.uk',
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
    title: 'Birmingham Now',
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
