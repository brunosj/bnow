// components/CategoryStyles.tsx
import React from 'react';
import { FaMusic, FaMicrophone, FaSoundcloud } from 'react-icons/fa';
import { BsSoundwave } from 'react-icons/bs';
import { PiUserSound } from 'react-icons/pi';
import { GrDocumentSound } from 'react-icons/gr';

// Define the styles with just the color values
const categoryStyles = {
  music: {
    icon: <FaMusic className='text-black' />,
    color: '#FE6285',
  },
  speech: {
    icon: <PiUserSound className='text-black' />,
    color: '#97AAFF',
  },
  sound_effects: {
    icon: <BsSoundwave className='text-black' />,
    color: '#8BBF9F',
  },
  blank: {
    icon: <GrDocumentSound className='text-black' />,
    color: '#ffffff',
  },
};

// Default style if category is not recognized
export const defaultStyle = {
  icon: <GrDocumentSound className='text-black' />,
  color: '#ffffff',
};

export default categoryStyles;
