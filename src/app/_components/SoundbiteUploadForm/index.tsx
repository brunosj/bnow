'use client';

import React, { useState, useRef } from 'react';
import type { Soundbite } from '../../../payload/payload-types';
import Altcha from '../Altcha';
import {
  SoundbiteCategory,
  soundbiteCategoryOptions,
} from '../../_utilities/soundbitesCategories';
import TextInput from '../Form/TextInput';
import TextArea from '../Form/TextArea';
import SelectInput from '../Form/SelectInput';
import FileInput from '../Form/FileInput';
import CheckboxInput from '../Form/CheckboxInput';

interface SoundbiteUploadFormProps {
  onClose: () => void;
  onSave: (newSoundbite: Soundbite) => void;
  lat: number;
  lng: number;
}

const SoundbiteUploadForm: React.FC<SoundbiteUploadFormProps> = ({
  onClose,
  onSave,
  lat,
  lng,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState<number | null>(null);
  const [category, setCategory] = useState<SoundbiteCategory | null>(null);
  const [license, setLicense] = useState<
    'cc' | 'public_domain' | 'all_rights_reserved' | null
  >(null);
  const [author, setAuthor] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [transcriptFile, setTranscriptFile] = useState<File | null>(null);
  const [agreedToPrivacyPolicy, setAgreedToPrivacyPolicy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const altchaRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Altcha payload:', altchaRef.current?.value);
  };

  const handleSave = async () => {
    setError(null);
    setSuccessMessage(null);
    setIsSubmitting(false);

    if (
      !title ||
      !file ||
      !year ||
      !description ||
      !category ||
      !license ||
      !agreedToPrivacyPolicy
    ) {
      setError(
        'Please fill in all required fields (*) and agree to the privacy policy.'
      );
      return;
    }

    if (submitted) {
      setError('This soundbite has already been submitted.');
      return;
    }

    setIsSubmitting(true);

    if (file) {
      const audioFormData = new FormData();
      audioFormData.append('title', title);
      audioFormData.append('file', file);

      try {
        const audioResponse = await fetch('/api/audio/custom-upload-audio', {
          method: 'POST',
          body: audioFormData,
        });

        if (!audioResponse.ok) {
          const errorData = await audioResponse.json();
          throw new Error(errorData.error || 'Audio upload failed');
        }

        const uploadedAudio = await audioResponse.json();
        const fileId = uploadedAudio.doc.id;

        if (!fileId) {
          console.error('No fileId received from audio upload response');
          return;
        }

        let transcriptId: string | undefined;
        if (transcriptFile) {
          const transcriptFormData = new FormData();
          transcriptFormData.append('title', title);
          transcriptFormData.append('file', transcriptFile as File);

          const transcriptResponse = await fetch(
            '/api/transcripts/custom-upload-transcript',
            {
              method: 'POST',
              body: transcriptFormData,
            }
          );

          if (!transcriptResponse.ok) {
            const errorData = await transcriptResponse.json();
            throw new Error(errorData.error || 'Transcript upload failed');
          }

          const uploadedTranscript = await transcriptResponse.json();
          transcriptId = uploadedTranscript.doc.id;
        }

        const soundbiteFormData = new FormData();
        soundbiteFormData.append('title', title);
        soundbiteFormData.append('description', description);
        soundbiteFormData.append('year', year ? year.toString() : '');
        soundbiteFormData.append('category', category ?? '');
        soundbiteFormData.append('license', license ?? '');
        soundbiteFormData.append('author', author);
        soundbiteFormData.append('coordinates[latitude]', lat.toString());
        soundbiteFormData.append('coordinates[longitude]', lng.toString());
        soundbiteFormData.append('status', 'draft');
        soundbiteFormData.append('audioGroup[audioUpload]', fileId);
        soundbiteFormData.append('audioGroup[audioFile]', fileId);

        if (transcriptId) {
          soundbiteFormData.append('uploadedTranscript', transcriptId);
        } else {
          console.error('Transcript ID is missing.');
        }

        const soundbiteResponse = await fetch(
          '/api/soundbites/custom-create-soundbite',
          {
            method: 'POST',
            body: soundbiteFormData,
          }
        );

        if (!soundbiteResponse.ok) {
          const errorData = await soundbiteResponse.json();
          console.error('Soundbite creation failed:', errorData);
          throw new Error('Soundbite creation failed');
        }

        const newSoundbite = await soundbiteResponse.json();

        onSave(newSoundbite);
        setSuccessMessage('Soundbite uploaded successfully!');
        setSubmitted(true);
        // Optionally reset the form fields here if needed
        setIsSubmitting(false);
        // onClose();
      } catch (error) {
        console.error('Error:', error);
        setError(error.message || 'An unknown error occurred.');
        setIsSubmitting(false);
      }
    } else {
      console.error('No file chosen');
      setError('No audio file selected.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className='max-w-2xl mx-auto rounded-lg shadow-md'>
      <form className='space-y-3'>
        <div className='flex justify-between items-center gap-3'>
          <TextInput
            id='title'
            label='Title*'
            value={title}
            onChange={setTitle}
            disabled={submitted}
          />
          <SelectInput
            id='year'
            label='Year'
            value={year?.toString() ?? null}
            option=''
            options={Array.from(
              { length: 121 },
              (_, i) => new Date().getFullYear() - i
            ).map((yearOption) => ({
              label: yearOption.toString(),
              value: yearOption.toString(),
            }))}
            onChange={(value) => setYear(Number(value))}
            disabled={submitted}
          />
        </div>
        <TextArea
          id='description'
          label='Description*'
          value={description}
          onChange={setDescription}
          disabled={submitted}
        />
        <FileInput
          id='transcriptFile'
          label='Transcription'
          onChange={setTranscriptFile}
          disabled={submitted}
        />
        <SelectInput
          id='category'
          label='Category*'
          value={category ?? null}
          options={soundbiteCategoryOptions}
          onChange={(value) => setCategory(value as SoundbiteCategory)}
          disabled={submitted}
        />
        <SelectInput
          id='license'
          label='License*'
          value={license ?? null}
          options={[
            { label: 'Creative Commons', value: 'cc' },
            { label: 'Public Domain', value: 'public_domain' },
            { label: 'All Rights Reserved', value: 'all_rights_reserved' },
          ]}
          onChange={(value) =>
            setLicense(value as 'cc' | 'public_domain' | 'all_rights_reserved')
          }
          disabled={submitted}
        />
        <TextInput
          id='author'
          label='Author'
          value={author}
          onChange={setAuthor}
          disabled={submitted}
        />
        <FileInput
          id='file'
          label='Sound File*'
          onChange={setFile}
          disabled={submitted}
        />

        <CheckboxInput
          checked={agreedToPrivacyPolicy}
          label='I agree to the privacy policy'
          onChange={() => setAgreedToPrivacyPolicy(!agreedToPrivacyPolicy)}
          disabled={submitted}
        />
        {error && (
          <p className='text-pri pt-3 text-sm font-semibold text-center'>
            {error}
          </p>
        )}
        {successMessage && (
          <p className='text-ter pt-3 text-sm font-semibold text-center'>
            {successMessage}
          </p>
        )}
        <div className='w-full'>
          <button
            type='button'
            onClick={handleSave}
            className='mt-3 w-full bg-ter text-black py-2 px-4 rounded-md'
            disabled={isSubmitting || submitted}
          >
            <div className='text-sm font-semibold'>
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
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SoundbiteUploadForm;
