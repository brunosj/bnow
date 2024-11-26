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
  onSave: (formData: {
    title: string;
    description: string;
    year: number | null;
    category: SoundbiteCategory | null;
    license: 'cc' | 'public_domain' | 'all_rights_reserved' | null;
    author: string;
    file: File | null;
    transcriptFile: File | null;
  }) => void;
  lat: number;
  lng: number;
  onNextStep: () => void;
}

const SoundbiteUploadForm: React.FC<SoundbiteUploadFormProps> = ({
  onClose,
  onSave,
  lat,
  lng,
  onNextStep,
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

  const altchaRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Altcha payload:', altchaRef.current?.value);
  };

  const handleNext = () => {
    const missingFields = [];

    if (!title) missingFields.push('Title');
    if (!file) missingFields.push('Sound File');
    if (!year) missingFields.push('Year');
    if (!description) missingFields.push('Description');
    if (!category) missingFields.push('Category');
    if (!license) missingFields.push('License');
    if (!agreedToPrivacyPolicy) missingFields.push('Privacy Policy Agreement');

    if (missingFields.length > 0) {
      setError(
        `Please fill in the following required fields: ${missingFields.join(', ')}`
      );
      return;
    }

    onSave({
      title,
      description,
      year,
      category,
      license,
      author,
      file,
      transcriptFile,
    });

    onNextStep();
  };

  return (
    <div className='max-w-2xl mx-auto rounded-lg shadow-md pb-6'>
      <form className='space-y-3'>
        <div className='flex justify-between items-center gap-3'>
          <TextInput
            id='title'
            label='Title*'
            value={title}
            onChange={setTitle}
            placeholder='Enter a title'
          />
          <SelectInput
            id='year'
            label='Year*'
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
          />
        </div>
        <TextArea
          id='description'
          label='Description*'
          value={description}
          onChange={setDescription}
          placeholder='Enter a brief description (max 350 characters)'
          maxLength={350}
        />
        <FileInput
          id='transcriptFile'
          label='Transcription'
          onChange={setTranscriptFile}
        />
        <SelectInput
          id='category'
          label='Category*'
          value={category ?? null}
          options={soundbiteCategoryOptions}
          onChange={(value) => setCategory(value as SoundbiteCategory)}
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
        />
        <TextInput
          id='author'
          label='Author'
          value={author}
          onChange={setAuthor}
        />
        <FileInput
          id='file'
          label='Sound File* (max. 50MB)'
          onChange={setFile}
        />

        <CheckboxInput
          checked={agreedToPrivacyPolicy}
          label='I agree to the privacy policy'
          onChange={() => setAgreedToPrivacyPolicy(!agreedToPrivacyPolicy)}
        />
        {error && (
          <p className='text-bnowRed pt-3 text-sm font-semibold text-center'>
            {error}
          </p>
        )}
        <div className='w-full'>
          <button
            type='button'
            onClick={handleNext}
            className='mt-3 w-full bg-bnowGreen text-black dark:text-white py-2 px-4 rounded-md'
          >
            <span>Next</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SoundbiteUploadForm;
