// components/SidebarContent.tsx
import React, { useMemo } from 'react';
import CategoryFilter from '../CategoryFilter';
import SoundbitesList from '../SoundbitesList';
import type { Soundbite } from '../../../payload/payload-types';
import type { SoundbiteCategory } from '../../_utilities/soundbitesCategories';

interface PanelLeftSoundbitesProps {
  soundbites: Soundbite[];
  categories: SoundbiteCategory[];
  selectedCategories: SoundbiteCategory[];
  onSelectCategory: (categories: SoundbiteCategory[]) => void;
  onSelectSoundbite: (soundbite: Soundbite) => void;
}

const PanelLeftSoundbites = React.memo(
  ({
    soundbites,
    categories,
    selectedCategories,
    onSelectCategory,
    onSelectSoundbite,
  }: PanelLeftSoundbitesProps) => {
    // Memoize filtered soundbites
    const filteredSoundbites = useMemo(() => {
      if (selectedCategories.length === 0) return soundbites;
      return soundbites.filter(
        (soundbite) => !selectedCategories.includes(soundbite.category)
      );
    }, [soundbites, selectedCategories]);

    return (
      <div className='flex flex-col h-full'>
        <div className='p-4'>
          <CategoryFilter
            categories={categories}
            selectedCategories={selectedCategories}
            onSelectCategory={onSelectCategory}
          />
        </div>
        <div className='pt-6 flex-1 overflow-hidden'>
          <SoundbitesList
            soundbites={filteredSoundbites}
            selectedCategories={selectedCategories}
            onSelectSoundbite={onSelectSoundbite}
          />
        </div>
      </div>
    );
  }
);

PanelLeftSoundbites.displayName = 'PanelLeftSoundbites';

export default PanelLeftSoundbites;
