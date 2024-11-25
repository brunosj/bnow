// TextInput.tsx
import React from 'react';

interface TextInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  value,
  disabled,
  onChange,
  placeholder,
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
      className='input w-full'
      required
      disabled={disabled}
      placeholder={placeholder}
    />
  </div>
);

export default TextInput;
