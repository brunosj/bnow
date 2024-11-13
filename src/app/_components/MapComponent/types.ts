import type { Soundbite } from '../../../payload/payload-types';

export interface MapComponentProps {
  mapboxToken: string;
  soundbites: Soundbite[];
  selectedMarker: Soundbite | null;
  newLocation: { latitude: number; longitude: number } | null;
  onAddLocation: (e: { lngLat: { lat: number; lng: number } }) => void;
  onMarkerClick: (soundbite: Soundbite) => void;
  onCenterChange: (lat: number, lng: number) => void;
  onInfoClick: () => void;
  isLeftPanelOpen: boolean;
}
