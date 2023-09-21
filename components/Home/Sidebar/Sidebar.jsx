import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { OrderContext } from '../../Context/OrderContext';
import { GeoAdressContext } from '../../Context/GeoAdressContext';
import { GeoContext } from '../../Context/GeoContext';
import { ServiceContext } from '../../Context/ServiceContext';
import { UserContext } from '../../Context/UserContext';
import { useContext } from 'react';
import axios from 'axios';
import { ServerApi } from '../../../ServerApi';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { useNavigation } from '@react-navigation/native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

const Sidebar = ({toggleVisibility}) => {
    const { setUser } = useContext(UserContext);
    const {  clearGeoData } = useContext(GeoAdressContext); 
    const { auth, clearOrderData, userData } = useContext(OrderContext);
    const { clearGeoCoords } = useContext(GeoContext);
    const { clearServiceData } = useContext(ServiceContext);

    const navigation = useNavigation();

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

    const executionStatus = 'SearchesForCar'


    const onSwipeGestureEvent = (event) => {
        if (event.nativeEvent.state === State.ACTIVE) {
          // Обробка жесту свайпу тут
          toggleVisibility(); // Викликаємо функцію закриття сайдбару
        }
      };

    return(
        <PanGestureHandler onHandlerStateChange={onSwipeGestureEvent}>
            <View style={styles.sideCont}> 
                <View style={styles.side}>
                    <Text>{userData.user_full_name}</Text>
                    <Text>{userData.user_phone}</Text>
                    <TouchableOpacity  onPress={() => navigation.navigate('History')}>
                        <Text>Історія поїздок</Text>
                    </TouchableOpacity>
                    <Button title="Close" onPress={toggleVisibility}/>
                    <Button title="Logout" onPress={handleLogout}/>
                </View>
            </View>  
        </PanGestureHandler>      
    )
}

const styles = StyleSheet.create({
    sideCont:{
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
    }, side:{
        width: '80%',
        height: '100%',
        backgroundColor: 'white',
    }
});

export default Sidebar;