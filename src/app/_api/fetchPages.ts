import type { Page } from '../../payload/payload-types';

export const fetchPages = async (): Promise<Page[]> => {
  const res: {
    docs: Page[];
  } = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/pages?depth=2%limit=0`,
    {
      next: {
        revalidate: 30,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `users API-Key ${process.env.PAYLOAD_API_KEY}`,
      },
    }
  ).then((res) => res.json());

  return res?.docs ?? [];
};
