import React, { useState, useContext } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { UserContext } from '../UserContext';
import { ServerApi } from '../../ServerApi';
import SHA512 from 'crypto-js/sha512';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(/^\d{9}$/, 'Номер телефону повинен містити 9 цифр')
    .required('Введіть номер телефону'),
  password: Yup.string().required('Введіть пароль'),
});

export const Login = ({ navigation }) => {
  const { setUser } = useContext(UserContext);

  const handleLogin = async (values) => {
    try {
      const hashedPassword = SHA512(values.password).toString();
      const requestData = {
        login: `380${values.phone}`,
        password: hashedPassword,
        WebOrdersApiClientAppToken: 'App_Token',
      };

      console.log('Request data:', requestData);

      const response = await axios.post(`${ServerApi}/account`, requestData);

      console.log('Response data:', response.data);

      if (response.status === 200) {
        const user = {
          phone: `380${values.phone}`,
          hashedPassword,
          WebOrdersApiClientAppToken: 'App_Token', // Замініть на отриманий токен з сервера
        };
        setUser(user);

        AsyncStorage.setItem('user', JSON.stringify(user));

        navigation.navigate('Home');
      } else {
        console.error('Error logging in:', response.data);
      }
    } catch (error) {
      Alert.alert('Помилка', 'Невірний пароль або телефон');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Log in to your account</Text>
      <Formik
        initialValues={{
          phone: '',
          password: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={async (values) => {
          try {
            await handleLogin(values);
          } catch (err) {
            console.error(err);
          }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
          <View>
            <View style={styles.phoneInputContainer}>
              <Text style={styles.phonePrefix}>+380</Text>
              <TextInput
                style={styles.phoneInput}
                value={values.phone}
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                keyboardType="numeric"
                maxLength={9}
              />
            </View>
            {touched.phone && errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
            <TextInput
              style={styles.input}
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              placeholder="Password"
              secureTextEntry
            />
            {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            <Button title="Login" onPress={handleSubmit} disabled={!isValid} />
            <Button title="RequestCodeScreen" onPress={() => navigation.navigate('RequestCodeScreen')} />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
    padding: 5,
    marginVertical: 10,
  },
  phonePrefix: {
    marginRight: 5,
  },
  phoneInput: {
    flex: 1,
    borderWidth: 0, // Remove border for the inner TextInput
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
    padding: 5,
    marginVertical: 10,
    width: 200,
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
});

export default Login;