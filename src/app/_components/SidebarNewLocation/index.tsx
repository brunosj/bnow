import React, { useState } from 'react';
import classes from './index.module.css';
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
    setFormVisible(false);
    onClose();
  };

  return (
    <div className={classes.sidebar}>
      <button onClick={onClose} className={classes.closeBtn}>
        Close
      </button>
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
