import type { Menu } from '../../payload/payload-types';

export const fetchMenu = async (): Promise<Menu> => {
  const res: Menu = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/globals/menu`,
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

  return res ?? null;
};
