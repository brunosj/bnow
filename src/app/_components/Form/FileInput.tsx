// FileInput.tsx
import React from 'react';

interface FileInputProps {
  id: string;
  label: string;
  onChange: (file: File | null) => void;
  disabled?: boolean;
}

const FileInput: React.FC<FileInputProps> = ({
  id,
  label,
  disabled,
  onChange,
}) => (
  <div>
    <label className='label' htmlFor={id}>
      {label}:
    </label>
    <input
      id={id}
      type='file'
      onChange={(e) => onChange(e.target.files ? e.target.files[0] : null)}
      className='file-input'
      required
      disabled={disabled}
    />
  </div>
);

export default FileInput;
