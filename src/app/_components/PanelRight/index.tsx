import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from 'motion/react';

interface PanelRightProps {
  children: React.ReactNode;
  onClose: () => void;
  isOpen?: boolean;
  setIsAddingLocation?: (value: boolean) => void;
}

const PanelRight: React.FC<PanelRightProps> = ({
  children,
  onClose,
  isOpen = true,
  setIsAddingLocation,
}) => {
  // Dragging is currently disabled to prevent accidental closing of the panel when using audio player

  // const x = useMotionValue(0);
  // const [isDragging, setIsDragging] = useState(false);

  // const handleDragEnd = () => {
  //   setIsDragging(false);
  //   const currentX = x.get();
  //   if (currentX > window.innerWidth * 0.3) {
  //     handleClose();
  //   } else {
  //     x.set(0);
  //   }
  // };

  // const handleClose = () => {
  //   x.set(window.innerWidth);
  //   setTimeout(() => {
  //     setIsAddingLocation?.(false);
  //     onClose();
  //   }, 300);
  // };

  // Original close function
  const handleClose = () => {
    onClose();
  };

  return (
    <AnimatePresence mode='wait'>
      {isOpen && (
        <motion.aside
          // drag='x'
          // dragDirectionLock
          // dragElastic={0.2}
          // dragConstraints={{ left: 0, right: window.innerWidth }}
          // dragMomentum={false}
          // onDragStart={() => setIsDragging(true)}
          // onDragEnd={handleDragEnd}
          // style={{ x }}
          // initial={{ x: '100%' }}
          // animate={{ x: 0 }}
          // exit={{
          //   x: '100%',
          // }}
          // transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className='fixed top-0 right-0 h-[100dvh] shadow-lg z-20 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 bg-white dark:bg-black text-black dark:text-white overflow-y-auto pt-16 lg:pt-0 touch-pan-y'
        >
          {/* Drag handle for mobile */}
          <div className='lg:hidden absolute left-0 top-0 bottom-0 w-8 cursor-grab active:cursor-grabbing' />

          <div className='fixed top-[4.7rem] md:top-20 lg:top-3 right-3 lg:right-6'>
            <div className='flex justify-end'>
              <button onClick={handleClose} aria-label='Close panel'>
                <IoClose size={32} />
              </button>
            </div>
          </div>

          <AnimatePresence mode='wait'>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='mx-6 lg:mx-8 overflow-hidden mt-8 md:mt-16 mb-6'
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
