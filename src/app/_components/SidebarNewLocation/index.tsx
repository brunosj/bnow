import React, { useState } from 'react';
import SoundbiteUploadForm from '../SoundbiteUploadForm';

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
    <div className='bg-black fixed top-0 right-0 w-1/4 h-full overflow-y-auto z-50'>
      <div className='p-6 space-y-3'>
        <div className='flex justify-between items-center mb-4'>
          <button className='ml-auto' onClick={onClose}>
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
        <h3>Add your Soundbite</h3>
        <p className='text-xs'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor.
        </p>
        {/* <h3>Add New Location</h3> */}
        {isFormVisible ? (
          <SoundbiteUploadForm
            onClose={onClose}
            onSave={handleFormSave}
            lat={lat}
            lng={lng}
          />
        ) : (
          <p>Location added successfully!</p>
        )}
      </div>
    </div>
  );
};

export default SidebarNewLocation;
