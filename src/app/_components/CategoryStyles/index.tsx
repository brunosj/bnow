// components/CategoryStyles.tsx
import React from 'react';
import { FaMusic, FaMicrophone, FaSoundcloud } from 'react-icons/fa';
import { BsSoundwave } from 'react-icons/bs';
import { PiUserSound } from 'react-icons/pi';
import { GrDocumentSound } from 'react-icons/gr';
import type { SoundbiteCategory } from '../../_utilities/soundbitesCategories';

// Define the styles with just the color values
const categoryStyles = {
  soundscapes: {
    icon: <FaMusic className='text-black' size={18} />,
    color: '#FE6285',
  },
  oral_history: {
    icon: <PiUserSound className='text-black' size={18} />,
    color: '#97AAFF',
  },
  interview: {
    icon: <PiUserSound className='text-black' size={18} />,
    color: '#FFD700',
  },
  field_recording: {
    icon: <BsSoundwave className='text-black' size={18} />,
    color: '#8BBF9F',
  },
  blank: {
    icon: <GrDocumentSound className='text-black' size={18} />,
    color: '#ffffff',
  },
};

// Default style if category is not recognized
export const defaultStyle = {
  icon: <GrDocumentSound className='text-black' size={18} />,
  color: '#ffffff',
};

export default categoryStyles;
