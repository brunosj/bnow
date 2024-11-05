// components/SidebarList.tsx
import React from 'react';
import SoundbiteCard from '../SoundbiteCard';
import type { Soundbite } from '../../../payload/payload-types';
import { IoChevronForward } from 'react-icons/io5';
import CategoryFilter from '../CategoryFilter';
import type { SoundbiteCategory } from '../../_utilities/soundbitesCategories';

interface SidebarListProps {
  soundbites: Soundbite[];
  onClose: () => void;
  onSelectSoundbite: (soundbite: Soundbite) => void;
  isOpen: boolean;
  onToggle: () => void;
  categories: SoundbiteCategory[]; // Change to SoundbiteCategory[]
  selectedCategories: SoundbiteCategory[]; // Change to SoundbiteCategory[]
  onSelectCategory: (categories: SoundbiteCategory[]) => void; // Update to accept SoundbiteCategory[]
}

const SidebarList: React.FC<SidebarListProps> = ({
  soundbites,
  onClose,
  onSelectSoundbite,
  isOpen,
  onToggle,
  categories,
  selectedCategories, // Change to selectedCategories
  onSelectCategory,
}) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full shadow-lg z-30 transition-transform duration-300 w-1/4 ${isOpen ? 'translate-x-0' : '-translate-x-[95%]'} bg-black`}
    >
      <div className='flex flex-col h-full p-6 space-y-6'>
        <p className='font-semibold'>Categories</p>

        <CategoryFilter
          categories={categories}
          selectedCategories={selectedCategories}
          onSelectCategory={onSelectCategory}
        />
        <p className='font-semibold'>Soundbites</p>
        <ul className='overflow-y-auto overflow-x-hidden '>
          {soundbites.map((soundbite) => (
            <li key={soundbite.id} className='mb-4'>
              <SoundbiteCard
                soundbite={soundbite}
                onClick={() => onSelectSoundbite(soundbite)}
              />
            </li>
          ))}
        </ul>
        <button
          onClick={onToggle}
          className='absolute right-[-20px] top-1/2 transform -translate-y-1/2 bg-black rounded-full p-2 shadow-md flex items-center justify-center'
          style={{ top: '50%', transform: 'translateY(-50%)', right: '-10px' }}
        >
          <IoChevronForward
            className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </div>
    </div>
  );
};

export default SidebarList;
