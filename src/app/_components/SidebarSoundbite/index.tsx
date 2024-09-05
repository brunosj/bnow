import React from 'react';
import type { Soundbite } from '../../../payload/payload-types';
import classes from './index.module.css';

interface SidebarSoundbiteProps {
  soundbite: Soundbite;
  onClose: () => void;
}

const SidebarSoundbite = ({ soundbite, onClose }: SidebarSoundbiteProps) => (
  <div className={`${classes.sidebar} ${classes.newLocationSidebar}`}>
    {' '}
    <button onClick={onClose} className={classes.closeBtn}>
      Close
    </button>
    <h3>Soundbite Information</h3>
    <p>
      <strong>Title:</strong> {soundbite.title}
    </p>
    <p>
      <strong>Latitude:</strong> {soundbite.coordinates?.latitude}
    </p>
    <p>
      <strong>Longitude:</strong> {soundbite.coordinates?.longitude}
    </p>
  </div>
);

export default SidebarSoundbite;
