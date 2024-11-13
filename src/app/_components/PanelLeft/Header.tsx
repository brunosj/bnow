'use client';

// components/PanelLeftHeader.tsx
import React from 'react';
import { IoInformationCircleOutline } from 'react-icons/io5';
import { BsQuestionCircleFill } from 'react-icons/bs';

import { Page } from '../../../payload/payload-types';
import classes from './index.module.css';

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
  pages,
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
      <div className='text-lg font-bold flex flex-col leading-none'>
        <span>Birmingham</span>
        <span>NOW</span>
      </div>

      {/* Theme Switcher */}
      <div className='flex items-center gap-4'>
        <button
          onClick={onInfoClick}
          className='text-white hover:text-gray-200 transition-colors'
          aria-label='Information'
        >
          <BsQuestionCircleFill size={20} />
        </button>
      </div>
    </div>
  );
};

export default PanelLeftHeader;
