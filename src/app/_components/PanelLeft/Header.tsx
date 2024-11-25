'use client';

// components/PanelLeftHeader.tsx
import React from 'react';
import LogoFull from '../../_assets/birmingham-now-logo-full.svg';
import { Page } from '../../../payload/payload-types';
import classes from './index.module.css';
import Image from 'next/image';
import InfoIcon from '../../_assets/icons/info-icon.svg';

interface PanelLeftHeaderProps {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  onInfoClick: () => void;
  pages: Page[];
}

const PanelLeftHeader: React.FC<PanelLeftHeaderProps> = ({
  isMenuOpen,
  onToggleMenu,
  onInfoClick,
}) => {
  return (
    <div className='flex items-center justify-between p-4 bg-black text-white shadow-md'>
      <button
        onClick={onToggleMenu}
        className={`${classes.hamburger} ${isMenuOpen ? classes.active : ''}`}
        aria-label='Toggle menu'
      >
        <span className={classes.line}></span>
        <span className={classes.line}></span>
        <span className={classes.line}></span>
      </button>

      {/* Logo */}
      <Image
        src={LogoFull}
        alt='Birmingham NOW Logo'
        className='w-32  object-contain'
      />

      {/* Theme Switcher */}
      {/* Theme Switcher */}
      <div className='flex items-center gap-4'>
        <button
          onClick={onInfoClick}
          className='text-white hover:text-gray-200 transition-colors'
          aria-label='Information'
        >
          {/* <BsQuestionCircleFill size={20} /> */}
          <Image src={InfoIcon} alt='Info Icon' className='w-6 h-6' />
        </button>
      </div>
    </div>
  );
};

export default PanelLeftHeader;
