'use client';

import type { Soundbite, Page, Menu } from '../../../payload/payload-types';

import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import MapComponent from '../MapComponent';
import PanelLeft from '../PanelLeft';
import SidebarSoundbite from '../SidebarSoundbite';
import SidebarNewLocation from '../SidebarNewLocation';
import CategoryFilter from '../CategoryFilter';
import type { SoundbiteCategory } from '../../_utilities/soundbitesCategories';
import Header from '../Header';
import { isWithinBirmingham } from '../../_utilities/isWithinBirmingham';
import SidebarInfo from '../SidebarInfo';
import { MapRef } from 'react-map-gl';

interface MapViewProps {
  soundbites: Soundbite[];
  pages: Page[];
  menu: Menu;
}

type RightSidebarType = 'soundbite' | 'newLocation' | 'info' | null;

const MapView = ({ soundbites, pages, menu }: MapViewProps) => {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

  // Markers functionality
  const [selectedMarker, setSelectedMarker] = useState<Soundbite | null>(null);
  const [newLocation, setNewLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [initialLocation, setInitialLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 52.489471,
    lng: -1.898575,
  });

  // Categories for filtering
  const categories: SoundbiteCategory[] = [
    ...new Set(soundbites.map((s) => s.category)),
  ];

  const categoryCount = useMemo(() => {
    const counts = new Map<SoundbiteCategory, number>();
    soundbites.forEach((s) => {
      counts.set(s.category, (counts.get(s.category) || 0) + 1);
    });
    return counts;
  }, [soundbites]);

  // Initialize selectedCategories with the least frequent category
  const [selectedCategories, setSelectedCategories] = useState<
    SoundbiteCategory[]
  >(() => {
    let minCategory = categories[0];
    let minCount = Infinity;
    categoryCount.forEach((count, category) => {
      if (count < minCount) {
        minCount = count;
        minCategory = category;
      }
    });
    return [minCategory];
  });

  // Filtered soundbites based on status and selected categories
  const filteredSoundbites = soundbites.filter((soundbite) => {
    return (
      soundbite.status === 'published' &&
      (selectedCategories.length === 0 ||
        !selectedCategories.includes(soundbite.category))
    );
  });

  // Panels functionality
  const [rightPanelType, setRightPanelType] = useState<RightSidebarType>(null);
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAddingLocation, setIsAddingLocation] = useState(false);

  // Toggles the left sidebar
  const toggleSidebar = () => {
    setIsLeftPanelOpen(!isLeftPanelOpen);
  };

  // Closes the right sidebar
  const closeRightPanel = useCallback(() => {
    setRightPanelType(null);
    setSelectedMarker(null);
    setNewLocation(null);
    setIsAddingLocation(false);
  }, []);

  // Adds a new location when clicking on the map
  const addLocation = (e: { lngLat: { lat: number; lng: number } }) => {
    const { lat, lng } = e.lngLat;

    if (newLocation) return;

    if (isWithinBirmingham(lat, lng)) {
      setNewLocation({ latitude: lat, longitude: lng });
      setRightPanelType('newLocation');
    } else {
      alert('Location is outside the boundaries of Birmingham.');
    }
  };

  // Handles the click event on a soundbite marker
  const handleMarkerClick = (soundbite: Soundbite) => {
    setSelectedMarker(soundbite);
    setRightPanelType('soundbite');
  };

  // Handles soundbite selection from the list sidebar
  const handleSoundbiteSelect = (soundbite: Soundbite) => {
    setSelectedMarker(soundbite);
    setRightPanelType('soundbite');
  };

  // Handles the drag end event for the new location marker
  const handleLocationDragEnd = (lat: number, lng: number) => {
    if (newLocation) {
      if (isWithinBirmingham(lat, lng)) {
        setNewLocation({ latitude: lat, longitude: lng });
        setInitialLocation({ latitude: lat, longitude: lng });
      } else {
        alert('Location is outside the boundaries of Birmingham.');
        if (initialLocation) {
          setNewLocation(initialLocation);
        }
      }
    }
  };

  // For the latitude and longitude info box
  const handleCenterChange = useCallback((lat: number, lng: number) => {
    setCenter({ lat, lng });
  }, []);

  const [selectedPage, setSelectedPage] = useState<Page | undefined>();

  // Update the info click handler
  const handleInfoClick = (slug: string) => {
    if (rightPanelType === 'info') {
      setRightPanelType(null);
    } else {
      setRightPanelType('info');
      setIsAddingLocation(false);
      setSelectedPage(pages.find((p) => p.slug === slug));
    }
  };

  // Visible soundbites based on viewport
  const [visibleSoundbites, setVisibleSoundbites] =
    useState<Soundbite[]>(filteredSoundbites);

  const handleVisibleSoundbitesChange = useCallback(
    (soundbites: Soundbite[]) => {
      setVisibleSoundbites(soundbites);
    },
    []
  );

  useEffect(() => {
    setVisibleSoundbites(filteredSoundbites);
  }, [selectedCategories]);

  // Map ref for mapbox
  const mapRef = useRef<MapRef>(null);

  return (
    <div className='h-[100vh] flex z-100 max-w-full relative'>
      {/* <Header /> */}

      {/* Map component handling map rendering, markers, and popups */}
      <MapComponent
        mapboxToken={mapboxToken}
        soundbites={filteredSoundbites}
        selectedMarker={selectedMarker}
        newLocation={newLocation}
        onAddLocation={addLocation}
        onMarkerClick={handleMarkerClick}
        //@ts-ignore
        onMarkerSelect={(loc, index) => setSelectedMarker({ loc, index })}
        onPopupClose={() => setSelectedMarker(null)}
        onCenterChange={handleCenterChange}
        onLocationDragEnd={handleLocationDragEnd}
        onInfoClick={() => handleInfoClick('how-to-use-the-site')}
        isLeftPanelOpen={isLeftPanelOpen}
        isAddingLocation={isAddingLocation}
        setIsAddingLocation={setIsAddingLocation}
        onVisibleSoundbitesChange={handleVisibleSoundbitesChange}
        ref={mapRef}
        selectedSoundbiteId={selectedMarker?.id}
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
      <PanelLeft
        soundbites={visibleSoundbites}
        onClose={() => setIsLeftPanelOpen(false)}
        onSelectSoundbite={handleSoundbiteSelect}
        isOpen={isLeftPanelOpen}
        onToggle={toggleSidebar}
        categories={categories}
        selectedCategories={selectedCategories}
        onSelectCategory={setSelectedCategories}
        onInfoClick={handleInfoClick}
        pages={pages}
        menu={menu}
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen(!isMenuOpen)}
        setIsAddingLocation={setIsAddingLocation}
        mapRef={mapRef}
        selectedSoundbiteId={selectedMarker?.id} // Add this prop
      />

      {/* Sidebar for soundbite details */}
      {rightPanelType === 'soundbite' && selectedMarker && (
        <SidebarSoundbite
          soundbite={selectedMarker}
          onClose={closeRightPanel}
          setIsAddingLocation={setIsAddingLocation}
        />
      )}

      {/* Sidebar for adding a new location */}
      {rightPanelType === 'newLocation' && newLocation && (
        <SidebarNewLocation
          lat={newLocation.latitude}
          lng={newLocation.longitude}
          onClose={closeRightPanel}
          onSave={() => {}}
          setIsAddingLocation={setIsAddingLocation}
        />
      )}

      {/* Sidebar for info page */}
      {rightPanelType === 'info' && (
        <SidebarInfo
          onClose={closeRightPanel}
          page={selectedPage}
          setIsAddingLocation={setIsAddingLocation}
        />
      )}
    </div>
  );
};

export default MapView;
