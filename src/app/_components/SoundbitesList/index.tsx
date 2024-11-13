// components/SoundbitesList.tsx
import React from 'react';
import SoundbiteCard from '../SoundbiteCard';
import type { Soundbite } from '../../../payload/payload-types';
import type { SoundbiteCategory } from '../../_utilities/soundbitesCategories';

interface SoundbitesListProps {
  soundbites: Soundbite[];
  selectedCategories: SoundbiteCategory[];
  onSelectSoundbite: (soundbite: Soundbite) => void;
}

const SoundbitesListItem = React.memo(
  ({
    soundbite,
    onSelectSoundbite,
  }: {
    soundbite: Soundbite;
    onSelectSoundbite: (soundbite: Soundbite) => void;
  }) => (
    <li
      key={soundbite.id}
      className='rounded-3xl overflow-y-auto shadow-lg p-2 border-white border-[1px] border-opacity-25'
    >
      <SoundbiteCard
        soundbite={soundbite}
        onClick={() => onSelectSoundbite(soundbite)}
      />
    </li>
  )
);

SoundbitesListItem.displayName = 'SoundbitesListItem';

const SoundbitesList = React.memo(
  ({
    soundbites,
    selectedCategories,
    onSelectSoundbite,
  }: SoundbitesListProps) => {
    if (selectedCategories.length == soundbites.length) {
      return (
        <p className='text-gray-500 text-center  px-4'>
          Please select categories to view Soundbites
        </p>
      );
    }

    return (
      <ul className='space-y-3 overflow-y-auto h-full px-4'>
        {soundbites.map((soundbite) => (
          <SoundbitesListItem
            key={soundbite.id}
            soundbite={soundbite}
            onSelectSoundbite={onSelectSoundbite}
          />
        ))}
      </ul>
    );
  }
);

SoundbitesList.displayName = 'SoundbitesList';

export default SoundbitesList;
