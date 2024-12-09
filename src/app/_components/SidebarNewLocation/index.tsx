'use client';

import React, { useState, useEffect } from 'react';
import SoundbiteUploadForm from '../SoundbiteUploadForm';
import PanelRight from '../PanelRight';
import { AnimatePresence, motion } from 'motion/react';

interface SidebarNewLocationProps {
  onClose: () => void;
  onSave: (newSoundbite: any) => void;
  lat: number;
  lng: number;
  setIsAddingLocation: (value: boolean) => void;
  isOpen: boolean;
  setShowMobileBottomSheet: (value: boolean) => void;
  onSubmit: () => Promise<boolean>;
  onSubmitSuccess: (newSoundbite: any) => void;
  isSubmitting: boolean;
  message: string | null;
  setMessage: (message: string | null) => void;
}

const SidebarNewLocation = ({
  onClose,
  onSave,
  setIsAddingLocation,
  lat,
  lng,
  setShowMobileBottomSheet,
  onSubmit,
  isSubmitting,
  message,
  setMessage,
}: SidebarNewLocationProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close panel on mobile when reaching step 2
  useEffect(() => {
    if (step === 2 && isMobile) {
      onClose();
      setShowMobileBottomSheet(true);
    }
  }, [step, isMobile, onClose, setShowMobileBottomSheet]);

  const handlePanelClose = () => {
    onClose();
    if (!(isMobile && step === 2)) {
      setIsAddingLocation(false);
    }
  };

  const handleFormSave = (data: any) => {
    // console.log('Form data received:', data);
    setFormData(data);
    onSave(data);
    setStep(2);
  };

  const handleSubmit = async () => {
    try {
      const isSuccess = await onSubmit();
      if (isSuccess) {
        setStep(3);
      } else {
        console.error('Submission failed');
        // console.log(message);
      }
    } catch (error) {
      console.error('Error submitting:', error);
    }
  };

  const handleBack = () => {
    setStep(1);
    setMessage(null);
  };

  return (
    <>
      <PanelRight
        onClose={handlePanelClose}
        setIsAddingLocation={setIsAddingLocation}
        isOpen={!(step === 2 && isMobile)}
      >
        <h2 className='font-semibold mb-6'>Add a Soundbite</h2>

        {step === 1 ? (
          <div className='space-y-4'>
            <p className='text-sm'>
              First, fill in the details about your soundbite.
            </p>
            <SoundbiteUploadForm
              onClose={handlePanelClose}
              onSave={handleFormSave}
              lat={lat}
              lng={lng}
              onNextStep={() => setStep(2)}
              initialData={formData}
            />
          </div>
        ) : step === 2 ? (
          <div className='hidden lg:block space-y-6'>
            <p className='text-sm'>
              Using the map, please drag the marker to confirm the location of
              your soundbite.
            </p>
            {message && message.toLowerCase().includes('error') && (
              <p className='text-sm text-bnowRed font-semibold'>{message}</p>
            )}
            <div className='flex space-x-3'>
              <button
                onClick={handleBack}
                className='flex-1 bg-black text-bnowGreen border-2 border-bnowGreen py-2 px-4 rounded-md'
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className='flex-1 bg-bnowGreen text-black dark:text-white py-2 px-4 rounded-md'
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className='flex items-center justify-center space-x-3'>
                    <div className='lds-ring'>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <span>Submitting...</span>
                  </div>
                ) : (
                  <span>Submit</span>
                )}
              </button>
            </div>

            {/* Latitude and Longitude info box */}
            <div className='absolute bottom-8 left-4 text-primary p-2 shadow-lg rounded-md z-10 bg-neutral bg-opacity-95'>
              <p className='text-xs font-mono'>
                Latitude:
                <span className='text-bnowGreen'> {lat.toFixed(6)}</span>
                <br />
                Longitude:
                <span className='text-bnowGreen'> {lng.toFixed(6)}</span>
              </p>
            </div>
          </div>
        ) : step === 3 ? (
          <div className='space-y-6'>
            <p className='text-sm'>
              Thanks! Your Soundbite has been added for approval.
            </p>
            <button
              onClick={handlePanelClose}
              className='w-full bg-bnowGreen text-black dark:text-white py-2 px-4 rounded-md'
            >
              Close
            </button>
          </div>
        ) : (
          <div className='space-y-6'>
            <p className='text-sm text-bnowRed'>
              {message || 'An error occurred while uploading your soundbite.'}
            </p>
            <button
              onClick={() => setStep(2)}
              className='w-full bg-bnowGreen text-black dark:text-white py-2 px-4 rounded-md'
            >
              Try Again
            </button>
          </div>
        )}
      </PanelRight>
    </>
  );
};

export default SidebarNewLocation;
