import { FaPlus } from 'react-icons/fa6';

interface NewLocationButtonProps {
  isAddingLocation: boolean;
  setIsAddingLocation: (value: boolean) => void;
}

const NewLocationButton = ({
  isAddingLocation,
  setIsAddingLocation,
}: NewLocationButtonProps) => {
  return (
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
            ${isAddingLocation ? 'bg-black' : 'bg-black '}`}
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
  );
};

export default NewLocationButton;
