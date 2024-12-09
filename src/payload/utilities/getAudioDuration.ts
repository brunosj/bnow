import { parseBlob } from 'music-metadata';
import fs from 'fs';
import path from 'path';

export const getAudioMetadata = async (filePath: string): Promise<void> => {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    const blob = new Blob([fileBuffer]);
    const metadata = await parseBlob(blob);

    const duration = metadata.format.duration;
    // console.log(`Duration: ${duration}
    // console.log('Metadata:', metadata);
  } catch (error) {
    console.error('Error getting audio metadata:', error);
    throw new Error('Unable to get audio metadata');
  }
};
