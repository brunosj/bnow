import React from 'react';
import useTheme from '../hooks/useTheme';

const Icon = () => {
  const theme = useTheme();
  const logoSrc =
    theme === 'dark' ? `/media/logo-circle.png` : `/media/logo-circle.png`;

  return (
    <div className='icon'>
      <img
        src={logoSrc}
        alt='Birmingham Now'
        style={{ maxHeight: '25px', margin: 'auto' }}
      />
    </div>
  );
};

export default Icon;
