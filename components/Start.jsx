import React, { useEffect, useContext } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { ServerApi } from '../ServerApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from './UserContext';


const Start = ({ navigation }) => {
  const { setUser } = useContext(UserContext);

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

        if (response.status === 200) {
          setUser(user); // Записати дані в UserContext
          // navigation.navigate('Home');
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }], // Переходимо на Home і очищаємо стек навігації
          });
        } 
        // else {
        //   console.error('Authentication failed:', response.data);
        // }
      }
    } 
    catch (error) {
      // console.error('Error checking user authentication:', error);
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