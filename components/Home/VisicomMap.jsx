import React from 'react';
import { View, StyleSheet } from 'react-native';
import WebViewLeaflet from 'react-native-webview-leaflet';

const VisicomMapLeaflet = () => {
  return (
    <View style={styles.container}>
      <WebViewLeaflet
        center={{ lat: 50.455002, lng: 30.511284 }}
        zoom={9}
        url={`https://tms{s}.visicom.ua/2.0.0/planet3/base/{z}/{x}/{y}.png?key=YOUR_API_KEY`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default VisicomMapLeaflet;