import React, { useState } from 'react';

interface FileInputProps {
  id: string;
  label: string;
  onChange: (file: File | null) => void;
  disabled?: boolean;
  placeholder?: string;
}

const FileInput: React.FC<FileInputProps> = ({
  id,
  label,
  disabled,
  onChange,
  placeholder = 'No file chosen',
}) => {
  const [fileName, setFileName] = useState<string>(placeholder);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    onChange(file);
    setFileName(file ? file.name : placeholder);
  };

  return (
    <div className='input-container'>
      <label className='label' htmlFor={id}>
        {label}
      </label>

      <div className='file-input-wrapper'>
        <input
          id={id}
          type='file'
          onChange={handleFileChange}
          className='file-input'
          required
          disabled={disabled}
        />
        <label htmlFor={id} className='custom-file-input'>
          Choose file
        </label>
        <span className='file-placeholder'>{fileName}</span>
      </div>
    </div>
  );
};

export default FileInput;
