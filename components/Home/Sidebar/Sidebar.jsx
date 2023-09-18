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

const Sidebar = ({toggleVisibility}) => {
    const { setUser } = useContext(UserContext);
    const {  clearGeoData } = useContext(GeoAdressContext); 
    const { auth, clearOrderData } = useContext(OrderContext);
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
    const toggleHistory = async () => {
        console.log(userData)
        try {
            const response = await axios.get(`${ServerApi}clients/ordershistory`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': auth
                }
            });
    
            const responseData = response.data;
            console.log(responseData);
        } catch (error) {
            if (error.response === 401) {
                console.error('Unauthorized');
            } else {
                console.error(error);
            }
        }    
    }

    return(
        <View style={styles.sideCont}>        
            <View style={styles.side}>
                {/* <Text>{userData.user_phone}</Text> */}
                <Button title="Close" onPress={toggleVisibility}/>
                <Button title="toggleHistory" onPress={toggleHistory}/>
                <Button title="Logout" onPress={handleLogout}/>
            </View>
        </View>    
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