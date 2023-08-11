import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Button, Alert } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import axios from 'axios';

export const LiveSearchComponent = () => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [route, setRoute] = useState([]);
  
    const handleSearch = async () => {
      const apiKey = '20a396a7d85377ccd96d9491b7889643';
      try {
        const response = await axios.get(`https://api.visicom.ua/data-api/5.0/core/distance.json?origin=${origin}&destination=${destination}&geometry=path&key=${apiKey}`);
        const data = response.data;
  
        if (data.geometry && data.geometry.coordinates) {
          setRoute(data.geometry.coordinates);
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
        <TextInput
          style={styles.input}
          placeholder="Початкова точка"
          value={origin}
          onChangeText={setOrigin}
        />
        <TextInput
          style={styles.input}
          placeholder="Фінішна точка"
          value={destination}
          onChangeText={setDestination}
        />
        <Button title="Побудувати маршрут" onPress={handleSearch} />
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 50.455002,
            longitude: 30.511284,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
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
      padding: 20,
    },
    input: {
      height: 40,
      borderWidth: 1,
      borderColor: 'gray',
      marginVertical: 10,
      paddingHorizontal: 10,
    },
    map: {
      flex: 1,
      marginTop: 20,
    },
  });
  

export default LiveSearchComponent;