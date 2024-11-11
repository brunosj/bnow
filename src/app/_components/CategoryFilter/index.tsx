// components/CategoryFilter.tsx
import React from 'react';
import CustomMarker from '../CustomMarker';
import categoryStyles from '../CategoryStyles'; // Import category styles
import type { SoundbiteCategory } from '../../_utilities/soundbitesCategories';
import { generateLabel } from '../../_utilities/soundbitesCategories';

// Define the props interface
interface CategoryFilterProps {
  categories: SoundbiteCategory[];
  selectedCategories: SoundbiteCategory[]; // Keep as SoundbiteCategory[]
  onSelectCategory: (categories: SoundbiteCategory[]) => void; // Update to accept SoundbiteCategory[]
}

// Function to get the background color based on the selected category
const getCategoryColor = (category: string, isActive: boolean) => {
  // Default color when the category is not active
  const defaultColor = 'bg-gray';

  // Get the color for the active category from categoryStyles
  const categoryColor =
    categoryStyles[category as keyof typeof categoryStyles]?.color;

  return isActive && categoryColor ? categoryColor : defaultColor;
};

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategories,
  onSelectCategory,
}) => {
  // Toggle category selection
  const toggleCategory = (category: SoundbiteCategory) => {
    if (selectedCategories.includes(category)) {
      // Remove the category if it is already selected
      onSelectCategory(selectedCategories.filter((cat) => cat !== category));
    } else {
      // Add the category if it is not selected
      onSelectCategory([...selectedCategories, category]);
    }
  };

  return (
    <div className='flex flex-wrap gap-x-4 gap-y-3'>
      {/* Render a button for each category */}
      {categories.map((category) => (
        <button
          key={category}
          className={`flex items-center rounded-md`}
          onClick={() => toggleCategory(category)} // Toggle the category
        >
          {/* <div
            className={`flex items-center ${
              selectedCategories.includes(category) ? 'border-white ' : ''
            } rounded-full`}
          >
            <CustomMarker category={category} />
          </div> */}
          <span
            className={`px-3 py-1 text-sm font-medium rounded-md ${
              selectedCategories.includes(category)
                ? 'border-white border-[1px] opacity-75'
                : ''
            }`}
            style={{
              backgroundColor: selectedCategories.includes(category)
                ? 'transparent'
                : 'white',
              color: selectedCategories.includes(category) ? 'white' : 'black',
            }}
          >
            <span
              className='text-sm'
              style={{
                color: selectedCategories.includes(category)
                  ? 'white'
                  : getCategoryColor(category, true),
              }}
            >
              {generateLabel(category)}
            </span>
          </span>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
