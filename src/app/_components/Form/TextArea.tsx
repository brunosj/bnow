// TextArea.tsx
import React from 'react';

interface TextAreaProps {
  id: string;
  label: string;
  value: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
}

const TextArea: React.FC<TextAreaProps> = ({
  id,
  label,
  disabled,
  value,
  onChange,
  placeholder,
  maxLength,
}) => (
  <div className='input-container'>
    <label className='label' htmlFor={id}>
      {label}
    </label>
    <textarea
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className='input w-full p-2'
      required
      disabled={disabled}
      placeholder={placeholder}
      maxLength={maxLength}
    />
    {maxLength && (
      <div className='mt-2 text-right text-xs text-lightGray dark:text-lighterGray opacity-50'>
        {value.length}/{maxLength} characters
      </div>
    )}
  </div>
);

export default TextArea;
