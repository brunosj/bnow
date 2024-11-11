import React from 'react';
import { IoClose } from 'react-icons/io5';

interface PanelRightProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  isOpen?: boolean;
}

const PanelRight: React.FC<PanelRightProps> = ({
  title,
  children,
  onClose,
  isOpen = true,
}) => {
  return (
    <aside
      className={`fixed top-0 right-0 h-full shadow-lg z-30 transition-transform duration-300 w-1/4 bg-white dark:bg-black ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Header */}
      <div className='py-3 px-6 '>
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-semibold'>{title}</h2>
          <button
            onClick={onClose}
            className='p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors'
            aria-label='Close panel'
          >
            <IoClose size={24} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className='h-full overflow-y-auto p-6'>{children}</div>
    </aside>
  );
};

export default PanelRight;
