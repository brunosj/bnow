import React, { useState, useEffect } from 'react';
import type { Soundbite } from '../../../payload/payload-types';
import SoundbiteAudioPlayer from '../SoundbiteAudioPlayer';
import SoundbiteAudioPlayerV2 from '../SoundbiteAudioPlayerV2';
import PanelRight from '../PanelRight';
import { generateLabel } from '../../_utilities/soundbitesCategories';
import categoryStyles, { defaultStyle } from '../CategoryStyles';
import { RichText } from '../RichText';
import { FaPlus } from 'react-icons/fa6';

interface SidebarSoundbiteProps {
  soundbite: Soundbite;
  onClose: () => void;
  setIsAddingLocation: (value: boolean) => void;
  isOpen: boolean;
}

const SidebarSoundbite = ({
  soundbite,
  onClose,
  setIsAddingLocation,
}: SidebarSoundbiteProps) => {
  const { color } = categoryStyles[soundbite.category] || defaultStyle;
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false);

  useEffect(() => {
    setIsTranscriptOpen(false);
  }, [soundbite.id]);

  const handleClose = () => {
    setIsTranscriptOpen(false);
    onClose();
  };

  return (
    <PanelRight
      title=''
      onClose={handleClose}
      setIsAddingLocation={setIsAddingLocation}
    >
      <section className='space-y-6 h-full '>
        <div className='space-y-1'>
          <h3 className=''>{soundbite.title}</h3>
          <div className='flex space-x-2 items-center'>
            {soundbite.year && (
              <>
                <span className='text-xs lg:text-base'>{soundbite.year}</span>
                <span className='mr-2'>•</span>
              </>
            )}
            <span
              className='text-xs lg:text-base'
              style={{ color: ` ${color}` }}
            >
              {generateLabel(soundbite.category)}
            </span>
          </div>
          {soundbite.author && (
            <>
              <p className='text-xs lg:text-base'>
                Submitted by {soundbite.author}
              </p>
            </>
          )}
        </div>
        <div>{soundbite.description}</div>
        <SoundbiteAudioPlayerV2 audioGroup={soundbite.audioGroup} />

        {/* Transcript */}
        {soundbite.publishedTranscript &&
          (soundbite.publishedTranscript as any[]).some((block) =>
            block.children?.some((child) => child.text?.trim().length > 0)
          ) && (
            <div className='space-y-4 '>
              <button
                onClick={() => setIsTranscriptOpen(!isTranscriptOpen)}
                className='w-full flex justify-between items-center border border-bnowPurple p-2 rounded-lg'
              >
                <span className='text-sm font-medium'>Transcript</span>
                <FaPlus
                  className={`transition-transform duration-300 ${
                    isTranscriptOpen ? 'rotate-45' : ''
                  }`}
                  size={16}
                />
              </button>

              <div
                className={`transition-all duration-300 p-2 overflow-hidden ${
                  isTranscriptOpen
                    ? 'max-h-full opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <RichText
                  content={soundbite.publishedTranscript}
                  className='richTextSmall'
                />
              </div>
            </div>
          )}
      </section>
    </PanelRight>
  );
};
export default SidebarSoundbite;
