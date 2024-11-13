// components/ToggleButton.tsx
import React from 'react';
import { IoChevronForward } from 'react-icons/io5';

interface ToggleButtonProps {
  onToggle: () => void;
  isOpen: boolean;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ onToggle, isOpen }) => {
  return (
    <button
      onClick={onToggle}
      className='absolute  top-1/5 transform  bg-black rounded-full p-2 shadow-md flex items-center justify-center text-white'
    >
      <IoChevronForward
        className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
      />
    </button>
  );
};

export default ToggleButton;
