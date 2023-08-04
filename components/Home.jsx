import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { UserContext } from './UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Home = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = async () => {
    setUser(null);
    try {
      await AsyncStorage.removeItem('user'); // Видалити дані з AsyncStorage
    } catch (error) {
      console.error('Error removing user data from AsyncStorage:', error);
    }
    navigation.navigate('Start');
  };

  return (
    <View>
      <Text>Welcome to Home Page!</Text>
      <Text>Phone: {user ? user.phone : ''}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default Home;