// components/SidebarContent.tsx
import React, { useMemo, useCallback } from 'react';
import CategoryFilter from '../CategoryFilter';
import SoundbitesList from '../SoundbitesList';
import type { Soundbite } from '../../../payload/payload-types';
import type { SoundbiteCategory } from '../../_utilities/soundbitesCategories';
import { MapRef } from 'react-map-gl';

interface PanelLeftSoundbitesProps {
  soundbites: Soundbite[];
  categories: SoundbiteCategory[];
  selectedCategories: SoundbiteCategory[];
  onSelectCategory: (categories: SoundbiteCategory[]) => void;
  onSelectSoundbite: (soundbite: Soundbite) => void;
  mapRef?: React.RefObject<MapRef>;
  selectedSoundbiteId?: string;
}

const PanelLeftSoundbites = React.memo(
  ({
    soundbites,
    categories,
    selectedCategories,
    onSelectCategory,
    onSelectSoundbite,
    mapRef,
    selectedSoundbiteId,
  }: PanelLeftSoundbitesProps) => {
    // Memoize filtered soundbites
    const filteredSoundbites = useMemo(() => {
      if (selectedCategories.length === 0) return soundbites;
      return soundbites.filter(
        (soundbite) => !selectedCategories.includes(soundbite.category)
      );
    }, [soundbites, selectedCategories]);

    const handleSoundbiteClick = useCallback(
      (soundbite: Soundbite) => {
        if (mapRef?.current) {
          try {
            const map = mapRef.current.getMap();
            map.flyTo({
              center: [
                soundbite.coordinates.longitude,
                soundbite.coordinates.latitude,
              ],
              zoom: 15,
              duration: 1500,
            });
          } catch (error) {
            console.error('Error flying to location:', error);
          }
        }
        onSelectSoundbite(soundbite);
      },
      [mapRef, onSelectSoundbite]
    );

    return (
      <div className='flex flex-col h-full'>
        <div className='p-4'>
          <CategoryFilter
            categories={categories}
            selectedCategories={selectedCategories}
            onSelectCategory={onSelectCategory}
          />
        </div>
        <div className='py-0 lg:py-6 flex-1 overflow-hidden'>
          <SoundbitesList
            categories={categories}
            soundbites={filteredSoundbites}
            selectedCategories={selectedCategories}
            onSelectSoundbite={handleSoundbiteClick}
            selectedSoundbiteId={selectedSoundbiteId}
          />
        </div>
      </div>
    );
  }
);

PanelLeftSoundbites.displayName = 'PanelLeftSoundbites';

export default PanelLeftSoundbites;
