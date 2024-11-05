// TextInput.tsx
import React from 'react';

interface TextInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  value,
  disabled,
  onChange,
}) => (
  <div className='input-container'>
    <label className='label' htmlFor={id}>
      {label}
    </label>
    <input
      id={id}
      type='text'
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className='input w-full bg-lightGray'
      required
      disabled={disabled}
    />
  </div>
);

export default TextInput;
