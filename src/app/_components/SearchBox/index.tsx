import { SearchBox } from '@mapbox/search-js-react';
import { useState } from 'react';

export function SearchBoxComponent() {
  const [value, setValue] = useState('');
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

  const handleChange = (d) => {
    setValue(d);
  };
  return (
    //@ts-ignore
    <SearchBox
      options={{
        proximity: {
          lng: -122.431297,
          lat: 37.773972,
        },
      }}
      value={value}
      onChange={handleChange}
      accessToken={mapboxToken}
    />
  );
}
