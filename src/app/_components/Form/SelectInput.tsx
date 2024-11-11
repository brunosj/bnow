// SelectInput.tsx
import React from 'react';

interface SelectInputProps {
  id: string;
  label: string;
  value: string | null;
  option?: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  disabled?: boolean;
}

const SelectInput: React.FC<SelectInputProps> = ({
  id,
  label,
  value,
  option = 'Please choose',
  options,
  onChange,
  disabled,
}) => (
  <div className='input-container'>
    <label className='label' htmlFor={id}>
      {label}
    </label>
    <select
      id={id}
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      className='select dark:bg-lightGray bg-white'
      required
      disabled={disabled}
    >
      <option value=''>{option}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default SelectInput;
