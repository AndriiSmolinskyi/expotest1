// Home.js
import React from 'react';
import { View, Text, Button } from 'react-native';

export const Home = ({ navigation }) => {
  return (
    <View>
      <Text>Welcome to Home Page!</Text>
      <Button title="Start" onPress={() => navigation.navigate('Start')}></Button>
    </View>
  );
};

export default Home;