import { Marker, MapRef } from 'react-map-gl';
import CustomMarker from '../CustomMarker';
import type { Soundbite } from '../../../payload/payload-types';
import { memo, useCallback } from 'react';

interface MapMarkersProps {
  soundbites: Soundbite[];
  newLocation: { latitude: number; longitude: number } | null;
  onMarkerClick: (soundbite: Soundbite) => void;
  mapRef: React.RefObject<MapRef>;
  selectedSoundbiteId?: string;
  onLocationDragEnd: (lat: number, lng: number) => void;
  onLocationDrag: (lat: number, lng: number) => void;
}

const MapMarker = memo(
  ({
    soundbite,
    onMarkerClick,
    mapRef,
    isSelected,
  }: {
    soundbite: Soundbite;
    onMarkerClick: (soundbite: Soundbite) => void;
    mapRef: React.RefObject<MapRef>;
    isSelected: boolean;
  }) => {
    const handleClick = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        onMarkerClick(soundbite);
      },
      [onMarkerClick, soundbite]
    );

    return (
      <Marker
        latitude={soundbite.coordinates.latitude}
        longitude={soundbite.coordinates.longitude}
      >
        <button
          onClick={handleClick}
          type='button'
          style={{
            display: mapRef.current?.getZoom() >= 14 ? 'block' : 'none',
          }}
        >
          <CustomMarker category={soundbite.category} isSelected={isSelected} />
        </button>
      </Marker>
    );
  }
);

MapMarker.displayName = 'MapMarker';

const MapMarkers = memo(
  ({
    soundbites,
    newLocation,
    onMarkerClick,
    mapRef,
    selectedSoundbiteId,
    onLocationDragEnd,
    onLocationDrag,
  }: MapMarkersProps) => {
    return (
      <>
        {soundbites.map((soundbite) => (
          <MapMarker
            key={soundbite.id}
            soundbite={soundbite}
            onMarkerClick={onMarkerClick}
            mapRef={mapRef}
            isSelected={selectedSoundbiteId === soundbite.id}
          />
        ))}

        {newLocation && (
          <Marker
            latitude={newLocation.latitude}
            longitude={newLocation.longitude}
            draggable
            onDrag={(e) => onLocationDrag(e.lngLat.lat, e.lngLat.lng)}
            onDragEnd={(e) => onLocationDragEnd(e.lngLat.lat, e.lngLat.lng)}
          >
            <CustomMarker category={'blank'} />
          </Marker>
        )}
      </>
    );
  }
);

MapMarkers.displayName = 'MapMarkers';

export default MapMarkers;
