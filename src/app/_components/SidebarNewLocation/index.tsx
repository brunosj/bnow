import React, { useState } from 'react';
import SoundbiteUploadForm from '../SoundbiteUploadForm';
import PanelRight from '../PanelRight';

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

  return (
    <PanelRight title='Add your Soundbite' onClose={onClose}>
      <div className='space-y-4'>
        <p className='text-sm text-gray-600 dark:text-gray-400'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor.
        </p>

        {isFormVisible ? (
          <SoundbiteUploadForm
            onClose={onClose}
            onSave={handleFormSave}
            lat={lat}
            lng={lng}
          />
        ) : (
          <p className='text-gray-900 dark:text-gray-100'>
            Location added successfully!
          </p>
        )}
      </div>
    </PanelRight>
  );
};

export default SidebarNewLocation;
