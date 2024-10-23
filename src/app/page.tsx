import Map from './_components/Map';

async function getData() {
  const urls = [
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/soundbites?depth=2&limit=0`,
  ];

  const fetchPromises = urls.map((url) =>
    fetch(url, {
      next: { revalidate: 1 },
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `users API-Key ${process.env.PAYLOAD_API_KEY}`,
      },
    })
  );

  try {
    const responses = await Promise.all(fetchPromises);
    const data = await Promise.all(responses.map((res) => res.json()));
    return { data };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export default async function MapView() {
  const { data } = await getData();
  const items = data[0].docs;
  return (
    <article>
      <Map soundbites={items} />
    </article>
  );
}
