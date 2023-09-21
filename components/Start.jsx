import React, { useEffect, useContext, useState } from 'react';
import { View, Button, StyleSheet, Text, ActivityIndicator } from 'react-native'; // Додав імпорт ActivityIndicator
import axios from 'axios';
import { ServerApi } from '../ServerApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from './Context/UserContext';
import { OrderContext } from './Context/OrderContext';
import { encode } from 'base-64';
import Login from './Auth/Login/Login';
import LoadingStart from './LoadingStart';

const Start = ({ navigation }) => {
  const { setUser } = useContext(UserContext);
  const { setUserData, setAuth } = useContext(OrderContext);
  const [isLoadingComplete, setIsLoadingComplete] = useState(false); // Змінив назву стану на isLoadingComplete

  useEffect(() => {
    checkUserAuthentication();
  }, []);

  const checkUserAuthentication = async () => {
    try {
      setIsLoadingComplete(false); // Змінив назву стану на isLoadingComplete

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
        console.log(userFromServer)
        if (response.status === 200) {
          setUser(user);
          setUserData(userFromServer);         
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
      // Обробка помилки...
    }
    finally {
      setIsLoadingComplete(true); // Змінив назву стану на isLoadingComplete
    }
  };

  return (
    <View style={styles.container}>
      {isLoadingComplete ? (
        <Login navigation={navigation}></Login>
      ) : (
        <View >
          <LoadingStart></LoadingStart>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Start;