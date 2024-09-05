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
    if (newLocation) return; // Prevent adding multiple new locations
    setNewLocation({ latitude: e.lngLat.lat, longitude: e.lngLat.lng });
    setSidebarVisible('newLocation');
    console.log('New Location:', e.lngLat);
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

  // No need for this function anymore if we're not saving new locations
  // const handleSaveNewLocation = (newLocation: {
  //   latitude: number;
  //   longitude: number;
  //   title: string;
  // }) => {
  //   const updatedLocs = [
  //     ...locs,
  //     { latitude: newLocation.latitude, longitude: newLocation.longitude },
  //   ];
  //   setLocs(updatedLocs);
  //   setNewLocation(null);
  //   console.log('Updated Locations:', updatedLocs);
  // };

  const publishedSoundbites = soundbites.filter(
    (soundbite) => soundbite.status === 'published'
  );

  return (
    <div className={classes.mainStyle}>
      {/* Sidebar displaying the list of soundbites */}
      <SidebarList soundbites={publishedSoundbites} locs={[]} />

      {/* Map component handling map rendering, markers, and popups */}
      <MapComponent
        mapboxToken={mapboxToken}
        soundbites={publishedSoundbites}
        locs={[]} // No need to pass locs since we aren't using them
        selectedMarker={selectedMarker}
        newLocation={newLocation}
        onAddLocation={addLocation}
        onMarkerClick={handleMarkerClick}
        onMarkerSelect={(loc, index) => setSelectedMarker({ loc, index })}
        onPopupClose={() => setSelectedMarker(null)}
        // No need to pass onRemoveLocation if we aren't managing locs
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
          onSave={(newSoundbite) => {
            // Handle new soundbite form submission
            // Possibly notify or refresh the map if needed
          }}
        />
      )}
    </div>
  );
};

export default MapView;
