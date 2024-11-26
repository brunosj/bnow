import React, { useState, useEffect } from 'react';
import SoundbiteUploadForm from '../SoundbiteUploadForm';
import PanelRight from '../PanelRight';

interface SidebarNewLocationProps {
  onClose: () => void;
  onSave: (newSoundbite: any) => void;
  lat: number;
  lng: number;
  setIsAddingLocation: (value: boolean) => void;
  isOpen: boolean;
}

const SidebarNewLocation = ({
  onClose,
  onSave,
  setIsAddingLocation,
  lat,
  lng,
}: SidebarNewLocationProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSave = (data: any) => {
    console.log('Form data received:', data);
    setFormData(data);
  };

  const handleConfirmLocation = async () => {
    setIsSubmitting(true);

    try {
      const audioFormData = new FormData();
      audioFormData.append('title', formData.title);
      audioFormData.append('file', formData.file);

      const audioResponse = await fetch('/api/audio/custom-upload-audio', {
        method: 'POST',
        body: audioFormData,
      });

      if (!audioResponse.ok) {
        throw new Error('Audio upload failed');
      }

      const uploadedAudio = await audioResponse.json();
      const fileId = uploadedAudio.doc.id;

      let transcriptId;
      if (formData.transcriptFile) {
        // Handle transcript upload
        const transcriptFormData = new FormData();
        transcriptFormData.append('title', formData.title);
        transcriptFormData.append('file', formData.transcriptFile);

        const transcriptResponse = await fetch(
          '/api/transcripts/custom-upload-transcript',
          {
            method: 'POST',
            body: transcriptFormData,
          }
        );

        if (transcriptResponse.ok) {
          const uploadedTranscript = await transcriptResponse.json();
          transcriptId = uploadedTranscript.doc.id;
        }
      }

      const soundbiteFormData = new FormData();
      soundbiteFormData.append('title', formData.title);
      soundbiteFormData.append('description', formData.description);
      soundbiteFormData.append('year', formData.year?.toString() || '');
      soundbiteFormData.append('category', formData.category || '');
      soundbiteFormData.append('license', formData.license || '');
      soundbiteFormData.append('author', formData.author);
      soundbiteFormData.append('coordinates[latitude]', lat.toString());
      soundbiteFormData.append('coordinates[longitude]', lng.toString());
      soundbiteFormData.append('status', 'draft');
      soundbiteFormData.append('audioGroup[audioUpload]', fileId);
      soundbiteFormData.append('audioGroup[audioFile]', fileId);

      if (transcriptId) {
        soundbiteFormData.append('uploadedTranscript', transcriptId);
      }

      const soundbiteResponse = await fetch(
        '/api/soundbites/custom-create-soundbite',
        {
          method: 'POST',
          body: soundbiteFormData,
        }
      );

      if (!soundbiteResponse.ok) {
        throw new Error('Failed to create soundbite');
      }

      const newSoundbite = await soundbiteResponse.json();
      onSave(newSoundbite);
      setStep(3);
    } catch (error) {
      console.error('Error:', error);
      alert(error.message || 'An unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PanelRight
      title='Add your Soundbite'
      onClose={onClose}
      setIsAddingLocation={setIsAddingLocation}
      isOpen={true}
    >
      {step === 1 ? (
        <div className='space-y-4'>
          <p className='text-sm'>
            First, fill in the details about your soundbite.
          </p>
          <SoundbiteUploadForm
            onClose={onClose}
            onSave={handleFormSave}
            lat={lat}
            lng={lng}
            onNextStep={() => setStep(2)}
          />
        </div>
      ) : step === 2 ? (
        <div className='space-y-6'>
          <p className='text-sm'>
            Using the map, please drag the marker to confirm the location of
            your soundbite.
          </p>
          <div className='flex space-x-3'>
            <button
              onClick={() => setStep(1)}
              className='flex-1 bg-black text-bnowGreen border-2 border-bnowGreen py-2 px-4 rounded-md'
            >
              Back
            </button>
            <button
              onClick={handleConfirmLocation}
              disabled={isSubmitting}
              className='flex-1 bg-bnowGreen text-black dark:text-white py-2 px-4 rounded-md'
            >
              {isSubmitting ? (
                <div className='flex items-center justify-center space-x-3'>
                  <div className='lds-ring'>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                  <span>Uploading...</span>
                </div>
              ) : (
                <span>Submit</span>
              )}
            </button>

            {/* Latitude and Longitude info box */}
            <div className='absolute bottom-8 left-4 text-primary p-2 shadow-lg rounded-md z-10 bg-neutral bg-opacity-95'>
              <p className='text-xs font-mono'>
                Latitude:
                <span className='text-bnowGreen'> {lat.toFixed(6)}</span>
                <br />
                Longitude:
                <span className='text-bnowGreen'> {lng.toFixed(6)}</span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className='space-y-6'>
          <p className='text-sm'>
            Thanks! Your Soundbite has been added for approval.
          </p>
          <button
            onClick={onClose}
            className='w-full bg-bnowGreen text-black dark:text-white py-2 px-4 rounded-md'
          >
            Close
          </button>
        </div>
      )}
    </PanelRight>
  );
};

export default SidebarNewLocation;
