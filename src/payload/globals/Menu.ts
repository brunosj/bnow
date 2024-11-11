import type { GlobalConfig } from 'payload/types';

import link from '../fields/link';

export const Menu: GlobalConfig = {
  slug: 'menu',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      maxRows: 6,
      fields: [
        link({
          appearances: false,
        }),
      ],
    },
  ],
};
