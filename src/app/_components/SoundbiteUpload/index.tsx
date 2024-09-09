'use client';

import React, { useState, useRef } from 'react';
import type { Soundbite } from '../../../payload/payload-types';
import Altcha from '../Altcha';

interface NewLocationFormProps {
  onClose: () => void;
  onSave: (newSoundbite: Soundbite) => void;
  lat: number;
  lng: number;
}

const NewLocationForm: React.FC<NewLocationFormProps> = ({
  onClose,
  onSave,
  lat,
  lng,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState<number | null>(null);
  const [category, setCategory] = useState<
    'music' | 'speech' | 'sound_effects' | null
  >(null);
  const [license, setLicense] = useState<
    'cc' | 'public_domain' | 'all_rights_reserved' | null
  >(null);
  const [tags, setTags] = useState<{ tag?: string; id?: string }[]>([]);
  const [contributorName, setContributorName] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const altchaRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Altcha payload:', altchaRef.current?.value);
  };

  const handleSave = async () => {
    if (file) {
      // Upload audio file
      const audioFormData = new FormData();
      audioFormData.append('title', title);
      audioFormData.append('file', file);

      let audioResponse;
      try {
        audioResponse = await fetch('/api/audio/custom-upload', {
          method: 'POST',
          body: audioFormData,
        });

        if (!audioResponse.ok) {
          const errorData = await audioResponse.json();
          throw new Error(errorData.error || 'Audio upload failed');
        }

        const uploadedAudio = await audioResponse.json();
        const fileId = uploadedAudio.doc.id; // Ensure this matches the backend response structure

        if (!fileId) {
          console.error('No fileId received from audio upload response');
          return;
        }

        // Now create the soundbite with the uploaded audio
        const soundbiteFormData = new FormData();
        soundbiteFormData.append('title', title);
        soundbiteFormData.append('description', description);
        soundbiteFormData.append('year', year ? year.toString() : '');
        soundbiteFormData.append('category', category ?? '');
        soundbiteFormData.append('license', license ?? '');
        soundbiteFormData.append('contributorName', contributorName);
        soundbiteFormData.append('coordinates[latitude]', lat.toString());
        soundbiteFormData.append('coordinates[longitude]', lng.toString());
        soundbiteFormData.append('status', 'draft');
        soundbiteFormData.append('audioGroup[audioUpload]', fileId);
        soundbiteFormData.append('audioGroup[audioFile]', fileId);

        const soundbiteResponse = await fetch('/api/soundbites/custom-create', {
          method: 'POST',
          body: soundbiteFormData,
        });

        if (!soundbiteResponse.ok) {
          throw new Error('Soundbite creation failed');
        }

        const newSoundbite = await soundbiteResponse.json();
        onSave(newSoundbite);
        onClose();
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.error('No file selected');
    }
  };

  return (
    <div className='max-w-2xl mx-auto  rounded-lg shadow-md'>
      <form className='form-control'>
        <div>
          <label className='label' htmlFor='title'>
            Title:
          </label>
          <input
            id='title'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='input  w-full'
          />
        </div>

        <div>
          <label className='label' htmlFor='description '>
            Description:
          </label>
          <textarea
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='input  w-full'
          />
        </div>

        <div>
          <label className='label' htmlFor='year'>
            Year:
          </label>
          <select
            id='year'
            value={year ?? ''}
            onChange={(e) => setYear(Number(e.target.value))}
            className='select'
          >
            <option value=''>Select Year</option>
            {Array.from(
              { length: 121 },
              (_, i) => new Date().getFullYear() - i
            ).map((yearOption) => (
              <option key={yearOption} value={yearOption}>
                {yearOption}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className='label' htmlFor='category'>
            Category:
          </label>
          <select
            id='category'
            value={category ?? ''}
            onChange={(e) =>
              setCategory(
                e.target.value as 'music' | 'speech' | 'sound_effects'
              )
            }
            className='select'
          >
            <option value=''>Select</option>
            <option value='music'>Music</option>
            <option value='speech'>Speech</option>
            <option value='sound_effects'>Sound Effects</option>
          </select>
        </div>

        <div>
          <label className='label' htmlFor='license'>
            License:
          </label>
          <select
            id='license'
            value={license ?? ''}
            onChange={(e) =>
              setLicense(
                e.target.value as 'cc' | 'public_domain' | 'all_rights_reserved'
              )
            }
            className='select'
          >
            <option value=''>Select</option>
            <option value='cc'>Creative Commons</option>
            <option value='public_domain'>Public Domain</option>
            <option value='all_rights_reserved'>All Rights Reserved</option>
          </select>
        </div>

        <div>
          <label className='label' htmlFor='contributorName'>
            Contributor Name:
          </label>
          <input
            id='contributorName'
            type='text'
            value={contributorName}
            onChange={(e) => setContributorName(e.target.value)}
            className='input  w-full'
          />
        </div>

        <div>
          <label className='label' htmlFor='file'>
            Audio File:
          </label>
          <input
            id='file'
            type='file'
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            className='file-input'
          />
        </div>
        {/* <div className='mt-6'>
          <Altcha ref={altchaRef} />
        </div> */}

        <button type='button' onClick={handleSave} className='btn mt-6'>
          Save
        </button>
      </form>
    </div>
  );
};

export default NewLocationForm;
