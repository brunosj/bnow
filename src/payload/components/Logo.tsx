import React from 'react';
import useTheme from '../hooks/useTheme';

const Logo = () => {
  const theme = useTheme();
  const logoSrc = theme === 'dark' ? '/logo-white.png' : '/logo-black.png';

  return (
    <div className='logo'>
      <img
        src={logoSrc}
        alt='Birmingham Now'
        style={{ maxHeight: '200px', margin: 'auto' }}
      />
    </div>
  );
};

export default Logo;
