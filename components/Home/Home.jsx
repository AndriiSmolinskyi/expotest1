import React, { useContext, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
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
  const { startLocation, endLocation } = useContext(GeoAdressContext); 
  const { request, uid } = useContext(OrderContext);
  const [isVisible, setIsVisible] = useState(false);

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
          : ( <TouchableOpacity style={styles.road} onPress={() => navigation.navigate('VisicomSearchWithSuggestions')}>
                <View style={styles.road__block}>
                  <Icon name="map-pin" size={30} color={'green'} style={styles.road__block__icon}/>
                  <View style={styles.road__block__item}>
                    <Text style={styles.road__block__title}>Звідки поїдемо?</Text>
                    <Text style={styles.road__block__text}>Ваша поточна локація</Text>
                  </View>
                </View>

                <View style={styles.hr} />

                <View style={styles.road__block}>
                  <Icon name="map-marker" size={30} color={'red'} style={styles.road__block__icon}/>
                  <View style={styles.road__block__item}>
                    <Text style={styles.road__block__title}>Куди їдемо?</Text>
                    <Text style={styles.road__block__text}>Ваша кінцева точка</Text>
                  </View>                  
                </View>
              </TouchableOpacity>
            )
        }
    </View> 
   
    {uid === null && <TouchableOpacity onPress={toggleVisibility} style={styles.burgerContainer}>
      <Icon name="bars" size={30}  style={styles.burger}/>
    </TouchableOpacity>}
    
    
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
  }, homeBlock: {
    position: 'absolute',
    bottom: 0,
    width: '95%',
    backgroundColor: 'white',
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  }, 
  road:{
  
  }, road__block:{
    flexDirection: 'row',
    alignItems: 'center', 
  }, road__block__item:{
    marginLeft: 15,
    
  }, road__block__title:{
    color: '#C8C7CC',
    fontSize: 16,
  },  road__block__text:{
    fontSize: 21,
    marginTop: 10,
    marginBottom: 10,
  },   hr: {
    borderBottomColor: '#C8C7CC', 
    borderBottomWidth: 1,       
    marginVertical: 10,         
  },
});

export default Home;

