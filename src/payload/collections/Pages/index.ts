import type { CollectionConfig } from 'payload/types';

import { admins } from '../../access/admins';
import { adminsOrPublished } from '../../access/adminsOrPublished';
import { slugField } from '../../fields/slug';
import { createRichTextField } from '../../fields/createRichTextField';

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
      name: 'content',
      type: 'richText',
      required: false,
    },
    createRichTextField({
      label: 'Page Content',
    }),
    // {
    //   name: 'publishedAt',
    //   type: 'date',
    //   admin: {
    //     position: 'sidebar',
    //   },
    // },

    slugField(),
  ],
};
