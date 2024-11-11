'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from 'next-themes';
import type { Soundbite } from '../../../payload/payload-types';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import CustomMarker from '../CustomMarker';
import { SearchBoxComponent } from '../SearchBox';
import { MAPBOX_THEME_DARK, MAPBOX_THEME_LIGHT } from '../../constants';

interface MapComponentProps {
  mapboxToken: string;
  soundbites: Soundbite[];
  locs: { latitude: number; longitude: number }[];
  selectedMarker: Soundbite | null;
  newLocation: { latitude: number; longitude: number } | null;
  onAddLocation: (e: { lngLat: { lat: number; lng: number } }) => void;
  onMarkerClick: (soundbite: Soundbite) => void;
  onMarkerSelect: (
    loc: { latitude: number; longitude: number },
    index: number
  ) => void;
  onPopupClose: () => void;
  onCenterChange: (lat: number, lng: number) => void;
  onLocationDragEnd?: (lat: number, lng: number) => void;
}

const MapComponent = ({
  mapboxToken,
  soundbites,
  locs,
  selectedMarker,
  newLocation,
  onAddLocation,
  onMarkerClick,
  onMarkerSelect,
  onPopupClose,
  onCenterChange,
  onLocationDragEnd,
}: MapComponentProps) => {
  const [map, setMap] = useState<any>(null);
  const mapRef = useRef<any>(null);
  const { theme } = useTheme();
  const [mapStyle, setMapStyle] = useState(MAPBOX_THEME_LIGHT);

  useEffect(() => {
    setMapStyle(theme === 'dark' ? MAPBOX_THEME_DARK : MAPBOX_THEME_LIGHT);
  }, [theme]);

  useEffect(() => {
    if (selectedMarker && map) {
      map.flyTo({
        center: [
          selectedMarker.coordinates.longitude,
          selectedMarker.coordinates.latitude,
        ],
        zoom: 15,
        essential: true,
      });
    }
  }, [selectedMarker, map]);

  const handleMapMove = useCallback(() => {
    if (mapRef.current) {
      const center = mapRef.current.getCenter();
      onCenterChange(center.lat, center.lng);
    }
  }, [onCenterChange]);

  // Handle drag end for draggable markers
  const handleDragEnd = (e: any) => {
    const { lngLat } = e;
    if (onLocationDragEnd) {
      onLocationDragEnd(lngLat.lat, lngLat.lng);
    }
  };

  return (
    <>
      <Map
        mapboxAccessToken={mapboxToken}
        mapStyle={mapStyle}
        initialViewState={{
          latitude: 52.489471,
          longitude: -1.898575,
          zoom: 12,
        }}
        ref={(instance) => {
          mapRef.current = instance;
          setMap(instance);
        }}
        onClick={(e) => onAddLocation(e)}
        onMouseOver={(e) => (e.target.getCanvas().style.cursor = 'crosshair')}
        onMove={handleMapMove}
      >
        <NavigationControl position='bottom-right' />

        {/* <div className='w-1/4 p-6 ml-auto'>
          <SearchBoxComponent />
        </div> */}

        {soundbites.map((soundbite) => (
          <Marker
            key={soundbite.id}
            latitude={soundbite.coordinates.latitude}
            longitude={soundbite.coordinates.longitude}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMarkerClick(soundbite);
              }}
              type='button'
            >
              <CustomMarker category={soundbite.category} />
            </button>
          </Marker>
        ))}

        {/* Render the new location marker if available */}
        {newLocation && (
          <Marker
            latitude={newLocation.latitude}
            longitude={newLocation.longitude}
            // draggable
            // onDragEnd={handleDragEnd}
          >
            <CustomMarker category={'blank'} />
          </Marker>
        )}
      </Map>
    </>
  );
};

export default MapComponent;
