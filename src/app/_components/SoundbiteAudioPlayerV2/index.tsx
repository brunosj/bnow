// SidebarAudioPlayer.tsx
import React, { useRef, useEffect } from 'react';
import 'react-h5-audio-player/lib/styles.css';
import type { Audio } from '../../../payload/payload-types';
import AudioPlayer from '../AudioPlayer';

interface SoundbiteAudioPlayerProps {
  audioGroup?: {
    audioFile?: (string | null) | Audio;
    audioUpload?: (string | null) | Audio;
  };
}

const SoundbiteAudioPlayerV2 = ({ audioGroup }: SoundbiteAudioPlayerProps) => {
  const audioUrl =
    typeof audioGroup?.audioUpload === 'object' && audioGroup.audioUpload?.url
      ? audioGroup.audioUpload.url
      : null;

  if (!audioUrl) return null;

  return <AudioPlayer audioUrl={audioUrl} hasMultipleTracks={false} />;
};

export default SoundbiteAudioPlayerV2;
