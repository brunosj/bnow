import React from 'react';
import classes from './index.module.css';

interface PopupInfoProps {
  longitude: number;
  latitude: number;
}

const PopupInfo = ({ longitude, latitude }: PopupInfoProps) => (
  <div className={classes.popupInfo}>
    <label className={classes.popupLabel}>Longitude: </label>
    <span>{longitude}</span>
    <br />
    <label className={classes.popupLabel}>Latitude: </label>
    <span>{latitude}</span>
  </div>
);

export default PopupInfo;
