import React from 'react';
import { IoClose } from 'react-icons/io5';

interface PanelRightProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  isOpen?: boolean;
  setIsAddingLocation?: (value: boolean) => void;
}

const PanelRight: React.FC<PanelRightProps> = ({
  title,
  children,
  onClose,
  isOpen = true,
  setIsAddingLocation,
}) => {
  const handleClose = () => {
    setIsAddingLocation?.(false);
    onClose();
  };

  return (
    <aside
      className={`fixed top-0  overflow-y-auto right-0 h-screen shadow-lg z-30 transition-all duration-300 ease-in-out w-1/4 
        ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-[100%] opacity-0'}
        bg-white dark:bg-black text-black dark:text-white`}
    >
      {/* Header */}
      <div className='p-4'>
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-semibold'>{title}</h2>
          <button
            onClick={handleClose}
            className='p-2 rounded-full transition-colors'
            aria-label='Close panel'
          >
            <IoClose size={24} />
          </button>
        </div>
      </div>
      <div className='p-4 bg-black'>
        {/* Content */}
        {children}
      </div>
    </aside>
  );
};

export default PanelRight;
