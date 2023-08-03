// RegisterDataScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { UserContext } from '../UserContext';
import { ServerApi } from '../../ServerApi';
import RegistrationForm from './RegistrationForm';

export const RegisterDataScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async (values) => {
    try {
      const response = await axios.post(`${ServerApi}/account/register`, {
        phone: user.phone,
        confirm_code: values.code,
        password: values.password,
        confirm_password: values.confirmPassword,
        user_first_name: values.name,
      });
    
      if (response.status === 201) {
        // Registration successful, redirect to home screen
        console.log('User registered successfully!');
        // setUser({  });
        navigation.navigate('Home');
      } else {
        setErrorMessage('Неправильний код');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      setErrorMessage('Помилка реєстрації');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Етап 2: Заповніть дані для реєстрації</Text>
      <RegistrationForm handleRegister={handleRegister} errorMessage={errorMessage} />
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

export default RegisterDataScreen;