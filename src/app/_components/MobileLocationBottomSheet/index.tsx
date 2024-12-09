import { AnimatePresence, motion } from 'motion/react';

interface MobileLocationBottomSheetProps {
  isOpen: boolean;
  onBack: () => void;
  onConfirm: () => Promise<boolean>;
  isSubmitting: boolean;
  message?: string | null;
}

const MobileLocationBottomSheet = ({
  isOpen,
  onBack,
  onConfirm,
  isSubmitting,
  message,
}: MobileLocationBottomSheetProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='fixed bottom-0 left-0 right-0 bg-black rounded-t-3xl shadow-lg z-30'
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        >
          <div className='p-6 space-y-4 my-auto h-full flex flex-col justify-center'>
            <h2>Please confirm marker location</h2>
            <p className='text-sm text-white'>
              Drag the marker to confirm the location of your soundbite.
            </p>
            {message && message.toLowerCase().includes('error') && (
              <p className='text-sm text-bnowRed font-semibold'>{message}</p>
            )}
            <div className='flex space-x-3'>
              <button
                onClick={onBack}
                className='flex-1 bg-black text-bnowGreen border-2 border-bnowGreen py-2 px-4 rounded-md'
              >
                Back
              </button>
              <button
                onClick={onConfirm}
                disabled={isSubmitting}
                className='flex-1 bg-bnowGreen text-white py-2 px-4 rounded-md'
              >
                {isSubmitting ? (
                  <div className='flex items-center justify-center space-x-3'>
                    <div className='lds-ring'>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <span>Uploading...</span>
                  </div>
                ) : (
                  <span>Submit</span>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileLocationBottomSheet;
