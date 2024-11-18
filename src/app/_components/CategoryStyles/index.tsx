// components/CategoryStyles.tsx
import React from 'react';
import IconRenderer from '../IconRenderer';

// Import icons
import soundIcon from '../../_assets/icons/sound.png';
import oralHistoryIcon from '../../_assets/icons/oral-history.png';
import interviewIcon from '../../_assets/icons/interview.png';
import fieldRecordingIcon from '../../_assets/icons/field-recording.png';

// Define the styles with imported icons
const categoryStyles = {
  soundscapes: {
    icon: <IconRenderer icon={soundIcon} />,
    color: '#DC3036',
  },
  oral_history: {
    icon: <IconRenderer icon={oralHistoryIcon} />,
    color: '#30C156',
  },
  interview: {
    icon: <IconRenderer icon={interviewIcon} />,
    color: '#E79601',
  },
  field_recording: {
    icon: <IconRenderer icon={fieldRecordingIcon} />,
    color: '#098E91',
  },
  blank: {
    icon: <IconRenderer icon={fieldRecordingIcon} />,
    color: '#000000',
  },
};

// Default style if category is not recognized
export const defaultStyle = {
  icon: <IconRenderer icon={fieldRecordingIcon} />,
  color: '#ffffff',
};

export default categoryStyles;
