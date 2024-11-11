import React from 'react';
import PanelRight from '../PanelRight';
import type { Page } from '../../../payload/payload-types';

interface SidebarInfoProps {
  onClose: () => void;
  page?: Page;
}

const SidebarInfo = ({ onClose, page }: SidebarInfoProps) => (
  <PanelRight title={page?.title || 'About'} onClose={onClose}>
    <div className='space-y-6'>
      {page ? (
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
      ) : (
        <p>No content available</p>
      )}
    </div>
  </PanelRight>
);

export default SidebarInfo;
