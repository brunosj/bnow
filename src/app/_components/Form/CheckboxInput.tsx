// CheckboxInput.tsx
import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa'; // Import the checkmark icon

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
  <div className='input-container pt-3'>
    <label className='flex items-center cursor-pointer'>
      <input
        type='checkbox'
        checked={checked}
        onChange={onChange}
        required
        disabled={disabled}
        className='checkbox sr-only'
      />
      <div className={`checkbox-custom ${checked ? 'checked' : ''}`}>
        {checked && <FaCheck className='text-bnowGreen' />}
      </div>
      <span className='ml-3 text-xs'>{label}</span>
    </label>
  </div>
);

export default CheckboxInput;
