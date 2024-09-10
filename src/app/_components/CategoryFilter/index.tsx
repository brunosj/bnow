// components/CategoryFilter.tsx
import React from 'react';
import CustomMarker from '../CustomMarker';
import categoryStyles from '../CategoryStyles'; // Import category styles

// Define the props interface
interface CategoryFilterProps {
  categories: ('music' | 'speech' | 'sound_effects')[];
  selectedCategory: 'music' | 'speech' | 'sound_effects' | 'blank' | null;
  onSelectCategory: (
    category: 'music' | 'speech' | 'sound_effects' | 'blank' | null
  ) => void;
}

// Function to get the background color based on the selected category
const getCategoryColor = (category: string, isActive: boolean) => {
  // Default color when the category is not active
  const defaultColor = 'bg-gray-200';

  // Get the color for the active category from categoryStyles
  const categoryColor =
    categoryStyles[category as keyof typeof categoryStyles]?.color;

  return isActive && categoryColor ? categoryColor : defaultColor;
};

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const blankCategoryColor = categoryStyles.blank.color;

  return (
    <div className='fixed top-20 left-0 right-0 z-10 flex items-center justify-between p-4 rounded-md max-w-fit mx-auto bg-opacity-95 text-center space-x-4'>
      {/* Button to show all categories, using the blank category style */}
      <button
        className={`flex items-center py-1 rounded-md `}
        onClick={() => onSelectCategory(null)}
      >
        <div
          className={`flex items-center ${
            selectedCategory === null ? 'border-white border-2' : ''
          } rounded-full`}
        >
          {/* Use the CustomMarker with the blank category */}
          <CustomMarker category='blank' />
        </div>
        <span
          className={`-ml-2 px-2 text-sm font-medium rounded-md ${
            selectedCategory === 'blank' ? 'border-white border-2' : ''
          }`}
          style={{
            backgroundColor: getCategoryColor('blank', true),
          }}
        >
          <span className='ml-2 text-black font-mono'>all</span>
        </span>{' '}
      </button>

      {/* Render a button for each category */}
      {categories.map((category) => (
        <button
          key={category}
          className={`flex items-center py-1 rounded-md `}
          onClick={() => onSelectCategory(category)}
        >
          <div
            className={`flex items-center ${
              selectedCategory === category ? 'border-white border-2' : ''
            } rounded-full`}
          >
            <CustomMarker category={category} />
          </div>
          <span
            className={`-ml-2 px-2 text-sm font-medium rounded-md ${
              selectedCategory === category ? 'border-white border-2' : ''
            }`}
            style={{
              backgroundColor: getCategoryColor(category, true),
            }}
          >
            <span className='ml-2 text-black font-mono'>{category}</span>
          </span>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
