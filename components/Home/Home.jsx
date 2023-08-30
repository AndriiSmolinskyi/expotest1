import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { UserContext } from '../Context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LiveSearchComponent from './Map/LiveSearchComponent';
import CalculateCostButton from './Cost/CalculateCostButton';
import { GeoAdressContext } from '../Context/GeoAdressContext';
import { OrderContext } from '../Context/OrderContext';
import { Order } from './Order/Order';

export const Home = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);
  const { startLocation, endLocation } = useContext(GeoAdressContext); 
  const { request, auth } = useContext(OrderContext)

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
      <Button title="Маршрут" onPress={() => navigation.navigate('VisicomSearchWithSuggestions')} />
      {startLocation && endLocation 
        ? (<CalculateCostButton navigation={navigation}></CalculateCostButton>) 
        : (<Text></Text>)
      }
      {auth && request ? (<Order></Order>) : (<Text></Text>)}
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

