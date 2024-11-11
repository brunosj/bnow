'use client';

// components/SidebarHeader.tsx
import React from 'react';
import { IoMenu, IoClose, IoInformationCircleOutline } from 'react-icons/io5';
import ThemeSwitcher from '../ThemeSwitcher';
import { Page } from '../../../payload/payload-types';

interface SidebarHeaderProps {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  onInfoClick: () => void;
  pages: Page[];
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  isMenuOpen,
  onToggleMenu,
  onInfoClick,
  pages,
}) => {
  return (
    <div className='flex items-center justify-between p-4 bg-pri text-white shadow-md'>
      <button onClick={onToggleMenu} aria-label='Toggle menu'>
        {isMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
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
          <IoInformationCircleOutline size={24} />
        </button>
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default SidebarHeader;
