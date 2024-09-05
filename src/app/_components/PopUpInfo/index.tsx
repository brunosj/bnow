import React from 'react';
import classes from './index.module.css';

interface PopupInfoProps {
  longitude: number;
  latitude: number;
  onRemoveLocation: () => void;
}

const PopupInfo = ({
  longitude,
  latitude,
  onRemoveLocation,
}: PopupInfoProps) => (
  <div className={classes.popupInfo}>
    <label className={classes.popupLabel}>Longitude: </label>
    <span>{longitude}</span>
    <br />
    <label className={classes.popupLabel}>Latitude: </label>
    <span>{latitude}</span>
    <div className={classes.deleteBtnContainer}>
      <button
        className={classes.deleteBtn}
        type='button'
        onClick={onRemoveLocation}
      >
        Delete Location
      </button>
    </div>
  </div>
);

export default PopupInfo;
