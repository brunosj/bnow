// components/SoundbiteCard.tsx
import React from 'react';
import CustomMarker from '../CustomMarker';
import categoryStyles, { defaultStyle } from '../CategoryStyles';
import type { Soundbite } from '../../../payload/payload-types';
import { generateLabel } from '../../_utilities/soundbitesCategories';

interface SoundbiteCardProps {
  soundbite: Soundbite;
  onClick: () => void;
  isSelected?: boolean;
}

const SoundbiteCard: React.FC<SoundbiteCardProps> = ({
  soundbite,
  onClick,
  isSelected = false,
}) => {
  const { color } = categoryStyles[soundbite.category] || defaultStyle;

  const handleClick = () => {
    onClick();
  };

  return (
    <li
      key={soundbite.id}
      onClick={handleClick}
      className={`cursor-pointer transition-all duration-300  rounded-[2rem] overflow-y-auto  shadow-lg p-2 border-[1px] ${
        isSelected ? 'border-white' : 'border-bnowPurple'
      }`}
    >
      <div className='flex items-center space-x-3'>
        <CustomMarker category={soundbite.category} />
        <div>
          <p className='text-sm lg:text-base font-medium'>{soundbite.title}</p>
          <div className='flex space-x-2 items-center'>
            {soundbite.year && (
              <>
                <span className='text-xs lg:text-sm'>{soundbite.year}</span>
                <span className='mr-2'>•</span>
              </>
            )}
            <span
              className='text-xs lg:text-sm'
              // style={{ color: ` ${color}` }}
            >
              {generateLabel(soundbite.category)}
            </span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default SoundbiteCard;
