// collections/AudioFiles.ts
import { CollectionConfig } from 'payload/types';
import path from 'path';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB

const ALLOWED_MIME_TYPES = [
  'audio/mpeg', // MP3
  'audio/mp3', // MP3
  'audio/x-mpeg-3', // MP3
  'audio/mpeg3', // MP3
  'audio/vnd.wav', // WAV
  'audio/wav', // WAV
  'audio/x-wav', // WAV
  'audio/wave', // WAV
  'audio/mp4', // MP4
  'audio/aiff', // AIFF
  'audio/x-aiff', // AIFF
  'audio/mp4a-latm', // M4A
  'audio/m4a', // M4A
  'audio/aac', // AAC
  'audio/x-aac', // AAC
  'audio/aacp', // AAC
  'audio/x-aacp', // AAC
];

const Audio: CollectionConfig = {
  slug: 'audio',
  upload: {
    staticDir: path.resolve(__dirname, '../../../../../media/audio'),
    mimeTypes: ALLOWED_MIME_TYPES,
  },
  access: {
    read: () => true,
    create: () => true,
  },
  endpoints: [
    {
      path: '/custom-upload-audio',
      method: 'post',
      handler: async (req, res, next) => {
        try {
          const { title } = req.body;
          const file = req.files.file;

          if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
          }

          // Validate file type
          if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
            return res.status(400).json({
              error:
                'Error - Invalid audio file type. Only MP3, WAV, MP4, AIFF, AAC, and M4A files are allowed.',
            });
          }

          // Validate file size
          if (file.size > MAX_FILE_SIZE) {
            return res.status(400).json({
              error: 'Error - Audio file size exceeds the 50MB limit',
            });
          }

          // Validate file duration
          // const duration = await getAudioDuration(file);
          // if (duration > 300) {
          //   // 300 seconds = 5 minutes
          //   return res
          //     .status(400)
          //     .json({ error: 'Audio duration exceeds the 5-minute limit' });
          // }

          const audioDoc = await req.payload.create({
            collection: 'audio',
            data: {
              title,
              file: file.id,
            },
            file: file,
          });

          res.status(200).json({
            message: 'Audio successfully uploaded.',
            doc: {
              id: audioDoc.id,
              title,
              filename: file.originalname,
              url: audioDoc.url,
            },
          });
        } catch (error) {
          console.error('Error in custom audio upload endpoint:', error);
          res.status(500).json({ error: 'Error uploading audio file' });
        }
      },
    },
  ],
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
    {
      name: 'createdAt',
      type: 'date',
      admin: {
        readOnly: true,
      },
    },
  ],
};

export default Audio;
