// components/CategoryStyles.tsx
import React from 'react';
import { FaMusic, FaMicrophone, FaSoundcloud } from 'react-icons/fa';
import { BsSoundwave } from 'react-icons/bs';
import { PiUserSound } from 'react-icons/pi';
import { GrDocumentSound } from 'react-icons/gr';

// Define the styles with just the color values
const categoryStyles = {
  soundscapes: {
    icon: <FaMusic className='text-black' size={18} />,
    color: '#ca403e',
  },
  oral_history: {
    icon: <PiUserSound className='text-black' size={18} />,
    color: '#61bf62',
  },
  interview: {
    icon: <PiUserSound className='text-black' size={18} />,
    color: '#dc9a36',
  },
  field_recording: {
    icon: <BsSoundwave className='text-black' size={18} />,
    color: '#408c90',
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
