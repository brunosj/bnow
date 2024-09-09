import React from 'react';
import useTheme from '../hooks/useTheme';

const Logo = () => {
  const theme = useTheme();
  const logoSrc =
    theme === 'dark' ? `/media/logo-white.png` : `/media/logo-black.png`;

  return (
    <div className='logo'>
      <img src={logoSrc} alt='Birmingham Now' />
    </div>
  );
};

export default Logo;
