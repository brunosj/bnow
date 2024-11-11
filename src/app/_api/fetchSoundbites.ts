import type { Soundbite } from '../../payload/payload-types';

export const fetchSoundbites = async (): Promise<Soundbite[]> => {
  const res: {
    docs: Soundbite[];
  } = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/soundbites?depth=2&limit=0`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `users API-Key ${process.env.PAYLOAD_API_KEY}`,
      },
    }
  ).then((res) => res.json());

  return res?.docs ?? [];
};
