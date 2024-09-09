// components/SidebarList.tsx
import React from 'react';
import SoundbiteCard from '../SoundbiteCard'; // Adjust the import path as necessary
import type { Soundbite } from '../../../payload/payload-types';

interface SidebarListProps {
  soundbites: Soundbite[];
  onClose: () => void;
  onSelectSoundbite: (soundbite: Soundbite) => void;
}

const SidebarList: React.FC<SidebarListProps> = ({
  soundbites,
  onClose,
  onSelectSoundbite,
}) => {
  return (
    <div className='bg-neutral fixed top-0 left-0 w-[500px] h-full shadow-lg p-5 overflow-y-auto z-30 bg-opacity-95'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-lg font-semibold'>Published Soundbites</h2>
        <button className='btn btn-circle btn-outline' onClick={onClose}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 text-gray-600'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
      </div>
      <ul>
        {soundbites.map((soundbite) => (
          <li key={soundbite.id} className='mb-4'>
            <SoundbiteCard
              soundbite={soundbite}
              onClick={() => onSelectSoundbite(soundbite)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarList;
