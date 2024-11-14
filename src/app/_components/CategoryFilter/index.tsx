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
    <section className='space-y-3'>
      <p className='font-semibold text-white'>Categories</p>

      <div className='flex flex-wrap gap-x-4 gap-y-3'>
        {/* Render a button for each category */}
        {categories.map((category) => (
          <button
            key={category}
            className={`flex items-center`}
            onClick={() => toggleCategory(category)}
          >
            <span
              className={`rounded-3xl px-3 py-1 text-sm  border-white border-[1px]  ${
                selectedCategories.includes(category)
                  ? 'opacity-35 '
                  : 'opacity-100'
              }`}
            >
              {generateLabel(category)}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategoryFilter;
