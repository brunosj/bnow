// components/SidebarMenu.tsx
import React from 'react';
import ThemeSwitcher from '../ThemeSwitcher';
import type { Page, Menu } from '../../../payload/payload-types';

interface PanelLeftMenuProps {
  menu: Menu;
  pages: Page[];
  onInfoClick: (slug: string) => void;
}

const PanelLeftMenu: React.FC<PanelLeftMenuProps> = ({
  menu,
  pages,
  onInfoClick,
}) => {
  const handlePageClick = (slug: string) => {
    onInfoClick(slug);
  };

  return (
    <div className='fixed inset-0 md:relative  md:bg-transparent z-30 md:z-auto pt-16 bg-black'>
      <div className='p-4 lg:p-6 text-white space-y-6 h-full'>
        <ul className='space-y-3'>
          {menu.navItems.map((item) => (
            <li key={item.id}>
              <button
                className='text-lg md:text-base py-2 md:py-0'
                onClick={() =>
                  handlePageClick(
                    (item.link.reference.value as { slug: string }).slug
                  )
                }
              >
                {item.link.label}
              </button>
            </li>
          ))}
        </ul>
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default PanelLeftMenu;
