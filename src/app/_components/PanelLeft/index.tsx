import type { Soundbite, Page, Menu } from '../../../payload/payload-types';
import type { SoundbiteCategory } from '../../_utilities/soundbitesCategories';

import React, { useRef, useState } from 'react';
import PanelLeftHeader from './Header';
import ToggleButton from './ToggleButton';
import PanelLeftMenu from './Menu';
import PanelLeftSoundbites from './Soundbites';
import type { Map as MapboxMap, MapRef } from 'react-map-gl';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useMotionValueEvent,
} from 'motion/react';

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

  const handleCloseMenu = () => {
    onToggleMenu();
  };

  //

  /* Dragging functionality for mobile */

  const x = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);

  // Calculate opacity based on drag position (right to left)
  const opacity = useTransform(x, [-window.innerWidth * 0.6, 0], [0, 1]);

  const handleDragEnd = () => {
    setIsDragging(false);
    const currentX = x.get();
    if (currentX < -window.innerWidth * 0.3) {
      handleCloseMenu();
    } else {
      x.set(0);
    }
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
        className={`fixed top-0 left-0 h-[100dvh]  shadow-lg z-30 w-1/3 lg:w-1/5 transition-transform duration-300 hidden md:block ${
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
            <PanelLeftMenu
              {...{ menu, pages, onInfoClick, onCloseMenu: handleCloseMenu }}
            />
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
        className='md:hidden fixed bottom-0 left-0 right-0 bg-black rounded-t-3xl shadow-lg z-20 h-[60dvh]'
        drag='y'
        dragConstraints={{ top: 150, bottom: 360 }}
        dragElastic={0.2}
        initial={{ y: '35%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        <div className='w-16 h-1 bg-lighterGray rounded-full mx-auto my-3' />
        <div className=''>
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
            drag='x'
            dragDirectionLock
            dragElastic={0.2}
            dragConstraints={{ left: -window.innerWidth, right: 0 }}
            dragMomentum={false}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            style={{ x }}
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className='fixed top-0 left-0 w-full h-[100dvh] z-30 md:hidden'
          >
            <PanelLeftMenu
              {...{ menu, pages, onInfoClick, onCloseMenu: handleCloseMenu }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PanelLeft;
