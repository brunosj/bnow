// SidebarAudioPlayer.tsx
import React, { useRef, useEffect, useState } from 'react';
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
  const [currentTrack, setCurrentTrack] = useState(0);

  const audioUrl =
    typeof audioGroup?.audioUpload === 'object' && audioGroup.audioUpload?.url
      ? audioGroup.audioUpload.url
      : null;

  if (!audioUrl) return null;

  return (
    <div>
      <AudioPlayer
        key={currentTrack}
        audioUrl={audioUrl}
        hasMultipleTracks={false}
      />
    </div>
  );
};

export default SoundbiteAudioPlayerV2;
