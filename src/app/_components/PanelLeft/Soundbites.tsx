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
}

const PanelLeftSoundbites = React.memo(
  ({
    soundbites,
    categories,
    selectedCategories,
    onSelectCategory,
    onSelectSoundbite,
    mapRef,
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
        console.log('Soundbite clicked:', soundbite);
        console.log('mapRef exists:', !!mapRef);
        console.log('mapRef.current exists:', !!mapRef?.current);

        if (mapRef?.current) {
          console.log('Flying to:', soundbite.coordinates);
          try {
            const map = mapRef.current.getMap();
            console.log('Map instance:', !!map);
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
        <div className='pt-6 flex-1 overflow-hidden'>
          <SoundbitesList
            soundbites={filteredSoundbites}
            selectedCategories={selectedCategories}
            onSelectSoundbite={handleSoundbiteClick}
          />
        </div>
      </div>
    );
  }
);

PanelLeftSoundbites.displayName = 'PanelLeftSoundbites';

export default PanelLeftSoundbites;
