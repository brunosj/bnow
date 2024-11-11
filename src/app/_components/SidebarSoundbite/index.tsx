import React from 'react';
import type { Soundbite } from '../../../payload/payload-types';
import SoundbiteAudioPlayer from '../SoundbiteAudioPlayer';
import SoundbiteAudioPlayerV2 from '../SoundbiteAudioPlayerV2';
import PanelRight from '../PanelRight';
import { generateLabel } from '../../_utilities/soundbitesCategories';
import categoryStyles, { defaultStyle } from '../CategoryStyles';
import { RichText } from '../RichText';

interface SidebarSoundbiteProps {
  soundbite: Soundbite;
  onClose: () => void;
}

const SidebarSoundbite = ({ soundbite, onClose }: SidebarSoundbiteProps) => {
  const { color } = categoryStyles[soundbite.category] || defaultStyle;

  return (
    <PanelRight title='' onClose={onClose}>
      <section className='space-y-6'>
        <div>
          <h4 className=''>{soundbite.title}</h4>
          <div className='flex space-x-2 items-center'>
            <span className='text-xs'>{soundbite.year}</span>
            <span>•</span>
            <span className='ml-2 text-xs' style={{ color: ` ${color}` }}>
              {generateLabel(soundbite.category)}
            </span>
          </div>
        </div>
        <div>{soundbite.description}</div>
        <SoundbiteAudioPlayerV2 audioGroup={soundbite.audioGroup} />
        {soundbite.uploadedTranscript && (
          <div>
            <RichText
              content={soundbite.publishedTranscript}
              className='richTextSmall'
            />
          </div>
        )}
      </section>
    </PanelRight>
  );
};
export default SidebarSoundbite;
