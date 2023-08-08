import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';

export const MapViewComponent = ({ routeCoordinates }) => {
  const initialRegion = {
    latitude: 50.4501,
    longitude: 30.5234,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <MapView style={styles.map} initialRegion={initialRegion}>
      <Polyline
        coordinates={routeCoordinates}
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