import { BsQuestionCircleFill } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa6';
import { NavigationControl } from 'react-map-gl';

interface MapControlsProps {
  isLeftPanelOpen: boolean;
  isAddingLocation: boolean;
  onInfoClick: () => void;
  setIsAddingLocation: (value: boolean) => void;
}

const MapControls = ({
  isLeftPanelOpen,
  isAddingLocation,
  onInfoClick,
  setIsAddingLocation,
}: MapControlsProps) => {
  return (
    <>
      {isAddingLocation && (
        <div className='absolute inset-0  bg-[#bfbccb] bg-opacity-20 pointer-events-none z-0' />
      )}

      <NavigationControl position='bottom-right' />

      <div
        className={`absolute bottom-8 z-10 transition-all duration-300 ${
          isLeftPanelOpen ? 'left-[21%]' : 'left-4'
        }`}
      >
        <button
          onClick={onInfoClick}
          className='flex items-center gap-2 bg-black bg-opacity-100 hover:bg-opacity-100 text-white px-4 py-2 rounded-full transition-all duration-300'
        >
          <BsQuestionCircleFill size={20} />
          <span className='text-sm whitespace-nowrap'>
            How to add your soundbite
          </span>
        </button>
      </div>

      <div className='absolute top-2 right-2 z-10'>
        <div className='flex items-center'>
          <div className='flex items-center overflow-hidden'>
            <span
              className={`rounded-3xl text-sm bg-black text-white px-3 py-2 whitespace-nowrap transition-all duration-300 origin-right
                ${
                  isAddingLocation
                    ? 'translate-x-0 opacity-100 max-w-[300px]'
                    : 'translate-x-full opacity-0 max-w-0'
                }`}
            >
              <span className='mr-8'>
                Click on the map to place your soundbite
              </span>
            </span>
          </div>
          <button
            onClick={() => setIsAddingLocation(!isAddingLocation)}
            title={
              isAddingLocation ? 'Cancel adding location' : 'Add new location'
            }
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 relative z-20
              ${isAddingLocation ? 'bg-black' : 'bg-black hover:opacity-75'}`}
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
    </>
  );
};

export default MapControls;
