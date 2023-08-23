import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { UserContext } from '../Context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LiveSearchComponent from './Map/LiveSearchComponent';
import CalculateCostButton from './Cost/CalculateCostButton';

export const Home = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = async () => {  
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Start' }],
      });
    } catch (error) {
      console.error('Error removing user data from AsyncStorage:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Welcome to Home Page!</Text>
      <Text>Phone: {user ? user.phone : ''}</Text>
      <Button title="Logout" onPress={handleLogout} />    
      <LiveSearchComponent></LiveSearchComponent>
      <Button title="VisicomSearchWithSuggestions" onPress={() => navigation.navigate('VisicomSearchWithSuggestions')} />
      <CalculateCostButton></CalculateCostButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default Home;

