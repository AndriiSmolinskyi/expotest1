import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { UserContext } from '../UserContext';
import { ServerApi } from '../../ServerApi';
import RegistrationForm from './RegistrationForm';
import { Formik } from 'formik';
import * as Yup from 'yup';

export const ResetPasswordScreen = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async (values) => {
    try {
      const response = await axios.post(`${ServerApi}/account/restore`, {
        phone: user.phone,
        confirm_code: values.code,
        password: values.password,
        confirm_password: values.confirmPassword,
      });
    
      if (response.status === 201) {
        // Registration successful, redirect to home screen
        console.log('User registered successfully!');
        setUser(null);
        navigation.navigate('Login');
      } else {
        setErrorMessage('Неправильний код');
      }
    } catch (error) {
      Alert.alert('Помилка', 'Невірні данні')
    }
  };

  return (
    <View style={styles.container}>
      <Text>Етап 2: Данні для нового пароля</Text>
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

export default ResetPasswordScreen;