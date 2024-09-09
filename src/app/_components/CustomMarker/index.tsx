// components/CustomMarker.tsx
import React from 'react';
import categoryStyles, { defaultStyle } from '../CategoryStyles';

interface CustomMarkerProps {
  category: 'music' | 'speech' | 'sound_effects';
}

const CustomMarker: React.FC<CustomMarkerProps> = ({ category }) => {
  // Get the styles for the category or fall back to the default style
  const { icon, color } = categoryStyles[category] || defaultStyle;
  return (
    <div
      className={`relative w-8 h-8 bg-${color} rounded-full flex items-center justify-center hover:bg-opacity-80 transition-all duration-300`}
      style={{ backgroundColor: `${color}` }}
    >
      {/* Marker Shape */}
      <div
        className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-[${color} rounded-full z-0`}
      />
      {/* Icon inside the marker */}
      <div className='relative z-10'>{icon}</div>
    </div>
  );
};

export default CustomMarker;
