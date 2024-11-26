import React from 'react';
import PanelRight from '../PanelRight';
import type { Page } from '../../../payload/payload-types';
import { RichText } from '../RichText';

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
}: SidebarInfoProps) => (
  <PanelRight
    onClose={onClose}
    setIsAddingLocation={setIsAddingLocation}
    isOpen={true}
  >
    <div className='space-y-6'>
      {page ? (
        <div className='space-y-6'>
          <h2 className='font-semibold'>{page.title}</h2>
          <RichText content={page.content} className='richText list-disc' />
        </div>
      ) : (
        <p>No content available</p>
      )}
    </div>
  </PanelRight>
);

export default SidebarInfo;
