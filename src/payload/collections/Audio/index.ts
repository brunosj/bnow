// collections/AudioFiles.ts
import { CollectionConfig } from 'payload/types'
import path from 'path'
import CustomAudioCell from '../../components/CustomAudioCell'
import CustomAudioField from '../../components/CustomAudioField'
import { admins } from '@/payload/access/admins'
import { adminsOrPublished } from '@/payload/access/adminsOrPublished'
import audioField from '../../fields/audioField'

const Audio: CollectionConfig = {
  slug: 'audio',
  upload: {
    staticDir: path.resolve(__dirname, '../../../../media/audio'),
    mimeTypes: ['audio/*'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'Caption',
      type: 'textarea',
    },
    // {
    //   name: 'audioPreview',
    //   type: 'ui',
    //   admin: {
    //     components: {
    //       Field: CustomAudioField,
    //       Cell: CustomAudioCell,
    //     },
    //   },
    // },

    // {
    //   name: 'duration',
    //   type: 'number',
    //   admin: {
    //     readOnly: true,
    //     description: 'Duration of the audio file in seconds.',
    //   },
    // },
    // {
    //   name: 'format',
    //   type: 'text',
    //   admin: {
    //     readOnly: true,
    //     description: 'Audio file format (e.g., mp3, wav).',
    //   },
    // },
    // {
    //   name: 'size',
    //   type: 'number',
    //   admin: {
    //     readOnly: true,
    //     description: 'Size of the audio file in bytes.',
    //   },
    // },
    // {
    //   name: 'uploadedBy',
    //   type: 'relationship',
    //   relationTo: 'users',
    //   admin: {
    //     readOnly: true,
    //   },
    // },
    {
      name: 'createdAt',
      type: 'date',
      admin: {
        readOnly: true,
      },
    },
  ],
}

export default Audio
