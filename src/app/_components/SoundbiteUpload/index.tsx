import React, { useState } from 'react';
import type { Soundbite } from '../../../payload/payload-types';
import classes from './index.module.css';

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

  const handleSave = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('year', year ? year.toString() : '');
      formData.append('category', category ?? '');
      formData.append('license', license ?? '');
      // formData.append('tags', JSON.stringify(tags));
      formData.append('contributorName', contributorName);
      formData.append('latitude', lat.toString());
      formData.append('longitude', lng.toString());
      formData.append('status', 'draft');

      // Log FormData contents
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      try {
        const response = await fetch('/api/soundbites', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Soundbite creation failed');
        }

        const newSoundbite = await response.json();
        console.log('Soundbite created:', newSoundbite);
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
    <div className={classes.sidebar}>
      <h3>Add New Soundbite</h3>
      <label>
        Title:
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label>
        Year:
        <input
          type='number'
          value={year ?? ''}
          onChange={(e) => setYear(Number(e.target.value))}
        />
      </label>
      <label>
        Category:
        <select
          value={category ?? ''}
          onChange={(e) =>
            setCategory(e.target.value as 'music' | 'speech' | 'sound_effects')
          }
        >
          <option value=''>Select</option>
          <option value='music'>Music</option>
          <option value='speech'>Speech</option>
          <option value='sound_effects'>Sound Effects</option>
        </select>
      </label>
      <label>
        License:
        <select
          value={license ?? ''}
          onChange={(e) =>
            setLicense(
              e.target.value as 'cc' | 'public_domain' | 'all_rights_reserved'
            )
          }
        >
          <option value=''>Select</option>
          <option value='cc'>Creative Commons</option>
          <option value='public_domain'>Public Domain</option>
          <option value='all_rights_reserved'>All Rights Reserved</option>
        </select>
      </label>
      <label>
        Tags:
        <input
          type='text'
          onChange={(e) => setTags([{ tag: e.target.value }])}
        />
      </label>
      <label>
        Contributor Name:
        <input
          type='text'
          value={contributorName}
          onChange={(e) => setContributorName(e.target.value)}
        />
      </label>
      <label>
        Audio File:
        <input
          type='file'
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        />
      </label>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default NewLocationForm;
