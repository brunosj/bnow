'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useTheme } from 'next-themes';
import Map, { MapRef, Map as MapType } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MAPBOX_THEME_DARK, MAPBOX_THEME_LIGHT } from '../../constants';
import ClusterLayer from './ClusterLayer';
import MapMarkers from './MapMarkers';
import MapControls from './MapControls';
import type { Soundbite } from '../../../payload/payload-types';

interface MapComponentProps {
  mapboxToken: string;
  soundbites: Soundbite[];
  selectedMarker: Soundbite | null;
  newLocation: { latitude: number; longitude: number } | null;
  onAddLocation: (e: { lngLat: { lat: number; lng: number } }) => void;
  onMarkerClick: (soundbite: Soundbite) => void;
  onCenterChange: (lat: number, lng: number) => void;
  onInfoClick: () => void;
  isLeftPanelOpen: boolean;
  isAddingLocation: boolean;
  setIsAddingLocation: (value: boolean) => void;
}

const MapComponent = ({
  mapboxToken,
  soundbites,
  selectedMarker,
  newLocation,
  onAddLocation,
  onMarkerClick,
  onCenterChange,
  onInfoClick,
  isLeftPanelOpen,
  isAddingLocation,
  setIsAddingLocation,
}: MapComponentProps) => {
  const [map, setMap] = useState<MapRef | null>(null);
  const mapRef = useRef<MapRef | null>(null);
  const { theme } = useTheme();
  const [mapStyle, setMapStyle] = useState(MAPBOX_THEME_LIGHT);

  const geojsonData = useMemo(
    () => ({
      type: 'FeatureCollection' as const,
      features: soundbites.map((soundbite) => ({
        type: 'Feature' as const,
        properties: {
          id: soundbite.id,
          category: soundbite.category,
        },
        geometry: {
          type: 'Point' as const,
          coordinates: [
            soundbite.coordinates.longitude,
            soundbite.coordinates.latitude,
          ],
        },
      })),
    }),
    [soundbites]
  );

  const { initializeClusters } = ClusterLayer({
    geojsonData,
    isAddingLocation,
  });

  const handleMapMove = useCallback(() => {
    if (mapRef.current) {
      const center = mapRef.current.getMap().getCenter();
      onCenterChange?.(center.lat, center.lng);
    }
  }, [onCenterChange]);

  useEffect(() => {
    setMapStyle(theme === 'dark' ? MAPBOX_THEME_DARK : MAPBOX_THEME_LIGHT);
  }, [theme]);

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current.getMap();
      map.once('style.load', () => {
        initializeClusters(map);
      });
    }
  }, [mapStyle, initializeClusters]);

  return (
    <Map
      mapboxAccessToken={mapboxToken}
      mapStyle={mapStyle}
      initialViewState={{
        latitude: 52.489471,
        longitude: -1.898575,
        zoom: 12,
      }}
      interactiveLayerIds={['clusters']}
      ref={(instance) => {
        if (instance && !mapRef.current) {
          mapRef.current = instance;
          setMap(instance);
        }
      }}
      onClick={(e) => {
        const features = mapRef.current
          ?.getMap()
          .queryRenderedFeatures(e.point, {
            layers: ['clusters'],
          });

        if (features?.length && !isAddingLocation) {
          const clusterId = features[0].properties.cluster_id;
          const mapboxSource = mapRef.current
            ?.getMap()
            .getSource('soundbites') as mapboxgl.GeoJSONSource;

          mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) return;

            mapRef.current?.flyTo({
              center: (features[0].geometry as any).coordinates,
              zoom,
            });
          });
        } else if (isAddingLocation) {
          if (!features?.length) {
            onAddLocation(e);
          }
        }
      }}
      onMouseMove={(e) => {
        const features = mapRef.current
          ?.getMap()
          .queryRenderedFeatures(e.point, {
            layers: ['clusters'],
          });

        e.target.getCanvas().style.cursor = isAddingLocation
          ? 'crosshair'
          : features?.length
            ? 'pointer'
            : 'grab';
      }}
      onMove={handleMapMove}
      onLoad={(e) => {
        initializeClusters(e.target);
      }}
    >
      <MapControls
        isLeftPanelOpen={isLeftPanelOpen}
        isAddingLocation={isAddingLocation}
        onInfoClick={onInfoClick}
        setIsAddingLocation={setIsAddingLocation}
      />

      <MapMarkers
        soundbites={soundbites}
        newLocation={newLocation}
        onMarkerClick={onMarkerClick}
        mapRef={mapRef as React.RefObject<MapRef>}
      />
    </Map>
  );
};

export default MapComponent;
