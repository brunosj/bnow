// TextArea.tsx
import React from 'react';

interface TextAreaProps {
  id: string;
  label: string;
  value: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}

const TextArea: React.FC<TextAreaProps> = ({
  id,
  label,
  disabled,
  value,
  onChange,
}) => (
  <div>
    <label className='label' htmlFor={id}>
      {label}:
    </label>
    <textarea
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className='input w-full'
      required
      disabled={disabled}
    />
  </div>
);

export default TextArea;
