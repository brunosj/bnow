import type { Soundbite, Page, Menu } from '../../../payload/payload-types';
import type { SoundbiteCategory } from '../../_utilities/soundbitesCategories';

import React, { useRef } from 'react';
import PanelLeftHeader from './Header';
import ToggleButton from './ToggleButton';
import PanelLeftMenu from './Menu';
import PanelLeftSoundbites from './Soundbites';
import type { Map as MapboxMap, MapRef } from 'react-map-gl';
import { motion } from 'motion/react';

interface PanelLeftProps {
  soundbites: Soundbite[];
  onClose: () => void;
  onSelectSoundbite: (soundbite: Soundbite) => void;
  isOpen: boolean;
  onToggle: () => void;
  categories: SoundbiteCategory[];
  selectedCategories: SoundbiteCategory[];
  onSelectCategory: (categories: SoundbiteCategory[]) => void;
  onInfoClick: (slug: string) => void;
  pages: Page[];
  menu: Menu;
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  setIsAddingLocation: (value: boolean) => void;
  mapRef?: React.RefObject<MapRef>;
  selectedSoundbiteId?: string;
}

const PanelLeft: React.FC<PanelLeftProps> = ({
  soundbites,
  onSelectSoundbite,
  isOpen,
  onToggle,
  categories,
  selectedCategories,
  onSelectCategory,
  onInfoClick,
  pages,
  menu,
  isMenuOpen,
  onToggleMenu,
  setIsAddingLocation,
  mapRef,
  selectedSoundbiteId,
}) => {
  const handleInfoClick = () => {
    const howToUsePage = pages.find((p) => p.slug === 'how-to-use-the-site')!;
    onInfoClick(howToUsePage.slug);
    setIsAddingLocation(false);
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen shadow-lg z-30 w-1/5 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-[100%]'
      }`}
    >
      <PanelLeftHeader
        isMenuOpen={isMenuOpen}
        onToggleMenu={onToggleMenu}
        onInfoClick={handleInfoClick}
        pages={pages}
      />

      <div className='flex flex-col h-full bg-black relative'>
        {/* Menu */}
        {isMenuOpen ? (
          <PanelLeftMenu {...{ menu, pages, onInfoClick }} />
        ) : (
          // Soundbites
          <PanelLeftSoundbites
            {...{
              soundbites,
              categories,
              selectedCategories,
              onSelectCategory,
              onSelectSoundbite,
              mapRef,
              selectedSoundbiteId,
            }}
          />
        )}

        <div className='absolute right-2 '>
          <ToggleButton onToggle={onToggle} isOpen={isOpen} />
        </div>
      </div>
    </aside>
  );
};

export default PanelLeft;
