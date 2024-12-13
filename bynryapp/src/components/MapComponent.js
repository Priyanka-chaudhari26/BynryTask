import React from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

function MapComponent({ location }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'YOUR_API_KEY',
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      zoom={10}
      center={location}
      mapContainerStyle={{ width: '100%', height: '400px' }}
    >
      <Marker position={location} />
    </GoogleMap>
  );
}

export default MapComponent;
