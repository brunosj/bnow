import { Marker, MapRef } from 'react-map-gl';
import CustomMarker from '../CustomMarker';
import type { Soundbite } from '../../../payload/payload-types';

interface MapMarkersProps {
  soundbites: Soundbite[];
  newLocation: { latitude: number; longitude: number } | null;
  onMarkerClick: (soundbite: Soundbite) => void;
  mapRef: React.RefObject<MapRef>;
}

const MapMarkers = ({
  soundbites,
  newLocation,
  onMarkerClick,
  mapRef,
}: MapMarkersProps) => {
  const handleMarkerClick = (soundbite: Soundbite) => {
    mapRef.current?.flyTo({
      center: [soundbite.coordinates.longitude, soundbite.coordinates.latitude],
      zoom: 15,
      duration: 1500,
    });
    onMarkerClick(soundbite);
  };

  return (
    <>
      {soundbites.map((soundbite) => (
        <Marker
          key={soundbite.id}
          latitude={soundbite.coordinates.latitude}
          longitude={soundbite.coordinates.longitude}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleMarkerClick(soundbite);
            }}
            type='button'
            style={{
              display: mapRef.current?.getZoom() >= 14 ? 'block' : 'none',
            }}
          >
            <CustomMarker category={soundbite.category} />
          </button>
        </Marker>
      ))}

      {newLocation && (
        <Marker
          latitude={newLocation.latitude}
          longitude={newLocation.longitude}
        >
          <CustomMarker category={'blank'} />
        </Marker>
      )}
    </>
  );
};

export default MapMarkers;
