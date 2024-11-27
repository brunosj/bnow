import type { CollectionConfig } from 'payload/types';

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'icon', 'description', 'createdAt'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'images',
      required: true,
    },
    {
      name: 'color',
      type: 'text',
      required: true,
      admin: {
        description: 'Hex color code',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
    },
  ],
};
