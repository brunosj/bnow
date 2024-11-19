import React from 'react';
import useTheme from '../hooks/useTheme';
import logo from '../../../../media/images/logo-black.png';
const Logo = () => {
  const theme = useTheme();
  const logoSrc =
    theme === 'dark'
      ? '../../../../media/images/logo-white.png'
      : '../../../../media/images/logo-black.png';

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
