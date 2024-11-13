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

  const controls = ['play', 'progress', 'current-time', 'duration'];

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
