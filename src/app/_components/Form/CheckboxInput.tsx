// CheckboxInput.tsx
import React from 'react';

interface CheckboxInputProps {
  checked: boolean;
  onChange: () => void;
  label: string;
  disabled?: boolean;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({
  label,
  checked,
  disabled,
  onChange,
}) => (
  <div className='mt-4'>
    <label>
      <input
        type='checkbox'
        checked={checked}
        onChange={onChange}
        required
        disabled={disabled}
      />
      <span className='ml-2'>{label}</span>
    </label>
  </div>
);

export default CheckboxInput;
