import type { CollectionConfig } from 'payload/types';

import { admins } from '../../access/admins';
import { adminsOrPublished } from '../../access/adminsOrPublished';
import { hero } from '../../fields/hero';
import { slugField } from '../../fields/slug';
import { populateArchiveBlock } from '../../hooks/populateArchiveBlock';
import { populatePublishedAt } from '../../hooks/populatePublishedAt';

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    preview: (doc) => {
      return `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/next/preview?url=${encodeURIComponent(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/${doc.slug !== 'home' ? doc.slug : ''}`
      )}&secret=${process.env.PAYLOAD_PUBLIC_DRAFT_SECRET}`;
    },
  },
  // hooks: {
  //   beforeChange: [populatePublishedAt],
  //   afterChange: [revalidatePage],
  //   afterRead: [populateArchiveBlock],
  // },
  versions: {
    drafts: true,
  },
  access: {
    read: adminsOrPublished,
    update: admins,
    create: admins,
    delete: admins,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [hero],
        },
      ],
    },
    slugField(),
  ],
};
