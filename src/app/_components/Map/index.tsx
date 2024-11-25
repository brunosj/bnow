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
import { AnimatePresence } from 'motion/react';

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

  // Initialize selectedCategories with no categories
  const [selectedCategories, setSelectedCategories] = useState<
    SoundbiteCategory[]
  >([]);

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
  const [rightPanelOpen, setRightPanelOpen] = useState(false);

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
    setRightPanelOpen(false);
  }, []);

  // Adds a new location when clicking on the map
  const addLocation = (e: { lngLat: { lat: number; lng: number } }) => {
    const { lat, lng } = e.lngLat;

    if (newLocation) return;

    if (isWithinBirmingham(lat, lng)) {
      setNewLocation({ latitude: lat, longitude: lng });
      setRightPanelType('newLocation');
      setRightPanelOpen(true);
    } else {
      alert('Location is outside the boundaries of Birmingham.');
    }
  };

  // Handles the click event on a soundbite marker
  const handleMarkerClick = (soundbite: Soundbite) => {
    setSelectedMarker(soundbite);
    setRightPanelType('soundbite');
    setRightPanelOpen(true);
  };

  // Handles soundbite selection from the list sidebar
  const handleSoundbiteSelect = (soundbite: Soundbite) => {
    setSelectedMarker(soundbite);
    setRightPanelType('soundbite');
    setRightPanelOpen(true);
  };

  // Handles the drag end event for the new location marker
  const handleLocationDragEnd = useCallback(
    (lat: number, lng: number) => {
      if (isWithinBirmingham(lat, lng)) {
        const newCoords = { latitude: lat, longitude: lng };
        setNewLocation(newCoords);
        if (rightPanelType === 'newLocation') {
          setNewLocation(newCoords);
        }
      } else {
        alert('Location is outside the boundaries of Birmingham.');
        if (initialLocation) {
          setNewLocation(initialLocation);
        }
      }
    },
    [rightPanelType, initialLocation]
  );

  // For the latitude and longitude info box
  const handleCenterChange = useCallback((lat: number, lng: number) => {
    setCenter({ lat, lng });
  }, []);

  const [selectedPage, setSelectedPage] = useState<Page | undefined>();

  // Update the info click handler
  const handleInfoClick = (slug: string) => {
    setRightPanelType('info');
    setIsAddingLocation(false);
    setSelectedPage(pages.find((p) => p.slug === slug));
    setRightPanelOpen(true);
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

  // Add this new handler
  const handleLocationDrag = useCallback((lat: number, lng: number) => {
    if (isWithinBirmingham(lat, lng)) {
      const newCoords = { latitude: lat, longitude: lng };
      setNewLocation(newCoords);
    }
  }, []);

  return (
    <div className='h-[100vh] flex z-100 max-w-full relative'>
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
        onLocationDrag={handleLocationDrag}
        onLocationDragEnd={handleLocationDragEnd}
        onInfoClick={() => handleInfoClick('how-to-use-the-site')}
        isLeftPanelOpen={isLeftPanelOpen}
        isAddingLocation={isAddingLocation}
        setIsAddingLocation={setIsAddingLocation}
        onVisibleSoundbitesChange={handleVisibleSoundbitesChange}
        ref={mapRef}
        selectedSoundbiteId={selectedMarker?.id}
      />

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
        selectedSoundbiteId={selectedMarker?.id}
      />

      {/* Right Panel Content */}
      <AnimatePresence mode='wait'>
        {rightPanelOpen && (
          <>
            {rightPanelType === 'soundbite' && selectedMarker && (
              <SidebarSoundbite
                soundbite={selectedMarker}
                onClose={closeRightPanel}
                setIsAddingLocation={setIsAddingLocation}
                isOpen={true}
              />
            )}
            {rightPanelType === 'newLocation' && newLocation && (
              <SidebarNewLocation
                lat={newLocation.latitude}
                lng={newLocation.longitude}
                onClose={closeRightPanel}
                onSave={(newSoundbite) => {
                  console.log('New soundbite created:', newSoundbite);
                }}
                setIsAddingLocation={setIsAddingLocation}
                isOpen={true}
              />
            )}
            {rightPanelType === 'info' && (
              <SidebarInfo
                onClose={closeRightPanel}
                page={selectedPage}
                setIsAddingLocation={setIsAddingLocation}
                isOpen={true}
              />
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MapView;
