'use client';

import type { Soundbite } from '../../../payload/payload-types';

import { useState, useCallback } from 'react';
import MapComponent from '../MapComponent';
import SidebarList from '../SidebarList';
import SidebarSoundbite from '../SidebarSoundbite';
import SidebarNewLocation from '../SidebarNewLocation';
import CategoryFilter from '../CategoryFilter';
import type { SoundbiteCategory } from '../../_utilities/soundbitesCategories';
import Header from '../Header';

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
  const [visibleSidebars, setVisibleSidebars] = useState<
    Set<'soundbite' | 'newLocation' | 'list'>
  >(new Set());
  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 52.489471,
    lng: -1.898575,
  });
  const [selectedCategory, setSelectedCategory] = useState<
    SoundbiteCategory | 'blank' | null
  >(null);

  // Adds a new location when clicking on the map
  const addLocation = (e: { lngLat: { lat: number; lng: number } }) => {
    if (newLocation) return; // Prevent adding multiple new locations
    setNewLocation({ latitude: e.lngLat.lat, longitude: e.lngLat.lng });
    setVisibleSidebars(new Set(visibleSidebars).add('newLocation'));
    console.log('New Location:', e.lngLat);
  };

  // Handles the click event on a soundbite marker
  const handleMarkerClick = (soundbite: Soundbite) => {
    setSelectedMarker(soundbite);
    setVisibleSidebars(new Set(visibleSidebars).add('soundbite'));
  };

  // Closes the specified sidebar
  const handleCloseSidebar = (
    sidebar: 'soundbite' | 'newLocation' | 'list'
  ) => {
    const updatedSidebars = new Set(visibleSidebars);
    updatedSidebars.delete(sidebar);
    setVisibleSidebars(updatedSidebars);

    // Optionally reset other states if needed
    if (sidebar === 'soundbite') {
      setSelectedMarker(null);
    } else if (sidebar === 'newLocation') {
      setNewLocation(null);
    }
  };

  // Handles soundbite selection from the list sidebar
  const handleSoundbiteSelect = (soundbite: Soundbite) => {
    setSelectedMarker(soundbite);
    setVisibleSidebars(new Set(visibleSidebars).add('soundbite'));
  };

  // Handles the drag end event for the new location marker
  const handleLocationDragEnd = (lat: number, lng: number) => {
    if (newLocation) {
      setNewLocation({ latitude: lat, longitude: lng });
    }
  };

  // For the latitude and longitude info box
  const handleCenterChange = useCallback((lat: number, lng: number) => {
    setCenter({ lat, lng });
  }, []);

  const filteredSoundbites = soundbites.filter(
    (soundbite) =>
      soundbite.status === 'published' &&
      (selectedCategory === null || soundbite.category === selectedCategory)
  );

  const publishedSoundbites = soundbites.filter(
    (soundbite) => soundbite.status === 'published'
  );

  const categories = [...new Set(soundbites.map((s) => s.category))];

  return (
    <div className='h-[100vh] flex z-100 max-w-full relative'>
      {/* Conditionally render the Header based on visibleSidebars */}
      <Header />

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Button to toggle the soundbite list sidebar */}
      <button
        className='absolute top-2 left-4 btn btn-primary  z-20 '
        onClick={() => setVisibleSidebars(new Set(visibleSidebars).add('list'))}
      >
        Soundbites List
      </button>

      {/* Map component handling map rendering, markers, and popups */}
      <MapComponent
        mapboxToken={mapboxToken}
        soundbites={filteredSoundbites}
        locs={[]}
        selectedMarker={selectedMarker}
        newLocation={newLocation}
        onAddLocation={addLocation}
        onMarkerClick={handleMarkerClick}
        //@ts-ignore
        onMarkerSelect={(loc, index) => setSelectedMarker({ loc, index })}
        onPopupClose={() => setSelectedMarker(null)}
        onCenterChange={handleCenterChange}
        onLocationDragEnd={handleLocationDragEnd}
      />

      {/* Latitude and Longitude info box */}
      <div className='absolute bottom-8 left-4 text-primary p-2 shadow-lg rounded-md z-10 bg-neutral bg-opacity-95'>
        {/* <p className='text-sm font-semibold'>Center:</p> */}
        <p className='text-xs font-mono'>
          Latitude: {center.lat.toFixed(6)}
          <br />
          Longitude: {center.lng.toFixed(6)}
        </p>
      </div>

      {/* Sidebar displaying the list of soundbites */}
      {visibleSidebars.has('list') && (
        <SidebarList
          soundbites={publishedSoundbites}
          onClose={() => handleCloseSidebar('list')}
          onSelectSoundbite={handleSoundbiteSelect}
        />
      )}

      {/* Sidebar for soundbite details */}
      {visibleSidebars.has('soundbite') && selectedMarker && (
        <SidebarSoundbite
          soundbite={selectedMarker}
          onClose={() => handleCloseSidebar('soundbite')}
        />
      )}

      {/* Sidebar for adding a new location */}
      {visibleSidebars.has('newLocation') && newLocation && (
        <SidebarNewLocation
          lat={newLocation.latitude}
          lng={newLocation.longitude}
          onClose={() => handleCloseSidebar('newLocation')}
          onSave={() => {}}
        />
      )}
    </div>
  );
};

export default MapView;
