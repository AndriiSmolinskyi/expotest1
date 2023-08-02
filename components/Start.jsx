// Start.js
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const Start = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Button title="Home" onPress={() => navigation.navigate('Home')}></Button>
      <Button title="RegisterPhone" onPress={() => navigation.navigate('RegisterPhone')}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Start;