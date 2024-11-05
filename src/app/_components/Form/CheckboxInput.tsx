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
  <div className='input-container pt-6'>
    <label className='flex items-center cursor-pointer'>
      <input
        type='checkbox'
        checked={checked}
        onChange={onChange}
        required
        disabled={disabled}
        className='checkbox sr-only' // Hide the default checkbox
      />
      <div className={`checkbox-custom ${checked ? 'checked' : ''}`}>
        {checked && <span className='x-mark'>X</span>}
      </div>
      <span className='ml-3 text-xs'>{label}</span>
    </label>
  </div>
);

export default CheckboxInput;
