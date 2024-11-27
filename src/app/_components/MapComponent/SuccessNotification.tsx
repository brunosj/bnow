import { motion, AnimatePresence } from 'motion/react';
import { FaCheck } from 'react-icons/fa';
import { useEffect, useState } from 'react';

const SuccessNotification = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className='lg:hidden absolute top-20 left-2 bg-black text-white px-4 py-3 rounded-3xl flex items-center space-x-3 shadow-lg w-3/4'
        >
          <div className='w-8 h-8 rounded-full border-2 border-bnowGreen flex items-center justify-center shrink-0'>
            <FaCheck className='text-bnowGreen' size={16} />
          </div>
          <span className='text-sm'>
            Thanks! Your Soundbite has been added for approval
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessNotification;
