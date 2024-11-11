import { webpackBundler } from '@payloadcms/bundler-webpack';
import { mongooseAdapter } from '@payloadcms/db-mongodb';

import type { GenerateTitle } from '@payloadcms/plugin-seo/types';
import { slateEditor } from '@payloadcms/richtext-slate';
import dotenv from 'dotenv';
import path from 'path';
import { buildConfig } from 'payload/config';
import Logo from './components/Logo';
import Icon from './components/Icon';

import Audio from './collections/Audio';
import { Media } from './collections/Media';
import { Pages } from './collections/Pages';
import SoundBites from './collections/SoundBites';
import Transcripts from './collections/Transcripts';
import Users from './collections/Users';
import { Menu } from './globals/Menu';

const generateTitle: GenerateTitle = () => {
  return 'Birmingham Sound Map';
};

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    components: {
      graphics: {
        Logo,
        Icon,
      },
    },
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  collections: [Pages, Audio, SoundBites, Transcripts, Media, Users],
  globals: [Menu],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
    declare: false,
  },
  // upload: {
  //   limits: {
  //     fileSize: 50 * 1024 * 1024,
  //   },
  // },
  cors: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(Boolean),
  csrf: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(Boolean),
});
