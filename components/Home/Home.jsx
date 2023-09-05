import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { UserContext } from '../Context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LiveSearchComponent from './Map/LiveSearchComponent';
import CalculateCostButton from './Cost/CalculateCostButton';
import { GeoAdressContext } from '../Context/GeoAdressContext';
import { OrderContext } from '../Context/OrderContext';
import { Order } from './Order/Order';
import { GeoContext } from '../Context/GeoContext';
import { ServiceContext } from '../Context/ServiceContext';

export const Home = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);
  const { startLocation, endLocation, clearGeoData } = useContext(GeoAdressContext); 
  const { request, auth, clearOrderData } = useContext(OrderContext);
  const { clearGeoCoords } = useContext(GeoContext);
  const { clearServiceData } = useContext(ServiceContext)
  
  const handleLogout = async () => {  
    try {
      await AsyncStorage.removeItem('user');
      setUser(null)
      clearGeoData();
      clearOrderData();
      clearGeoCoords();
      clearServiceData();
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
      {/* <Text>Welcome to Home Page!</Text>
      <Text>Phone: {user ? user.phone : ''}</Text>
      <Button title="Logout" onPress={handleLogout} />     */}
      <LiveSearchComponent></LiveSearchComponent>     
      {startLocation && endLocation 
        ? (<CalculateCostButton navigation={navigation}></CalculateCostButton>) 
        : (<Text></Text>)
      }
      {request ? (<Order></Order>) : (<Button title="Маршрут" onPress={() => navigation.navigate('VisicomSearchWithSuggestions')} />)}
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

