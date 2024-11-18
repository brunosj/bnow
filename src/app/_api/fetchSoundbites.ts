import type { Soundbite } from '../../payload/payload-types';

export const fetchSoundbites = async (): Promise<Soundbite[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/soundbites?depth=2&limit=0`,
    {
      next: {
        revalidate: 30,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `users API-Key ${process.env.PAYLOAD_API_KEY}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch soundbites');
  }

  const data = await res.json();
  return data.docs ?? [];
};
