import { CollectionConfig } from 'payload/types';
import audioField from '../../fields/audioField';
import afterChangeHook from '../../hooks/afterChangeHook';

const SoundBites: CollectionConfig = {
  slug: 'soundbites',
  labels: {
    singular: 'Sound Bite',
    plural: 'Sound Bites',
  },
  access: {
    read: () => true,
    update: () => true,
    create: () => true,
  },
  admin: {
    defaultColumns: [
      'title',
      'year',
      'longitude',
      'latitude',
      'approved',
      'createdAt',
    ],
    useAsTitle: 'title',
  },
  endpoints: [
    {
      path: '/custom-create-soundbite',
      method: 'post',
      handler: async (req, res, next) => {
        try {
          const {
            title,
            description,
            year,
            category,
            license,
            tags,
            author,
            audioGroup,
            uploadedTranscript,
            coordinates,
            status,
          } = req.body;

          // Handle soundbite creation
          const soundbiteDoc = await req.payload.create({
            collection: 'soundbites',
            data: {
              title,
              description,
              year,
              category,
              license,
              tags,
              author,
              audioGroup: {
                audioFile: audioGroup.audioFile,
                audioUpload: audioGroup.audioUpload,
              },
              uploadedTranscript,
              coordinates,
              status,
            },
            depth: 2,
          });

          res.status(200).json({
            message: 'Soundbite successfully created.',
            doc: soundbiteDoc,
          });
        } catch (error) {
          console.error('Error in custom soundbite creation endpoint:', error);
          res.status(500).json({ error: 'Error creating soundbite' });
        }
      },
    },
  ],
  hooks: {
    afterChange: [afterChangeHook],
  },
  fields: [
    {
      type: 'group',
      name: 'audioGroup',
      label: 'Audio File',
      fields: [
        audioField,
        {
          name: 'audioUpload',
          type: 'relationship',
          relationTo: 'audio',
          admin: {
            description:
              'You need to refresh the page after uploading/selecting a new audio file to see the changes in the player.',
          },
        },
      ],
    },
    {
      name: 'title',
      type: 'text',
      required: false,
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
    },
    {
      name: 'author',
      type: 'text',
      admin: {
        condition: (data) => !data?.user,
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'year',
          type: 'number',
          required: false,
          admin: {
            step: 1,
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'category',
          type: 'select',
          options: [
            { label: 'Oral History', value: 'oral_history' },
            { label: 'Interview', value: 'interview' },
            { label: 'Field Recording', value: 'field_recording' },
            { label: 'Soundscapes / Sound Art', value: 'soundscapes' },
          ],
          required: true,
        },
        {
          name: 'license',
          type: 'select',
          options: [
            { label: 'Creative Commons', value: 'cc' },
            { label: 'Public Domain', value: 'public_domain' },
            { label: 'All Rights Reserved', value: 'all_rights_reserved' },
          ],
        },
      ],
    },
    {
      name: 'uploadedTranscript',
      label: 'Uploaded Transcript',
      type: 'relationship',
      relationTo: 'transcripts',
    },
    {
      name: 'publishedTranscript',
      label: 'Published Transcript',
      type: 'richText',
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },

    {
      name: 'status',
      type: 'select',
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Published',
          value: 'published',
        },
        {
          label: 'Archived',
          value: 'archived',
        },
      ],
      defaultValue: 'draft',
      admin: { position: 'sidebar' },
    },
    {
      type: 'group',
      name: 'coordinates',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'latitude',
          type: 'number',
          required: false,
          admin: {
            step: 0.000001,
          },
        },
        {
          name: 'longitude',
          type: 'number',
          required: false,
          admin: {
            step: 0.000001,
          },
        },
      ],
    },

    // {
    //   name: 'moderationNotes',
    //   type: 'textarea',
    //   admin: {
    //     readOnly: false,
    //   },
    // },
  ],
};

export default SoundBites;
