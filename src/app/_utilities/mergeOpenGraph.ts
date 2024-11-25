import type { Metadata } from 'next';

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  siteName: 'Birmingham Now',
  title: 'Birmingham Nowp',
  description: 'An interactive map of Birmingham’s sonic history.',
  images: [
    {
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/og-image.png`,
    },
  ],
};

export const mergeOpenGraph = (
  og?: Metadata['openGraph']
): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  };
};
