import type { Soundbite, Page, Menu } from '../../../payload/payload-types';
import type { SoundbiteCategory } from '../../_utilities/soundbitesCategories';

import React, { useRef } from 'react';
import PanelLeftHeader from './Header';
import ToggleButton from './ToggleButton';
import PanelLeftMenu from './Menu';
import PanelLeftSoundbites from './Soundbites';
import type { Map as MapboxMap, MapRef } from 'react-map-gl';
import { AnimatePresence, motion } from 'motion/react';

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
    const howToUsePage = pages.find((p) => p.slug === 'how-to-use-this-site')!;
    onInfoClick(howToUsePage.slug);
    setIsAddingLocation(false);
  };

  return (
    <>
      {/* Mobile Header - Always visible */}
      <div className='fixed top-0 left-0 right-0 z-40 md:hidden'>
        <PanelLeftHeader
          isMenuOpen={isMenuOpen}
          onToggleMenu={onToggleMenu}
          onInfoClick={handleInfoClick}
          pages={pages}
        />
      </div>

      {/* Desktop Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen shadow-lg z-30 w-1/3 lg:w-1/5 transition-transform duration-300 hidden md:block ${
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

      {/* Mobile Bottom Sheet */}
      <motion.div
        className='md:hidden fixed bottom-0 left-0 right-0 bg-black rounded-t-3xl shadow-lg z-30'
        drag='y'
        dragConstraints={{ top: 0, bottom: 500 }}
        dragElastic={0.2}
        initial={{ y: '100%' }}
        animate={{ y: isOpen ? '80%' : '95%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        <div className='w-16 h-1 bg-lighterGray rounded-full mx-auto my-3' />
        <div className='h-[33vh]'>
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
        </div>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence mode='wait'>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '-100%' }}
            transition={{
              type: 'tween',
              duration: 0.3,
              ease: 'easeInOut',
            }}
            className='fixed top-0 left-0 w-full h-full z-30 md:hidden'
          >
            <PanelLeftMenu {...{ menu, pages, onInfoClick }} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PanelLeft;
