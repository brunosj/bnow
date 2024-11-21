// components/CustomMarker.tsx
import React from 'react';
import categoryStyles, { defaultStyle } from '../CategoryStyles';
import type { SoundbiteCategory } from '../../_utilities/soundbitesCategories';
import { FaPlus } from 'react-icons/fa';

interface CustomMarkerProps {
  category: SoundbiteCategory | 'blank';
  isSelected?: boolean;
}

const CustomMarker: React.FC<CustomMarkerProps> = ({
  category,
  isSelected = false,
}) => {
  const { icon, color } = categoryStyles[category] || defaultStyle;

  // Special styling for new location marker
  if (category === 'blank') {
    return (
      <div className='w-10 h-10 bg-black rounded-full flex items-center justify-center hover:opacity-85 transition-all duration-300 border-4 border-bnowGreen'>
        <FaPlus className='text-white' size={20} />
      </div>
    );
  }

  return (
    <div
      className={`relative w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-50 transition-all duration-300 shrink-0 border-black dark:border-white ${
        isSelected ? 'border-4 ' : 'border-[1px] '
      }`}
      style={{ backgroundColor: `${color}` }}
    >
      <div className='relative z-10'>{icon}</div>
    </div>
  );
};

export default CustomMarker;
