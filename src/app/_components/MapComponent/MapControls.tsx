import { NavigationControl } from 'react-map-gl';
import SearchBox from '../SearchBox';
import { AnimatePresence } from 'motion/react';
import SuccessNotification from './SuccessNotification';
import { useState } from 'react';
import InfoButton from './InfoButton';
import NewLocationButton from './NewLocationButton';

interface MapControlsProps {
  mapboxToken: string;
  isLeftPanelOpen: boolean;
  isAddingLocation: boolean;
  onInfoClick: () => void;
  setIsAddingLocation: (value: boolean) => void;
  showSuccessNotification?: boolean;
}

const MapControls = ({
  mapboxToken,
  isLeftPanelOpen,
  isAddingLocation,
  onInfoClick,
  setIsAddingLocation,
  showSuccessNotification = false,
}: MapControlsProps) => {
  return (
    <>
      {/* Add new location overlay */}
      {isAddingLocation && (
        <div className='absolute inset-0 bg-[#bfbccb] bg-opacity-20 pointer-events-none z-0' />
      )}

      {/* Search box placed in center */}
      <SearchBox mapboxToken={mapboxToken} />

      {/* Navigation control */}
      <NavigationControl position='bottom-right' />

      {/* Info button */}
      <InfoButton onClick={onInfoClick} isLeftPanelOpen={isLeftPanelOpen} />

      {/* New location button */}
      <NewLocationButton
        isAddingLocation={isAddingLocation}
        setIsAddingLocation={setIsAddingLocation}
      />

      <AnimatePresence>
        {showSuccessNotification && <SuccessNotification />}
      </AnimatePresence>
    </>
  );
};

export default MapControls;
