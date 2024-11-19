'use client';

import { useEffect, useRef, useState } from 'react';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { BIRMINGHAM_BOUNDARIES } from '../../_utilities/isWithinBirmingham';
import { Marker } from 'react-map-gl';
import { useMap } from 'react-map-gl';

type SearchBoxProps = {
  mapboxToken: string;
  position?: string;
};

export default function SearchBox({
  mapboxToken,
  // position = 'top-left',
}: SearchBoxProps) {
  const geocoderContainerRef = useRef<HTMLDivElement>(null);
  const [searchResult, setSearchResult] = useState<{
    longitude: number;
    latitude: number;
  } | null>(null);

  // Get the map instance
  const { current: map } = useMap();

  useEffect(() => {
    if (!geocoderContainerRef.current || !map) return;

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxToken,
      marker: false,
      placeholder: 'Search by area or post code...',
      bbox: [
        BIRMINGHAM_BOUNDARIES.minLng,
        BIRMINGHAM_BOUNDARIES.minLat,
        BIRMINGHAM_BOUNDARIES.maxLng,
        BIRMINGHAM_BOUNDARIES.maxLat,
      ],
      proximity: {
        longitude: -1.898575,
        latitude: 52.489471,
      },
      countries: 'gb',
      types: 'place,poi,address,postcode,neighborhood,district',
      language: 'en-GB',
    });

    geocoder.addTo(geocoderContainerRef.current);

    // Handle search results
    geocoder.on('result', (e) => {
      const [lng, lat] = e.result.center;
      setSearchResult({ longitude: lng, latitude: lat });

      // Use the map instance to fly to the location
      map.flyTo({
        center: [lng, lat],
        zoom: 15,
        speed: 1.2,
        curve: 1,
        easing: (t) => t,
      });
    });

    // Clear marker when search is cleared
    geocoder.on('clear', () => {
      setSearchResult(null);
    });

    return () => {
      geocoder.onRemove();
    };
  }, [mapboxToken, map]);

  return (
    <>
      <div ref={geocoderContainerRef} className='geocoder-container' />
      {searchResult && (
        <Marker
          longitude={searchResult.longitude}
          latitude={searchResult.latitude}
          color='#FF0000'
          scale={0.8}
        />
      )}
    </>
  );
}
