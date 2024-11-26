import React from 'react';
import { IoClose } from 'react-icons/io5';
import { motion, AnimatePresence } from 'motion/react';

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
    <AnimatePresence mode='wait'>
      {isOpen && (
        <motion.aside
          initial={{ x: '100%' }}
          animate={{ x: '0%' }}
          exit={{ x: '100%' }}
          transition={{
            type: 'tween',
            duration: 0.3,
            ease: 'easeInOut',
          }}
          className='fixed top-0 right-0 h-screen shadow-lg z-30 w-full md:w-1/3 lg:w-1/4  bg-white dark:bg-black text-black dark:text-white overflow-y-auto pt-16 md:pt-0'
        >
          <div className='p-4 lg:p-6'>
            <div className='flex items-center justify-between'>
              <h3 className=' font-semibold'>{title}</h3>
              <button
                onClick={handleClose}
                className='rounded-full transition-colors'
                aria-label='Close panel'
              >
                <IoClose size={28} />
              </button>
            </div>
          </div>
          <AnimatePresence mode='wait'>
            <motion.div
              key={title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='p-4 lg:p-6 overflow-hidden'
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default PanelRight;
