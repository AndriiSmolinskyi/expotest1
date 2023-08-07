import React from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { StyleSheet } from 'react-native';

export const MapViewComponent = ({ origin, destination }) => {
  const initialRegion = {
    latitude: 50.4501,
    longitude: 30.5234,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const polylineCoordinates = [
    { latitude: 50.4501, longitude: 30.5234 },
    { latitude: 50.4502, longitude: 30.5235 },
    // Add more coordinates as needed
  ];

  return (
    <MapView style={styles.map} initialRegion={initialRegion}>
      <Marker coordinate={{ latitude: 50.4501, longitude: 30.5234 }} />
      <Polyline
        coordinates={polylineCoordinates}
        strokeColor="#000"
        strokeWidth={2}
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
    height: 300,
    width: '100%',
  },
});

export default MapViewComponent;