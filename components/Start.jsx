import React, { useEffect, useContext } from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';
import { ServerApi } from '../ServerApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from './Context/UserContext';
import { OrderContext } from './Context/OrderContext';
import { encode } from 'base-64';
import Login from './Auth/Login/Login';
import RegisterPhoneScreen from './Auth/Register/RegisterPhoneScreen';

const Start = ({ navigation }) => {
  const { setUser } = useContext(UserContext);
  const { setUserData, setAuth } = useContext(OrderContext)

  useEffect(() => {
    checkUserAuthentication();
  }, []);

  const checkUserAuthentication = async () => {
    try {
      const userStr = await AsyncStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        const requestData = {
          login: user.phone,
          password: user.hashedPassword, 
          WebOrdersApiClientAppToken: 'App_Token',
        };

        const response = await axios.post(`${ServerApi}/account`, requestData);
        const userFromServer = response.data;

        if (response.status === 200) {
          setUser(user);
          setUserData(userFromServer)         
          const credentials = `${user.phone}:${user.hashedPassword}`;
          const base64Credentials = encode(credentials); 
          setAuth(`Basic ${base64Credentials}`)     
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
        } 
      }
    } 
    catch (error) {
      
    }
  };

  return (
    <View style={styles.container}>
      <Login navigation={ navigation }></Login>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Start;