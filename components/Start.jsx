import React, { useEffect, useContext } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { ServerApi } from '../ServerApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from './Context/UserContext';
import { OrderContext } from './Context/OrderContext';


const Start = ({ navigation }) => {
  const { setUser } = useContext(UserContext);
  const { setUserData } = useContext(OrderContext)

  useEffect(() => {
    checkUserAuthentication();
  }, []);

  const checkUserAuthentication = async () => {
    try {
      const userStr = await AsyncStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        console.log('User data from AsyncStorage:', user);

        const requestData = {
          login: user.phone,
          password: user.hashedPassword, // Вже захешований пароль
          WebOrdersApiClientAppToken: 'App_Token',
        };

        const response = await axios.post(`${ServerApi}/account`, requestData);
        const userFromServer = response.data;

        if (response.status === 200) {
          setUser(user);
          setUserData(userFromServer)      
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
        } 
        else {
          console.error('Authentication failed:', response.data);
        }
      }
    } 
    catch (error) {
      console.error('Error checking user authentication:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Home" onPress={() => navigation.navigate('Home')} />
      <Button title="RegisterPhone" onPress={() => navigation.navigate('RegisterPhone')} />
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
      <Button title="ResetPasswordScreen" onPress={() => navigation.navigate('ResetPasswordScreen')} />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Start;