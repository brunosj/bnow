import React from 'react';
import classes from './index.module.css';
import type { Soundbite } from '../../../payload/payload-types';

interface SidebarProps {
  soundbites: Soundbite[];
  locs: { latitude: number; longitude: number }[];
}

const SidebarList = ({ soundbites, locs }: SidebarProps) => (
  <div className={classes.sideBar}>
    <h3 className={classes.sideBarHeading}>Location list</h3>
    {soundbites.length === 0 ? (
      <p>No locations to display</p>
    ) : (
      soundbites.map((soundbite, index) => (
        <div className={classes.listItem} key={index}>
          <label className={classes.popupLabel}>Title: </label>
          <span>{soundbite.title}</span>
          <br />
          <label className={classes.popupLabel}>Latitude: </label>
          <span>{soundbite.coordinates?.latitude}</span>
          <br />
          <label className={classes.popupLabel}>Longitude: </label>
          <span>{soundbite.coordinates?.longitude}</span>
        </div>
      ))
    )}
    {locs.map((loc, i) => (
      <div className={classes.listItem} key={i}>
        <label className={classes.popupLabel}>Latitude: </label>
        <span>{loc.latitude}</span>
        <br />
        <label className={classes.popupLabel}>Longitude: </label>
        <span>{loc.longitude}</span>
      </div>
    ))}
  </div>
);

export default SidebarList;
