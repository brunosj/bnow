import React from 'react';
import IconRenderer from '../IconRenderer';

import type { Category, Image } from '../../../payload/payload-types';

interface CategoryListProps {
  categories: Category[];
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  return (
    <ul className='list-none space-y-6'>
      {categories.map((category) => {
        return (
          <li key={category.id} className='space-y-3'>
            <div className='flex items-center'>
              <div
                className={`relative w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-50 transition-all duration-300 shrink-0 border-black dark:border-white order-[1px] `}
                style={{ backgroundColor: `${category.color}` }}
              >
                <div className='relative z-10'>
                  <IconRenderer
                    iconSrc={
                      typeof category.icon === 'string'
                        ? category.icon
                        : category.icon.url
                    }
                    size={24}
                  />
                </div>
              </div>

              <h4 className='text-sm lg:text-lg ml-5'>{category.title}</h4>
            </div>
            <p>{category.description}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default CategoryList;
