'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
  onLocationDragEnd: (lat: number, lng: number) => void;
  onInfoClick: () => void;
  isLeftPanelOpen: boolean;
  isAddingLocation: boolean;
  setIsAddingLocation: (value: boolean) => void;
}

const MapComponent = React.forwardRef<MapRef, MapComponentProps>(
  (
    {
      mapboxToken,
      soundbites,
      selectedMarker,
      newLocation,
      onAddLocation,
      onMarkerClick,
      onCenterChange,
      onLocationDragEnd,
      onInfoClick,
      isLeftPanelOpen,
      isAddingLocation,
      setIsAddingLocation,
    }: MapComponentProps,
    ref
  ) => {
    const { theme } = useTheme();
    const [mapStyle, setMapStyle] = useState(MAPBOX_THEME_LIGHT);
    const [mapLoaded, setMapLoaded] = useState(false);

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
      if (ref && 'current' in ref && ref.current) {
        const center = ref.current.getMap().getCenter();
        onCenterChange?.(center.lat, center.lng);
      }
    }, [onCenterChange, ref]);

    useEffect(() => {
      setMapStyle(theme === 'dark' ? MAPBOX_THEME_DARK : MAPBOX_THEME_LIGHT);
    }, [theme]);

    useEffect(() => {
      if (!ref || !('current' in ref) || !ref.current || !mapLoaded) return;

      const map = ref.current.getMap();

      if (map.isStyleLoaded()) {
        initializeClusters(map);
      } else {
        map.once('style.load', () => {
          initializeClusters(map);
        });
      }
    }, [mapStyle, mapLoaded, initializeClusters, ref]);

    const customCursor = `data:image/svg+xml;base64,${btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="14" fill="black"/>
      <path d="M16 9v14M9 16h14" stroke="white" stroke-width="2"/>
    </svg>
    `)}`;

    const handleMapClick = useCallback(
      (e: any) => {
        if (!ref || !('current' in ref)) return;

        const map = ref.current.getMap();
        if (map.getLayer('clusters') && map.getSource('soundbites')) {
          const features = map.queryRenderedFeatures(e.point, {
            layers: ['clusters'],
          });

          if (features?.length && !isAddingLocation) {
            const clusterId = features[0].properties.cluster_id;
            const mapboxSource = map.getSource(
              'soundbites'
            ) as mapboxgl.GeoJSONSource;

            mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
              if (err) return;

              ref.current?.flyTo({
                center: (features[0].geometry as any).coordinates,
                zoom,
              });
            });
          } else if (isAddingLocation && !features?.length) {
            onAddLocation(e);
            map.getCanvas().style.cursor = 'grab';
            setIsAddingLocation(false);
          }
        } else if (isAddingLocation) {
          onAddLocation(e);
          map.getCanvas().style.cursor = 'grab';
          setIsAddingLocation(false);
        }
      },
      [ref, isAddingLocation, onAddLocation, setIsAddingLocation]
    );

    const handleMouseMove = useCallback(
      (e: any) => {
        if (!ref || !('current' in ref)) return;

        const map = ref.current.getMap();
        let cursor = 'grab';

        if (map.getLayer('clusters')) {
          const features = map.queryRenderedFeatures(e.point, {
            layers: ['clusters'],
          });

          if (isAddingLocation) {
            cursor = `url('${customCursor}') 16 16, crosshair`;
          } else if (features?.length) {
            cursor = 'pointer';
          }
        } else if (isAddingLocation) {
          cursor = `url('${customCursor}') 16 16, crosshair`;
        }

        e.target.getCanvas().style.cursor = cursor;
      },
      [ref, isAddingLocation, customCursor]
    );

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
        ref={ref}
        onLoad={() => setMapLoaded(true)}
        onClick={handleMapClick}
        onMouseMove={handleMouseMove}
        onMove={handleMapMove}
      >
        <MapControls
          mapboxToken={mapboxToken}
          isLeftPanelOpen={isLeftPanelOpen}
          isAddingLocation={isAddingLocation}
          onInfoClick={onInfoClick}
          setIsAddingLocation={setIsAddingLocation}
        />

        <MapMarkers
          soundbites={soundbites}
          newLocation={newLocation}
          onMarkerClick={onMarkerClick}
          onLocationDragEnd={onLocationDragEnd}
          mapRef={ref as React.RefObject<MapRef>}
          selectedSoundbiteId={selectedMarker?.id}
        />
      </Map>
    );
  }
);

MapComponent.displayName = 'MapComponent';

export default MapComponent;
