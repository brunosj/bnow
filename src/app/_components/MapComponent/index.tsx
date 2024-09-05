'use client';

import { useState } from 'react';
import type { Soundbite } from '../../../payload/payload-types';
import Map, {
  Marker,
  Popup,
  NavigationControl,
  GeolocateControl,
} from 'react-map-gl';
import { HiLocationMarker } from 'react-icons/hi';
import 'mapbox-gl/dist/mapbox-gl.css';
import classes from './index.module.css';
import PopupInfo from '../PopUpInfo';

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
  onRemoveLocation: (index: number) => void;
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
  onRemoveLocation,
}: MapComponentProps) => (
  <Map
    mapboxAccessToken={mapboxToken}
    mapStyle='mapbox://styles/mapbox/streets-v12'
    initialViewState={{
      latitude: 52.489471,
      longitude: -1.898575,
      zoom: 10,
    }}
    onClick={(e) => onAddLocation(e)}
    onMouseOver={(e) => (e.target.getCanvas().style.cursor = 'crosshair')}
  >
    <GeolocateControl position='top-left' />
    <NavigationControl position='top-left' />

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
          <HiLocationMarker size={30} color='tomato' />
        </button>
      </Marker>
    ))}

    {locs.map((loc, index) => (
      <Marker key={index} latitude={loc.latitude} longitude={loc.longitude}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onMarkerSelect(loc, index);
          }}
          type='button'
        >
          <HiLocationMarker size={30} color='tomato' />
        </button>
      </Marker>
    ))}

    {selectedMarker && (
      <Popup
        offset={25}
        latitude={
          selectedMarker.coordinates?.latitude || selectedMarker.loc.latitude
        }
        longitude={
          selectedMarker.coordinates?.longitude || selectedMarker.loc.longitude
        }
        onClose={onPopupClose}
      >
        <PopupInfo
          longitude={
            selectedMarker.coordinates?.longitude ||
            selectedMarker.loc.longitude
          }
          latitude={
            selectedMarker.coordinates?.latitude || selectedMarker.loc.latitude
          }
          onRemoveLocation={() => onRemoveLocation(selectedMarker.index)}
        />
      </Popup>
    )}
  </Map>
);

export default MapComponent;
