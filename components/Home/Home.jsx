import React, { useContext, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { UserContext } from '../Context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LiveSearchComponent from './Map/LiveSearchComponent';
import CalculateCostButton from './Cost/CalculateCostButton';
import { GeoAdressContext } from '../Context/GeoAdressContext';
import { OrderContext } from '../Context/OrderContext';
import { Order } from './Order/Order';
import { GeoContext } from '../Context/GeoContext';
import { ServiceContext } from '../Context/ServiceContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import Sidebar from './Sidebar/Sidebar';

export const Home = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);
  const { startLocation, endLocation, clearGeoData } = useContext(GeoAdressContext); 
  const { request, auth, clearOrderData } = useContext(OrderContext);
  const { clearGeoCoords } = useContext(GeoContext);
  const { clearServiceData } = useContext(ServiceContext);
  const [isVisible, setIsVisible] = useState(false);
  
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

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
  <View style={styles.container}>
    <LiveSearchComponent></LiveSearchComponent>
    <View style={styles.homeBlock}>
        {startLocation && endLocation 
          ? (<CalculateCostButton navigation={navigation}></CalculateCostButton>) 
          : request
          ? (<Order></Order>)
          : (<Button title="Маршрут" onPress={() => navigation.navigate('VisicomSearchWithSuggestions')} />)
        }
    </View>     
    <TouchableOpacity onPress={toggleVisibility} style={styles.burgerContainer}>
      <Icon name="bars" size={30}  style={styles.burger}/>
    </TouchableOpacity>
    {isVisible && <Sidebar toggleVisibility={toggleVisibility}></Sidebar>}
  </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  }, orderBlock: {
    position: 'absolute'
  }, burgerContainer: {
    position: 'absolute',
    left: '5%',
    top: '2%',
    width: 40,
    height: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  }, burger:{
    color: '#000000'
  }, homeBlock: {
    position: 'absolute',
    bottom: 0,
    width: '95%',
    backgroundColor: 'white',
    paddingTop: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
  }
});

export default Home;

