// components/Login.js
import React, { useState, useContext } from 'react';
import { View, Text, Button, TextInput, StyleSheet} from 'react-native';
import axios from 'axios';
import { UserContext } from '../UserContext';
import { ServerApi } from '../../ServerApi';
import SHA512 from 'crypto-js/sha512';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Login = ({ navigation }) => {
  const { setUser } = useContext(UserContext);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const hashedPassword = SHA512(password).toString();
      const requestData = {
        login: phone,
        password: hashedPassword,
        WebOrdersApiClientAppToken: 'App_Token',
      };
  
      console.log('Request data:', requestData);
  
      const response = await axios.post(`${ServerApi}/account`, requestData);
  
      console.log('Response data:', response.data);
  
      if (response.status === 200) {
        const user = {
          phone: `380${phone}`,
          hashedPassword,
          token: 'App_Token', // Замініть на отриманий токен з сервера
        };
        setUser(user);
  
        AsyncStorage.setItem('user', JSON.stringify(user));
  
        navigation.navigate('Home');
      } else {
        console.error('Error logging in:', response.data);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Log in to your account</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Phone"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="RequestCodeScreen" onPress={() => navigation.navigate('RequestCodeScreen')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
    padding: 5,
    marginVertical: 10,
    width: 200,
  },
});

export default Login;