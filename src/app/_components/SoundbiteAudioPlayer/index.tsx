// SidebarAudioPlayer.tsx
import React, { useRef, useEffect } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import type { Audio } from '../../../payload/payload-types';

interface SoundbiteAudioPlayerProps {
  audioGroup?: {
    audioFile?: (string | null) | Audio;
    audioUpload?: (string | null) | Audio;
  };
}

const SoundbiteAudioPlayer: React.FC<SoundbiteAudioPlayerProps> = ({
  audioGroup,
}) => {
  const audioUrl =
    typeof audioGroup?.audioUpload === 'object' && audioGroup.audioUpload?.url
      ? audioGroup.audioUpload.url
      : null;

  const audioRef = useRef<HTMLAudioElement | null>(null); // Reference to control the audio element

  // Effect to handle pausing the audio when URL changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause(); // Explicitly pause the audio when URL changes
      audioRef.current.currentTime = 0; // Reset the audio position to the start
    }
  }, [audioUrl]); // Dependency on audioUrl to trigger when switching soundbites

  if (!audioUrl) {
    return <p>No audio file available</p>;
  }

  return (
    <AudioPlayer
      ref={(player) => {
        // Assign the audio element reference
        if (player) {
          audioRef.current = player.audio.current;
        }
      }}
      src={audioUrl}
      autoPlay={false}
      showJumpControls={false}
      customAdditionalControls={[]}
      layout='horizontal'
      style={{
        borderRadius: '0px',
        border: '1px solid #ddd',
        marginTop: '5px',
        boxShadow:
          '0 2px 3px 0 rgba(0, 2, 4, 0.05), 0 10px 4px -8px rgba(0, 2, 4, 0.02)',
      }}
    />
  );
};

export default SoundbiteAudioPlayer;
