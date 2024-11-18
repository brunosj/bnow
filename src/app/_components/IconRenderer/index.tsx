import React from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { StaticImageData } from 'next/image';

interface IconRendererProps {
  icon: StaticImageData;
  size?: number;
  className?: string;
}

const IconRenderer: React.FC<IconRendererProps> = ({
  icon,
  size = 18,
  className = '',
}) => {
  const { theme } = useTheme();

  // Apply filter based on theme
  // const filterStyle = theme === 'dark' ? 'invert(1)' : 'none';

  return (
    <div
      style={{
        width: size,
        height: size,
        position: 'relative',
        // filter: filterStyle,
      }}
      className={className}
    >
      <Image
        src={icon}
        alt='Category icon'
        fill
        style={{ objectFit: 'contain' }}
      />
    </div>
  );
};

export default IconRenderer;
