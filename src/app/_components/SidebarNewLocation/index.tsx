import React, { useState } from 'react';
import classes from './index.module.css';

interface SidebarNewLocationProps {
  onClose: () => void;
  onSave: (newLocation: {
    latitude: number;
    longitude: number;
    title: string;
  }) => void;
  lat: number;
  lng: number;
}

const SidebarNewLocation = ({
  onClose,
  onSave,
  lat,
  lng,
}: SidebarNewLocationProps) => {
  const [title, setTitle] = useState('');

  const handleSave = () => {
    onSave({ latitude: lat, longitude: lng, title });
    onClose();
  };

  return (
    <div className={classes.sidebar}>
      <button onClick={onClose} className={classes.closeBtn}>
        Close
      </button>
      <h3>Add New Location</h3>
      <label>
        Title:
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default SidebarNewLocation;
