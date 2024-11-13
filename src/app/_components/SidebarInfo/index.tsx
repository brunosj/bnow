import React from 'react';
import PanelRight from '../PanelRight';
import type { Page } from '../../../payload/payload-types';
import { RichText } from '../RichText';

interface SidebarInfoProps {
  onClose: () => void;
  page?: Page;
  setIsAddingLocation: (value: boolean) => void;
}

const SidebarInfo = ({
  onClose,
  page,
  setIsAddingLocation,
}: SidebarInfoProps) => (
  <PanelRight
    title={page?.title || 'About'}
    onClose={onClose}
    setIsAddingLocation={setIsAddingLocation}
  >
    <div className='space-y-6'>
      {page ? (
        <div>
          <RichText content={page.content} className='richText' />
        </div>
      ) : (
        <p>No content available</p>
      )}
    </div>
  </PanelRight>
);

export default SidebarInfo;
