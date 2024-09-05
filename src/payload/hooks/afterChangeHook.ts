import { CollectionAfterChangeHook } from 'payload/types';

const afterChangeHook: CollectionAfterChangeHook = async ({
  doc, // full document data
  req, // full express request
  previousDoc, // document data before updating the collection
  operation, // name of the operation ie. 'create', 'update'
}) => {
  // Log the hook start
  console.log('Hook started:', { doc, previousDoc, operation });

  // Check if the operation is create or update
  if (operation === 'create' || operation === 'update') {
    try {
      // Check if audioGroup exists and if 'audioUpload' is set
      const { audioGroup } = doc;
      if (audioGroup?.audioUpload) {
        // Fetch the related audio document
        const audioDoc = await req.payload.findByID({
          collection: 'audio', // The slug of your audio collection
          id: audioGroup.audioUpload, // ID of the related audio document
        });

        // Check if an update is necessary
        const shouldUpdateAudioFile =
          !audioGroup.audioFile ||
          audioGroup.audioFile !== audioGroup.audioUpload;

        if (shouldUpdateAudioFile) {
          console.log('Updating audioFile to match audioUpload...');

          await req.payload.update({
            collection: 'soundbites', // The slug of your collection
            id: doc.id, // ID of the current document
            data: {
              audioGroup: {
                ...audioGroup,
                audioFile: audioGroup.audioUpload, // Copy audioUpload to audioFile
              },
            },
          });
          console.log('audioFile was set to audioUpload value');
        } else if (audioDoc && audioGroup.audioFile !== audioDoc.id) {
          // Check if 'audioFile' already has the correct value from the audio document
          console.log(
            'Updating audioFile with the correct audio document ID...'
          );

          await req.payload.update({
            collection: 'soundbites', // The slug of your collection
            id: doc.id, // ID of the current document
            data: {
              audioGroup: {
                ...audioGroup,
                audioFile: audioDoc.id, // Set the audioFile with the audio document ID
              },
            },
          });
          console.log('audioFile updated in audioGroup');
        }
      }
    } catch (error) {
      console.error('Error updating audioFile field:', error);
    }
  }

  console.log('Hook ended');
  return doc;
};

export default afterChangeHook;
