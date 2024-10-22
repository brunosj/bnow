// src/utils/categories.ts

export type SoundbiteCategory =
  | 'oral_history'
  | 'interview'
  | 'field_recording'
  | 'soundscapes';

export const generateLabel = (value: SoundbiteCategory): string => {
  if (value === null) return 'Select';
  return value
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const soundbiteCategoryOptions: {
  value: SoundbiteCategory;
  label: string;
}[] = [
  { value: null, label: generateLabel(null) },
  { value: 'oral_history', label: generateLabel('oral_history') },
  { value: 'interview', label: generateLabel('interview') },
  { value: 'field_recording', label: generateLabel('field_recording') },
  { value: 'soundscapes', label: generateLabel('soundscapes') },
];
