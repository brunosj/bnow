import React from 'react';
import type { Soundbite } from '../../../payload/payload-types';
import SoundbiteAudioPlayer from '../SoundbiteAudioPlayer';

interface SidebarSoundbiteProps {
  soundbite: Soundbite;
  onClose: () => void;
}

const SidebarSoundbite = ({ soundbite, onClose }: SidebarSoundbiteProps) => (
  <div className='bg-neutral fixed top-0 right-0 w-[500px] bg-opacity-95 h-full shadow-lg p-8 overflow-y-auto z-50 '>
    <div className='flex justify-between items-center mb-4 '>
      <h3 className='text-xl font-semibold text-gray-800'>
        Soundbite Information
      </h3>
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

    <section className='space-y-3 mb-6'>
      <div className='flex items-center'>
        <strong className='w-24 text-gray-700'>Title:</strong>
        <span className='text-gray-900'>{soundbite.title}</span>
      </div>
      <div className='flex items-center'>
        <strong className='w-24 text-gray-700'>Latitude:</strong>
        <span className='text-gray-900'>{soundbite.coordinates?.latitude}</span>
      </div>
      <div className='flex items-center'>
        <strong className='w-24 text-gray-700'>Longitude:</strong>
        <span className='text-gray-900'>
          {soundbite.coordinates?.longitude}
        </span>
      </div>
    </section>

    <section>
      <SoundbiteAudioPlayer audioGroup={soundbite.audioGroup} />
    </section>
  </div>
);

export default SidebarSoundbite;
