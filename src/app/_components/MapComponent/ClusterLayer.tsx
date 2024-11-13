import { useCallback } from 'react';
import type { Soundbite } from '../../../payload/payload-types';

interface ClusterLayerProps {
  geojsonData: GeoJSON.FeatureCollection;
  isAddingLocation: boolean;
}

const ClusterLayer = ({ geojsonData, isAddingLocation }: ClusterLayerProps) => {
  const initializeClusters = useCallback(
    (mapInstance: mapboxgl.Map) => {
      if (mapInstance.getSource('soundbites')) {
        (mapInstance.getSource('soundbites') as mapboxgl.GeoJSONSource).setData(
          geojsonData
        );
        return;
      }

      if (!mapInstance.getLayer('clusters')) {
        mapInstance.addSource('soundbites', {
          type: 'geojson',
          data: geojsonData,
          cluster: true,
          clusterMaxZoom: 14,
          clusterRadius: 50,
        });

        mapInstance.addLayer({
          id: 'clusters',
          type: 'circle',
          source: 'soundbites',
          filter: ['has', 'point_count'],
          paint: {
            'circle-color': ['literal', 'rgba(0, 0, 0, 1)'],
            'circle-radius': [
              'step',
              ['get', 'point_count'],
              20,
              10,
              25,
              50,
              30,
            ],
            'circle-stroke-color': ['literal', 'rgba(255, 255, 255, 1)'],
            'circle-stroke-width': ['literal', 4],
            'circle-opacity': ['step', ['zoom'], 1, 14, 0],
            'circle-stroke-opacity': ['step', ['zoom'], 1, 14, 0],
          },
        });

        mapInstance.addLayer({
          id: 'cluster-count',
          type: 'symbol',
          source: 'soundbites',
          filter: ['has', 'point_count'],
          layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 14,
            'text-allow-overlap': false,
            'symbol-placement': 'point',
          },
          paint: {
            'text-color': ['literal', '#ffffff'],
            'text-opacity': ['step', ['zoom'], 1, 14, 0],
          },
        });
      }
    },
    [geojsonData]
  );

  return { initializeClusters };
};

export default ClusterLayer;
