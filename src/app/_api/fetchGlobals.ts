import type { Footer, Header, Settings } from '../../payload/payload-types';
import { getPayloadClient } from '../../payload/getPayload';

// Fetch settings using the Local API
export async function fetchSettings(): Promise<Settings> {
  const payload = await getPayloadClient();
  try {
    const settings = await payload.findGlobal({ slug: 'settings' });
    return settings as Settings;
  } catch (error) {
    throw new Error('Error fetching settings');
  }
}

// Fetch header using the Local API
export async function fetchHeader(): Promise<Header> {
  const payload = await getPayloadClient();
  try {
    const header = await payload.findGlobal({ slug: 'header' });
    return header as Header;
  } catch (error) {
    throw new Error('Error fetching header');
  }
}

// Fetch footer using the Local API
export async function fetchFooter(): Promise<Footer> {
  const payload = await getPayloadClient();
  try {
    const footer = await payload.findGlobal({ slug: 'footer' });
    return footer as Footer;
  } catch (error) {
    throw new Error('Error fetching footer');
  }
}

// Fetch all globals in parallel
export const fetchGlobals = async (): Promise<{
  settings: Settings;
  header: Header;
  footer: Footer;
}> => {
  // Initiate requests in parallel, then wait for them to resolve
  const settingsData = fetchSettings();
  const headerData = fetchHeader();
  const footerData = fetchFooter();

  const [settings, header, footer]: [Settings, Header, Footer] =
    await Promise.all([settingsData, headerData, footerData]);

  return {
    settings,
    header,
    footer,
  };
};
