import React from 'react';
import PanelRight from '../PanelRight';
import type { Category, Page } from '../../../payload/payload-types';
import { RichText } from '../RichText';
import CategoryList from './CategoryList';

interface SidebarInfoProps {
  onClose: () => void;
  page?: Page;
  setIsAddingLocation: (value: boolean) => void;
  isOpen: boolean;
}

const SidebarInfo = ({
  onClose,
  page,
  setIsAddingLocation,
}: SidebarInfoProps) => {
  return (
    <PanelRight
      onClose={onClose}
      setIsAddingLocation={setIsAddingLocation}
      isOpen={true}
    >
      <div className='space-y-6'>
        {page ? (
          <div className='space-y-6'>
            <h2 className='font-semibold'>{page.title}</h2>
            <RichText content={page.content} className='richText' />
            {page.category && (
              <CategoryList categories={page.category as Category[]} />
            )}
          </div>
        ) : (
          <p>No content available</p>
        )}
      </div>
    </PanelRight>
  );
};

export default SidebarInfo;
