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
          className='fixed top-0 right-0 h-screen shadow-lg z-30 w-1/4 bg-white dark:bg-black text-black dark:text-white overflow-y-auto'
        >
          <div className='px-6 py-2'>
            <div className='flex items-center justify-between'>
              <h2 className='text-xl font-semibold'>{title}</h2>
              <button
                onClick={handleClose}
                className='p-2 rounded-full transition-colors'
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
              className='px-6 pb-8 pt-4 overflow-hidden'
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
