import React, { useEffect, useState } from 'react';
import { useField } from 'payload/components/forms';
import { Label } from 'payload/components/forms';
import { Props } from 'payload/components/fields/Relationship';
import CustomAudioPlayer from '../CustomAudioPlayer';
import type { Audio } from '../../payload-types';

const baseClass = 'custom-audio-select';

const AudioSelectField: React.FC<Props> = (props) => {
  const { path, label, required } = props;
  const { value = '', setValue } = useField<string>({
    path,
    validate: (val: string, { siblingData }) => {
      if (!val && siblingData.audioUpload) {
        return true;
      }
      return val ? true : 'Please select a valid audio file';
    },
  });

  // Use siblingData if audio information is already available
  const siblingData = useField<{ audioFile?: { url?: string; id?: string } }>({
    path: 'audioGroup',
  }).value;

  const [audioSrc, setAudioSrc] = useState<string>(
    siblingData?.audioFile?.url || ''
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!value && siblingData?.audioFile?.url) {
      // If siblingData already has audio URL, no need to fetch
      setAudioSrc(siblingData.audioFile.url);
      setValue(siblingData.audioFile.id);
      return;
    }

    if (value) {
      const fetchAudioFile = async () => {
        setLoading(true);
        setError(null);

        try {
          const response = await fetch(`/api/audio/${value}`);
          if (!response.ok)
            throw new Error('Failed to fetch the selected audio file');

          const audio: Audio = await response.json();
          setAudioSrc(audio.url || `/api/audio/${audio.filename}`);
          setValue(audio.id);
        } catch (err) {
          console.error('Error fetching audio file:', err);
          setError(
            'Error fetching the selected audio file. Please try again later.'
          );
        } finally {
          setLoading(false);
        }
      };

      fetchAudioFile();
    }
  }, [value, setValue, siblingData]);

  if (loading) {
    return <p>Loading audio file...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={baseClass} style={{ paddingBottom: '1.5rem' }}>
      <Label htmlFor={path} label={label} required={required} />
      {audioSrc ? (
        <CustomAudioPlayer key={audioSrc} src={audioSrc} />
      ) : (
        <p>No audio file selected</p>
      )}
    </div>
  );
};

export default AudioSelectField;
