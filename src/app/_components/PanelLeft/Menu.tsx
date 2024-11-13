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
    <div className='p-6 text-white space-y-6 bg-black h-full'>
      <ul className='space-y-3'>
        {menu.navItems.map((item) => (
          <li key={item.id}>
            <button
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
  );
};

export default PanelLeftMenu;
