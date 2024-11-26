import { BsQuestionCircleFill } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa6';
import { NavigationControl } from 'react-map-gl';
import SearchBox from '../SearchBox';
import { AnimatePresence } from 'motion/react';
import SuccessNotification from './SuccessNotification';
import { useState } from 'react';

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
        <div className='absolute inset-0  bg-[#bfbccb] bg-opacity-20 pointer-events-none z-0' />
      )}

      {/* Search box placed in center*/}
      <SearchBox mapboxToken={mapboxToken} />

      {/* Navigation control */}
      <NavigationControl position='bottom-right' />

      {/* Info button */}
      <div
        className={`absolute info-button z-10 transition-all duration-300 ${
          isLeftPanelOpen ? 'left-[21%]' : 'left-4'
        }`}
      >
        <button
          onClick={onInfoClick}
          className='hidden md:flex items-center gap-2 bg-black bg-opacity-100 hover:bg-opacity-85 text-white px-4 py-2 rounded-full transition-all duration-300'
        >
          <BsQuestionCircleFill size={20} />
          <span className='text-sm whitespace-nowrap'>
            How to add your soundbite
          </span>
        </button>
      </div>

      {/* Add new location button */}
      <div className='absolute top-20 lg:top-2 right-2 z-20'>
        <div className='relative z-10'>
          <div className='absolute right-2 top-[0.15rem]'>
            <div className='flex items-center overflow-hidden'>
              <span
                className={`rounded-3xl text-sm bg-black text-white px-3 py-2 whitespace-nowrap transition-all duration-300 origin-right
                ${
                  isAddingLocation
                    ? 'translate-x-0 opacity-100'
                    : 'translate-x-full opacity-100 max-w-0'
                }`}
              >
                <span className='px-2 mr-4'>
                  Click on the map to place your soundbite
                </span>
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsAddingLocation(!isAddingLocation)}
            title={
              isAddingLocation ? 'Cancel adding location' : 'Add new location'
            }
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 relative z-20
              ${isAddingLocation ? 'bg-black' : 'bg-black hover:opacity-85'}`}
          >
            <FaPlus
              className={`text-white transition-transform duration-300 ${
                isAddingLocation ? 'rotate-45' : ''
              }`}
              size={20}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showSuccessNotification && <SuccessNotification />}
      </AnimatePresence>
    </>
  );
};

export default MapControls;
