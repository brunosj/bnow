// components/SidebarLeft.tsx
import React, { useState } from 'react';
import SoundbiteCard from '../SoundbiteCard';
import type { Soundbite, Page, Menu } from '../../../payload/payload-types';
import { IoChevronForward } from 'react-icons/io5';
import CategoryFilter from '../CategoryFilter';
import type { SoundbiteCategory } from '../../_utilities/soundbitesCategories';
import SidebarHeader from '../SidebarLeftHeader';

interface PanelLeftProps {
  soundbites: Soundbite[];
  onClose: () => void;
  onSelectSoundbite: (soundbite: Soundbite) => void;
  isOpen: boolean;
  onToggle: () => void;
  categories: SoundbiteCategory[];
  selectedCategories: SoundbiteCategory[];
  onSelectCategory: (categories: SoundbiteCategory[]) => void;
  onInfoClick: (slug: string) => void;
  pages: Page[];
  menu: Menu;
}

const PanelLeft: React.FC<PanelLeftProps> = ({
  soundbites,
  onSelectSoundbite,
  isOpen,
  onToggle,
  categories,
  selectedCategories,
  onSelectCategory,
  onInfoClick,
  pages,
  menu,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenuPanel = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handlePageClick = (page: Page) => {
    onInfoClick(page.slug);
    // setIsMenuOpen(false);
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-full shadow-lg z-30 transition-transform duration-300 w-1/5  ${
        isOpen ? 'translate-x-0' : '-translate-x-[98%]'
      } `}
    >
      <SidebarHeader
        isMenuOpen={isMenuOpen}
        onToggleMenu={toggleMenuPanel}
        onInfoClick={() =>
          handlePageClick(pages.find((p) => p.slug === 'how-to-use-the-site')!)
        }
        pages={pages}
      />

      <div className='flex flex-col h-full bg-pri relative'>
        {isMenuOpen ? (
          <div className='p-6 text-white'>
            <ul className='space-y-3'>
              {menu.navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() =>
                      handlePageClick(
                        pages.find(
                          (p) => p.slug === item.link.reference.value.slug
                        )!
                      )
                    }
                    className=''
                  >
                    {item.link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className='h-full flex flex-col'>
            <div className='p-6 space-y-3 flex-shrink-0'>
              <p className='font-semibold text-white'>Categories</p>
              <CategoryFilter
                categories={categories}
                selectedCategories={selectedCategories}
                onSelectCategory={onSelectCategory}
              />
            </div>
            <div className='bg-white dark:bg-black rounded-t-[3rem] flex-1 overflow-hidden pt-6'>
              <div className='h-full pb-24 overflow-y-auto px-6   scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray'>
                {selectedCategories.length === categories.length ? (
                  <p className='text-gray-500 text-center mt-24'>
                    Please select categories to view Soundbites
                  </p>
                ) : (
                  <ul className='space-y-3 '>
                    {soundbites.map((soundbite) => (
                      <li
                        key={soundbite.id}
                        className='rounded-3xl shadow-lg p-2'
                      >
                        <SoundbiteCard
                          soundbite={soundbite}
                          onClick={() => onSelectSoundbite(soundbite)}
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}

        <button
          onClick={onToggle}
          className='absolute right-[-20px] top-1/5 transform  bg-pri rounded-full p-2 shadow-md flex items-center justify-center text-white'
          // style={{ top: '50%', transform: 'translateY(-50%)', right: '-10px' }}
        >
          <IoChevronForward
            className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </div>
    </aside>
  );
};

export default PanelLeft;
