import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import axios from 'axios';
import { GeoContext } from '../../Context/GeoContext';
import { VisicomApi } from '../../../VisicomApi';

export const LiveSearchComponent = () => {
  const [route, setRoute] = useState([]);
  const { startCoords, endCoords } = useContext(GeoContext);
  const mapRef = useRef(null);

  useEffect(() => {
    handleSearch();
  }, [startCoords, endCoords]);

  const handleSearch = async () => {
    const origin = startCoords;
    const destination = endCoords;
    const apiKey = VisicomApi;
    try {
      const response = await axios.get(`https://api.visicom.ua/data-api/5.0/core/distance.json?origin=${origin}&destination=${destination}&geometry=path&key=${apiKey}`);
      const data = response.data;

      if (data.geometry && data.geometry.coordinates) {
        setRoute(data.geometry.coordinates);
        if (mapRef.current) {
          const routeBounds = data.geometry.coordinates.map(coord => ({
            latitude: coord[1],
            longitude: coord[0],
          }));

          mapRef.current.fitToCoordinates(routeBounds, {
            edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
          });
        }
      } else {
        setRoute([]);
      }
    } catch (error) {
      console.error('Error fetching route:', error);
      setRoute([]);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 50.455002,
          longitude: 30.511284,
          latitudeDelta: 0.3,  
          longitudeDelta: 0.3, 
        }}
      >
        {route.length > 0 && (
          <Polyline coordinates={route.map(coord => ({ latitude: coord[1], longitude: coord[0] }))} strokeWidth={4} />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  map: {
    flex: 1,
  },
});

export default LiveSearchComponent;

