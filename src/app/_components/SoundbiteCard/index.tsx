// components/SoundbiteCard.tsx
import React from 'react';
import CustomMarker from '../CustomMarker';
import categoryStyles, { defaultStyle } from '../CategoryStyles';
import type { Soundbite } from '../../../payload/payload-types';
import { generateLabel } from '../../_utilities/soundbitesCategories';

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
    <div onClick={onClick} className={`cursor-pointer`}>
      <div className='flex items-center space-x-2'>
        <CustomMarker category={soundbite.category} />
        <div>
          <p className='text-sm font-semibold'>{soundbite.title}</p>
          <div className='flex space-x-1 items-center'>
            <span className='text-xs'>{soundbite.year}</span>
            <span>•</span>
            <span className='ml-2 text-xs' style={{ color: ` ${color}` }}>
              {generateLabel(soundbite.category)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoundbiteCard;
