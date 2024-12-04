import type { Field } from 'payload/types';

import deepMerge from '../utilities/deepMerge';
import formatSlug from '../utilities/formatSlug';

type Slug = (
  helpMessage?: string,
  fieldToUse?: string,
  overrides?: Partial<Field>
) => Field;

export const slugField: Slug = (
  helpMessage,
  fieldToUse = 'title',
  overrides = {}
) =>
  deepMerge<Field, Partial<Field>>(
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      index: true,
      admin: {
        position: 'sidebar',
        description: helpMessage,
      },
      hooks: {
        beforeValidate: [formatSlug(fieldToUse)],
      },
    },
    overrides
  );
