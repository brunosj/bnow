import type { Page } from '../../payload/payload-types';

export const fetchPages = async (): Promise<Page[]> => {
  const res: {
    docs: Page[];
  } = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/pages`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `users API-Key ${process.env.PAYLOAD_API_KEY}`,
    },
  }).then((res) => res.json());

  return res?.docs ?? [];
};
