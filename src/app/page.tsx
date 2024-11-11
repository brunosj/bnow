import Map from './_components/Map';
import { fetchSoundbites } from './_api/fetchSoundbites';
import { fetchPages } from './_api/fetchPages';

export default async function MapView() {
  const pages = await fetchPages();
  const soundbites = await fetchSoundbites();

  return (
    <article>
      <Map soundbites={soundbites} pages={pages} />
    </article>
  );
}
