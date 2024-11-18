import { useRef, useState, useEffect } from 'react';
import Plyr, { APITypes } from 'plyr-react';
import 'plyr-react/plyr.css';
import {
  BiSkipPrevious,
  BiSkipNext,
  BiRewind,
  BiFastForward,
  BiPlay,
  BiPause,
  BiVolumeFull,
  BiVolumeMute,
} from 'react-icons/bi';
import { RiReplay10Line, RiForward10Line } from 'react-icons/ri';

interface AudioPlayerProps {
  audioUrl: string;
  onNext?: () => void;
  onPrevious?: () => void;
  hasMultipleTracks?: boolean;
}

const AudioPlayer = ({
  audioUrl,
  onNext,
  onPrevious,
  hasMultipleTracks = false,
}: AudioPlayerProps) => {
  const playerRef = useRef<APITypes>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState<Plyr | null>(null);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const volumeControlRef = useRef<HTMLDivElement>(null);

  const controls = ['play', 'progress', 'current-time', 'duration'];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        volumeControlRef.current &&
        !volumeControlRef.current.contains(event.target as Node)
      ) {
        setShowVolumeControl(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(e.target.value);
    if (playerRef.current?.plyr) {
      playerRef.current.plyr.volume = volume;
      setIsMuted(volume === 0);
    }
  };

  const toggleMute = () => {
    if (playerRef.current?.plyr) {
      const newMutedState = !isMuted;
      playerRef.current.plyr.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  const customControls = (
    <div className='flex items-center justify-center gap-6 mt-2'>
      <button
        onClick={() => playerRef.current?.plyr?.rewind(10)}
        className='text-2xl'
        aria-label='Rewind 10 seconds'
      >
        <RiReplay10Line />
      </button>
      {hasMultipleTracks && (
        <button
          onClick={onPrevious}
          className='text-2xl '
          aria-label='Previous track'
        >
          <BiSkipPrevious />
        </button>
      )}
      {hasMultipleTracks && (
        <button onClick={onNext} className='text-2xl ' aria-label='Next track'>
          <BiSkipNext />
        </button>
      )}
      <button
        onClick={() => playerRef.current?.plyr?.forward(10)}
        className='text-2xl'
        aria-label='Forward 10 seconds'
      >
        <RiForward10Line />
      </button>
      <div className='relative' ref={volumeControlRef}>
        <button
          onClick={() => {
            toggleMute();
            setShowVolumeControl(!showVolumeControl);
          }}
          className='text-2xl'
          aria-label='Volume control'
        >
          {isMuted ? <BiVolumeMute /> : <BiVolumeFull />}
        </button>
        {showVolumeControl && (
          <div className='absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg'>
            <input
              type='range'
              min='0'
              max='1'
              step='0.01'
              defaultValue={playerRef.current?.plyr?.volume || 1}
              className='h-24 w-2 -rotate-90 origin-bottom'
              onChange={handleVolumeChange}
              style={{ margin: '48px 0' }}
            />
          </div>
        )}
      </div>
    </div>
  );

  useEffect(() => {
    if (player) {
      player.source = {
        type: 'audio',
        sources: [{ src: audioUrl }],
      };
    }
  }, [audioUrl, player]);

  return (
    <div className='space-y-2 text'>
      <style jsx global>{`
        .plyr--audio .plyr__controls {
          background: transparent;
          color: inherit;
          padding: 0;
        }
        .plyr--audio .plyr__control,
        .plyr--audio .plyr__control:hover {
          background: transparent;
        }
        .plyr--audio .plyr__time {
          color: inherit;
        }

        input[type='range'] {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
          cursor: pointer;
        }

        input[type='range']::-webkit-slider-runnable-track {
          width: 100%;
          height: 4px;
          background: #ddd;
          border-radius: 2px;
        }

        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 12px;
          width: 12px;
          background-color: white;
          border-radius: 50%;
          margin-top: -4px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        }

        input[type='range']::-moz-range-track {
          width: 100%;
          height: 4px;
          background: #ddd;
          border-radius: 2px;
        }

        input[type='range']::-moz-range-thumb {
          height: 12px;
          width: 12px;
          background-color: white;
          border-radius: 50%;
          border: none;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        }

        .dark input[type='range']::-webkit-slider-runnable-track {
          background: #4b5563;
        }

        .dark input[type='range']::-moz-range-track {
          background: #4b5563;
        }

        .dark input[type='range']::-webkit-slider-thumb,
        .dark input[type='range']::-moz-range-thumb {
          background-color: #e5e7eb;
        }
      `}</style>
      <Plyr
        ref={playerRef}
        source={{
          type: 'audio',
          sources: [{ src: audioUrl }],
        }}
        options={{
          controls,
          invertTime: false,
          listeners: {
            play: () => setIsPlaying(true),
            pause: () => setIsPlaying(false),
            ended: () => setIsPlaying(false),
          },
        }}
      />
      {customControls}
    </div>
  );
};

export default AudioPlayer;
