import React, { useState } from 'react';
import NewLocationForm from '../SoundbiteUpload';

interface SidebarNewLocationProps {
  onClose: () => void;
  onSave: (newSoundbite: any) => void;
  lat: number;
  lng: number;
}

const SidebarNewLocation = ({
  onClose,
  onSave,
  lat,
  lng,
}: SidebarNewLocationProps) => {
  const [isFormVisible, setFormVisible] = useState(true);

  const handleFormSave = (newSoundbite: any) => {
    onSave(newSoundbite);
    // setFormVisible(false);
    // onClose();
  };

  // console.log('lat:', lat, 'lng:', lng);

  return (
    <div className='bg-neutral fixed top-0 right-0 w-[500px] h-full shadow-lg p-8 overflow-y-auto z-50 bg-opacity-95'>
      <div className='flex justify-between items-center mb-4'>
        <h3 className='text-xl font-semibold text-gray-800'>
          Add New Soundbite
        </h3>
        <button
          className='ml-auto btn btn-circle btn-outline'
          onClick={onClose}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
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
      {/* <h3>Add New Location</h3> */}
      {isFormVisible ? (
        <NewLocationForm
          onClose={onClose}
          onSave={handleFormSave}
          lat={lat}
          lng={lng}
        />
      ) : (
        <p>Location added successfully!</p>
      )}
    </div>
  );
};

export default SidebarNewLocation;
