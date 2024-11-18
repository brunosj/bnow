import Map from './_components/Map';
import { fetchSoundbites } from './_api/fetchSoundbites';
import { fetchPages } from './_api/fetchPages';
import { fetchMenu } from './_api/fetchMenu';

export const revalidate = 30;

export default async function MapView() {
  const pages = await fetchPages();
  const soundbites = await fetchSoundbites();
  const menu = await fetchMenu();
  return (
    <article>
      <Map soundbites={soundbites} pages={pages} menu={menu} />
    </article>
  );
}
