import { AudioPlayer as ReactAudioPlay } from 'react-audio-play';
import { useTheme } from 'next-themes';

interface AudioPlayerProps {
  audioUrl: string;
}

const AudioPlayerV2 = ({ audioUrl }: AudioPlayerProps) => {
  const { theme } = useTheme();

  return (
    <div className=''>
      <ReactAudioPlay
        src={audioUrl}
        className='custom-style'
        volumePlacement='top'
        backgroundColor='transparent'
        color={theme === 'dark' ? 'var(--color-white)' : 'var(--color-black)'}
        sliderColor={
          theme === 'dark' ? 'var(--color-white)' : 'var(--color-black)'
        }
        preload={'auto'}
      />
      <style jsx global>
        {`
          .custom-style.rap-container {
            background-color: var(--color-black);
            color: var(--color-white);
            border-radius: 8px;
            padding: 12px;
            box-shadow: none;
          }

          .rap-backdrop {
            display: none;
          }
        `}
      </style>
    </div>
  );
};

export default AudioPlayerV2;
