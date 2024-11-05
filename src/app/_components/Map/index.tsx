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
import { isWithinBirmingham } from '../../_utilities/isWithinBirmingham';

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
  const [initialLocation, setInitialLocation] = useState<{
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
  const [selectedCategories, setSelectedCategories] = useState<
    SoundbiteCategory[]
  >([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // New state for sidebar open/close

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Adds a new location when clicking on the map
  const addLocation = (e: { lngLat: { lat: number; lng: number } }) => {
    const { lat, lng } = e.lngLat;

    if (newLocation) return; // Prevent adding multiple new locations

    if (isWithinBirmingham(lat, lng)) {
      setNewLocation({ latitude: lat, longitude: lng });
      setVisibleSidebars(new Set(visibleSidebars).add('newLocation'));
      // console.log('New Location:', e.lngLat);
    } else {
      alert('Location is outside the boundaries of Birmingham.');
    }
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
      if (isWithinBirmingham(lat, lng)) {
        setNewLocation({ latitude: lat, longitude: lng });
        setInitialLocation({ latitude: lat, longitude: lng }); // Update initial location
      } else {
        alert('Location is outside the boundaries of Birmingham.');
        if (initialLocation) {
          setNewLocation(initialLocation); // Reset to initial location
        }
      }
    }
  };
  // For the latitude and longitude info box
  const handleCenterChange = useCallback((lat: number, lng: number) => {
    setCenter({ lat, lng });
  }, []);

  const filteredSoundbites = soundbites.filter((soundbite) => {
    return (
      soundbite.status === 'published' &&
      (selectedCategories.length === 0 ||
        !selectedCategories.includes(soundbite.category))
    );
  });

  const categories: SoundbiteCategory[] = [
    ...new Set(soundbites.map((s) => s.category)),
  ];

  console.log(selectedCategories);
  return (
    <div className='h-[100vh] flex z-100 max-w-full relative'>
      {/* <Header /> */}

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
      {/* <div className='absolute bottom-8 left-4 text-primary p-2 shadow-lg rounded-md z-10 bg-neutral bg-opacity-95'>
        <p className='text-xs font-mono'>
          Latitude: {center.lat.toFixed(6)}
          <br />
          Longitude: {center.lng.toFixed(6)}
        </p>
      </div> */}

      {/* Sidebar displaying the list of soundbites */}
      <SidebarList
        soundbites={filteredSoundbites}
        onClose={() => handleCloseSidebar('list')}
        onSelectSoundbite={handleSoundbiteSelect}
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
        categories={categories}
        selectedCategories={selectedCategories}
        onSelectCategory={setSelectedCategories}
      />

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
