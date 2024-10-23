// SelectInput.tsx
import React from 'react';

interface SelectInputProps {
  id: string;
  label: string;
  value: string | null;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  disabled?: boolean;
}

const SelectInput: React.FC<SelectInputProps> = ({
  id,
  label,
  value,
  options,
  onChange,
  disabled,
}) => (
  <div>
    <label className='label' htmlFor={id}>
      {label}:
    </label>
    <select
      id={id}
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      className='select'
      required
      disabled={disabled}
    >
      <option value=''>Select</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default SelectInput;
