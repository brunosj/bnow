'use client';

import type { Soundbite, Page, Menu } from '../../../payload/payload-types';

import { useState, useCallback, useEffect, useRef } from 'react';
import MapComponent from '../MapComponent';
import PanelLeft from '../PanelLeft';
import SidebarSoundbite from '../SidebarSoundbite';
import SidebarNewLocation from '../SidebarNewLocation';
import type { SoundbiteCategory } from '../../_utilities/soundbitesCategories';
import { isWithinBirmingham } from '../../_utilities/isWithinBirmingham';
import SidebarInfo from '../SidebarInfo';
import { MapRef } from 'react-map-gl';
import { AnimatePresence } from 'motion/react';
import MobileLocationBottomSheet from '../MobileLocationBottomSheet';

interface MapViewProps {
  soundbites: Soundbite[];
  pages: Page[];
  menu: Menu;
}

type RightSidebarType = 'soundbite' | 'newLocation' | 'info' | null;

interface FormDataState {
  title: string;
  description: string;
  year: number | null;
  category: SoundbiteCategory | null;
  license: 'cc' | 'public_domain' | 'all_rights_reserved' | null;
  author: string;
  file: File | null;
  transcriptFile: File | null;
}

const MapView = ({
  soundbites: soundbitesProps,
  pages,
  menu,
}: MapViewProps) => {
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
    ...new Set(soundbitesProps.map((s) => s.category)),
  ];

  const [selectedCategories, setSelectedCategories] = useState<
    SoundbiteCategory[]
  >([]);

  // Filtered soundbites based on status and selected categories
  const filteredSoundbites = soundbitesProps.filter((soundbite) => {
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
  const [message, setMessage] = useState<string | null>(null);

  // Toggles the left sidebar
  const toggleSidebar = () => {
    setIsLeftPanelOpen(!isLeftPanelOpen);
  };

  // Closes the right sidebar
  const closeRightPanel = useCallback(() => {
    const isMobile = window.innerWidth < 768;
    const isLocationStep2 = rightPanelType === 'newLocation';

    setRightPanelType(null);
    setSelectedMarker(null);
    setRightPanelOpen(false);

    // Only clear location and disable adding if we're not on mobile step 2
    if (!(isMobile && isLocationStep2)) {
      setNewLocation(null);
      setIsAddingLocation(false);
    }
  }, [rightPanelType]);

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

  const handleInfoClick = (slug: string) => {
    setRightPanelType('info');
    setIsAddingLocation(false);
    setSelectedPage(pages.find((p) => p.slug === slug));
    setRightPanelOpen(true);
  };

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

  const mapRef = useRef<MapRef>(null);

  const handleLocationDrag = useCallback((lat: number, lng: number) => {
    if (isWithinBirmingham(lat, lng)) {
      const newCoords = { latitude: lat, longitude: lng };
      setNewLocation(newCoords);
    }
  }, []);

  const [showMobileBottomSheet, setShowMobileBottomSheet] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  const handleConfirmLocation = async () => {
    if (!formData || !newLocation) {
      throw new Error('Form data or location is missing.');
    }

    // console.log('Confirming location with formData:', formData);
    setIsSubmitting(true);

    try {
      const audioFormData = new FormData();
      audioFormData.append('title', formData.title);
      if (!formData.file) throw new Error('No audio file provided');
      audioFormData.append('file', formData.file);

      const audioResponse = await fetch('/api/audio/custom-upload-audio', {
        method: 'POST',
        body: audioFormData,
      });

      if (!audioResponse.ok) {
        const errorData = await audioResponse.json();
        throw new Error(errorData.error || 'Audio upload failed');
      }

      const uploadedAudio = await audioResponse.json();
      const fileId = uploadedAudio.doc.id;

      let transcriptId;
      if (formData.transcriptFile) {
        const transcriptFormData = new FormData();
        transcriptFormData.append('title', formData.title);
        transcriptFormData.append('file', formData.transcriptFile);

        const transcriptResponse = await fetch(
          '/api/transcripts/custom-upload-transcript',
          {
            method: 'POST',
            body: transcriptFormData,
          }
        );
        if (!transcriptResponse.ok) {
          const errorData = await transcriptResponse.json();
          throw new Error(errorData.error || 'Transcript upload failed');
        }

        if (transcriptResponse.ok) {
          const uploadedTranscript = await transcriptResponse.json();
          transcriptId = uploadedTranscript.doc.id;
        }
      }

      // Create soundbite with proper audio linking
      const soundbiteFormData = new FormData();
      soundbiteFormData.append('title', formData.title);
      soundbiteFormData.append('description', formData.description);
      soundbiteFormData.append('year', formData.year?.toString() || '');
      soundbiteFormData.append('category', formData.category || '');
      soundbiteFormData.append('license', formData.license || '');
      soundbiteFormData.append('author', formData.author);
      soundbiteFormData.append(
        'coordinates[latitude]',
        newLocation.latitude.toString()
      );
      soundbiteFormData.append(
        'coordinates[longitude]',
        newLocation.longitude.toString()
      );
      soundbiteFormData.append('status', 'draft');
      soundbiteFormData.append('audioGroup[audioUpload]', fileId);
      soundbiteFormData.append('audioGroup[audioFile]', fileId);

      if (transcriptId) {
        soundbiteFormData.append('uploadedTranscript', transcriptId);
      }

      const soundbiteResponse = await fetch(
        '/api/soundbites/custom-create-soundbite',
        {
          method: 'POST',
          body: soundbiteFormData,
        }
      );

      if (!soundbiteResponse.ok) {
        const errorData = await soundbiteResponse.json();
        throw new Error(errorData.error || 'Failed to create soundbite');
      }

      const newSoundbite = await soundbiteResponse.json();
      return { success: true, message: 'Soundbite successfully added!' };
    } catch (error) {
      // console.error('Error in handleConfirmLocation:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const [formData, setFormData] = useState<FormDataState | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!formData) {
      console.error('No form data available');
      setMessage('Please fill in the form details first');
      return;
    }

    // console.log('Submit with formData:', formData);
    setIsSubmitting(true);
    try {
      const result = await handleConfirmLocation();
      if (result.success) {
        handleSubmitSuccess(result);
        setMessage(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage(error.message || 'An unknown error occurred');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitSuccess = (newSoundbite: any) => {
    setShowSuccessNotification(true);

    if (window.innerWidth < 768) {
      setShowMobileBottomSheet(false);
      setNewLocation(null);
      setIsAddingLocation(false);
      setRightPanelOpen(false);
    }

    // Hide  after delay
    setTimeout(() => setShowSuccessNotification(false), 3000);
  };

  const handleMobileBack = () => {
    setShowMobileBottomSheet(false);
    setRightPanelType('newLocation');
    setRightPanelOpen(true);
    setMessage(null);
  };

  return (
    <div className='h-[100dvh] flex z-100 max-w-full relative'>
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
        onInfoClick={() => handleInfoClick('how-to-add-your-own-sounds')}
        isLeftPanelOpen={isLeftPanelOpen}
        isAddingLocation={isAddingLocation}
        setIsAddingLocation={setIsAddingLocation}
        onVisibleSoundbitesChange={handleVisibleSoundbitesChange}
        ref={mapRef}
        selectedSoundbiteId={selectedMarker?.id}
        showSuccessNotification={showSuccessNotification}
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
        showMobileCategories={!showMobileBottomSheet}
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
                onSave={(data) => {
                  setFormData(data);
                  setMessage(null);
                  // console.log('Form data saved in Map:', data);
                }}
                setIsAddingLocation={setIsAddingLocation}
                isOpen={true}
                setShowMobileBottomSheet={setShowMobileBottomSheet}
                onSubmit={handleSubmit}
                onSubmitSuccess={handleSubmitSuccess}
                isSubmitting={isSubmitting}
                message={message}
                setMessage={setMessage}
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

      {/* Mobile bottom sheet for location confirmation */}
      <MobileLocationBottomSheet
        isOpen={showMobileBottomSheet && newLocation !== null}
        onBack={handleMobileBack}
        onConfirm={handleSubmit}
        isSubmitting={isSubmitting}
        message={message}
      />
    </div>
  );
};

export default MapView;
