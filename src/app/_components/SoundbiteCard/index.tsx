// components/SoundbiteCard.tsx
import React from 'react';
import CustomMarker from '../CustomMarker';
import categoryStyles, { defaultStyle } from '../CategoryStyles';
import type { Soundbite } from '../../../payload/payload-types';

interface SoundbiteCardProps {
  soundbite: Soundbite;
  onClick: () => void;
}

const SoundbiteCard: React.FC<SoundbiteCardProps> = ({
  soundbite,
  onClick,
}) => {
  const { color } = categoryStyles[soundbite.category] || defaultStyle;

  return (
    <div
      onClick={onClick}
      className={`p-4 mb-4 cursor-pointer rounded-md shadow-md transition-transform duration-300 hover:scale-[1.02]`}
      style={{ border: `2px solid ${color}` }}
    >
      <h3 className='text-lg font-semibold'>{soundbite.title}</h3>
      <p className='text-sm text-gray-600'>{soundbite.description}</p>
      <p className='mt-2 text-xs text-gray-500'>Year: {soundbite.year}</p>
      <p className='mt-1 text-xs text-gray-500'>
        Contributor: {soundbite.contributorName}
      </p>
      <div className='flex items-center mt-2'>
        <CustomMarker category={soundbite.category} />
        <span className='ml-2 text-xs'>{soundbite.category}</span>
      </div>
    </div>
  );
};

export default SoundbiteCard;
