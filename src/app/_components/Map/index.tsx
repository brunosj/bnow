'use client';

import { useState } from 'react';
import MapComponent from '../MapComponent';
import SidebarList from '../SidebarList';
import SidebarSoundbite from '../SidebarSoundbite';
import SidebarNewLocation from '../SidebarNewLocation';
import type { Soundbite } from '../../../payload/payload-types';
import classes from './index.module.css';

interface MapViewProps {
  soundbites: Soundbite[];
}

const MapView = ({ soundbites }: MapViewProps) => {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;
  const [locs, setLocs] = useState<{ latitude: number; longitude: number }[]>(
    []
  );
  const [selectedMarker, setSelectedMarker] = useState<Soundbite | null>(null);
  const [newLocation, setNewLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [sidebarVisible, setSidebarVisible] = useState<
    'soundbite' | 'newLocation' | null
  >(null);

  // Adds a new location when clicking on the map
  const addLocation = (e: { lngLat: { lat: number; lng: number } }) => {
    if (locs.length < 3) {
      setNewLocation({ latitude: e.lngLat.lat, longitude: e.lngLat.lng });
      setSidebarVisible('newLocation');
    } else {
      alert('No more than three locations');
    }
  };

  // Removes a selected location from the locs state
  const removeLocation = (index: number) => {
    setLocs(locs.filter((_, i) => i !== index));
    setSelectedMarker(null);
  };

  // Handles the click event on a soundbite marker
  const handleMarkerClick = (soundbite: Soundbite) => {
    setSelectedMarker(soundbite);
    setSidebarVisible('soundbite');
  };

  // Closes any sidebar that is currently open
  const handleCloseSidebar = () => {
    setSidebarVisible(null);
    setSelectedMarker(null);
    setNewLocation(null);
  };

  // Saves a new location to the locs state
  const handleSaveNewLocation = (newLocation: {
    latitude: number;
    longitude: number;
    title: string;
  }) => {
    const updatedLocs = [
      ...locs,
      { latitude: newLocation.latitude, longitude: newLocation.longitude },
    ];
    setLocs(updatedLocs);
    setNewLocation(null);
    console.log('Updated Locations:', updatedLocs); // Log updated locs state to verify changes
  };

  return (
    <div className={classes.mainStyle}>
      {/* Sidebar displaying the list of soundbites and user-added locations */}
      <SidebarList soundbites={soundbites} locs={locs} />

      {/* Map component handling map rendering, markers, and popups */}
      <MapComponent
        mapboxToken={mapboxToken}
        soundbites={soundbites}
        locs={locs}
        selectedMarker={selectedMarker}
        newLocation={newLocation}
        onAddLocation={addLocation}
        onMarkerClick={handleMarkerClick}
        onMarkerSelect={(loc, index) => setSelectedMarker({ loc, index })}
        onPopupClose={() => setSelectedMarker(null)}
        onRemoveLocation={removeLocation}
      />

      {/* Sidebar for soundbite details */}
      {sidebarVisible === 'soundbite' && selectedMarker && (
        <SidebarSoundbite
          soundbite={selectedMarker}
          onClose={handleCloseSidebar}
        />
      )}

      {/* Sidebar for adding a new location */}
      {sidebarVisible === 'newLocation' && newLocation && (
        <SidebarNewLocation
          lat={newLocation.latitude}
          lng={newLocation.longitude}
          onClose={handleCloseSidebar}
          onSave={handleSaveNewLocation}
        />
      )}
    </div>
  );
};

export default MapView;
