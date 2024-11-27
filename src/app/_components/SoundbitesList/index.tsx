// components/SoundbitesList.tsx
import React, { useCallback } from 'react';
import SoundbiteCard from '../SoundbiteCard';
import type { Soundbite } from '../../../payload/payload-types';
import type { SoundbiteCategory } from '../../_utilities/soundbitesCategories';

interface SoundbitesListProps {
  soundbites: Soundbite[];
  categories: SoundbiteCategory[];
  selectedCategories: SoundbiteCategory[];
  onSelectSoundbite: (soundbite: Soundbite) => void;
  selectedSoundbiteId?: string;
}

const SoundbitesListItem = React.memo(
  ({
    soundbite,
    onSelectSoundbite,
    selectedSoundbiteId,
  }: {
    soundbite: Soundbite;
    onSelectSoundbite: (soundbite: Soundbite) => void;
    selectedSoundbiteId?: string;
  }) => {
    const handleClick = useCallback(() => {
      onSelectSoundbite(soundbite);
    }, [onSelectSoundbite, soundbite]);

    return (
      <SoundbiteCard
        soundbite={soundbite}
        onClick={handleClick}
        isSelected={selectedSoundbiteId === soundbite.id}
      />
    );
  }
);

SoundbitesListItem.displayName = 'SoundbitesListItem';

const SoundbitesList = React.memo(
  ({
    soundbites,
    categories,
    selectedCategories,
    onSelectSoundbite,
    selectedSoundbiteId,
  }: SoundbitesListProps) => {
    if (selectedCategories.length === categories.length) {
      return (
        <p className='text-center'>
          Please select categories to view Soundbites
        </p>
      );
    }

    return (
      <ul className='flex lg:block overflow-x-auto lg:overflow-x-hidden overflow-y-hidden lg:overflow-y-auto h-[92%] px-4 space-x-4 lg:space-x-0 lg:space-y-4 hide-scrollbar items-center '>
        {soundbites.map((soundbite) => (
          <li
            className='flex-shrink-0  w-72 lg:w-auto last-of-type:pb-6'
            key={soundbite.id}
          >
            <SoundbitesListItem
              soundbite={soundbite}
              onSelectSoundbite={onSelectSoundbite}
              selectedSoundbiteId={selectedSoundbiteId}
            />
          </li>
        ))}
      </ul>
    );
  }
);

SoundbitesList.displayName = 'SoundbitesList';

export default SoundbitesList;
