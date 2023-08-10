import React, { useContext, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { UserContext } from '../UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const Home = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = async () => {
    setUser(null);
    try {
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.error('Error removing user data from AsyncStorage:', error);
    }
    navigation.navigate('Start');
  };

  return (
    <View style={styles.container}>
      <Text>Welcome to Home Page!</Text>
      <Text>Phone: {user ? user.phone : ''}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    height: '60%',
    width: '80%',
  },
});

export default Home;

