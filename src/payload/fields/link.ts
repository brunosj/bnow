import type { Field } from 'payload/types';
import deepMerge from '../utilities/deepMerge';

export const appearanceOptions = {
  primary: {
    label: 'Primary Button',
    value: 'primary',
  },
  secondary: {
    label: 'Secondary Button',
    value: 'secondary',
  },
  default: {
    label: 'Default',
    value: 'default',
  },
};

export type LinkAppearances = 'primary' | 'secondary' | 'default';

type LinkType = (options?: {
  appearances?: LinkAppearances[] | false;
  disableLabel?: boolean;
  overrides?: Record<string, unknown>;
}) => Field;

const link: LinkType = ({
  appearances,
  disableLabel = false,
  overrides = {},
} = {}) => {
  const linkResult: Field = {
    name: 'link',
    type: 'group',
    label: false,
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'radio',
            options: [
              {
                label: {
                  en: 'Page',
                  de: 'Seite',
                },
                value: 'reference',
              },
              {
                label: {
                  en: 'Custom URL',
                  de: 'Interner Link',
                },
                value: 'custom',
              },
              {
                label: {
                  en: 'Email',
                  de: 'Email',
                },
                value: 'mailto',
              },
            ],
            defaultValue: 'reference',
            admin: {
              layout: 'horizontal',
              width: '50%',
            },
          },
          {
            name: 'newTab',
            label: 'Open in new tab',
            type: 'checkbox',
            admin: {
              width: '50%',
              style: {
                alignSelf: 'flex-end',
              },
            },
          },
        ],
      },
    ],
  };

  const linkTypes: Field[] = [
    {
      name: 'reference',
      label: {
        en: 'Page to link to',
        de: 'Seite verlinken',
      },
      type: 'relationship',
      relationTo: ['pages'],
      required: true,
      maxDepth: 2,
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'reference',
      },
    },
    {
      name: 'url',
      label: 'Custom URL',
      type: 'text',
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
      },
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'mailto',
      },
    },
    {
      name: 'subject',
      label: 'Subject Line',
      type: 'text',
      localized: true,
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'mailto',
        width: '100%',
      },
    },
    {
      name: 'body',
      label: 'Email Text Body',
      type: 'textarea',
      localized: true,
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'mailto',
        width: '100%',
      },
    },
  ];

  if (!disableLabel) {
    linkTypes.map((linkType) => ({
      ...linkType,
      admin: {
        ...linkType.admin,
        width: '50%',
      },
    }));

    linkResult.fields.push({
      type: 'row',
      fields: [
        ...linkTypes,
        {
          name: 'label',
          label: 'Label',
          type: 'text',
          required: true,
          localized: true,
          admin: {
            width: '50%',
          },
        },
      ],
    });
  } else {
    linkResult.fields = [...linkResult.fields, ...linkTypes];
  }

  if (appearances !== false) {
    let appearanceOptionsToUse = [
      appearanceOptions.default,
      appearanceOptions.primary,
      appearanceOptions.secondary,
    ];

    if (appearances) {
      appearanceOptionsToUse = appearances.map(
        (appearance) => appearanceOptions[appearance]
      );
    }

    linkResult.fields.push({
      name: 'appearance',
      type: 'select',
      defaultValue: 'default',
      options: appearanceOptionsToUse,
      admin: {
        description: 'Choose how the link should be rendered.',
        width: '50%',
      },
    });
  }

  return deepMerge(linkResult, overrides);
};

export default link;
