import React, { useState, useContext } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { UserContext } from '../../Context/UserContext';
import { ServerApi } from '../../../ServerApi';
import SHA512 from 'crypto-js/sha512';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { OrderContext } from '../../Context/OrderContext';
import { encode } from 'base-64';

const LoginSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(/^\d{9}$/, 'Короткий номер або невірний')
    .required('Введіть номер телефону'),
  password: Yup.string()
  .min(7, 'Мінімум 7 символів')
  .max(22, 'Не більше 22 символів')
  .matches(/[0-9]/, 'Повинен містити цифру')
  .matches(/[a-zA-Z]/, 'Повинен містити букву')
  .required('Введіть пароль'),
});

export const Login = ({ navigation }) => {
  const { setUser } = useContext(UserContext);
  const { setUserData, setAuth } = useContext(OrderContext)

  const handleLogin = async (values) => {
    try {
      const hashedPassword = SHA512(values.password).toString();
      const requestData = {
        login: `380${values.phone}`,
        password: hashedPassword,
        WebOrdersApiClientAppToken: 'App_Token',
      };

      const response = await axios.post(`${ServerApi}/account`, requestData);
      
      const userFromServer = response.data
      
      if (response.status === 200) {
        const user = {
          phone: `380${values.phone}`,
          hashedPassword,
          WebOrdersApiClientAppToken: 'App_Token',
        };
        setUser(user);
        AsyncStorage.setItem('user', JSON.stringify(user));
        const credentials = `${user.phone}:${user.hashedPassword}`;
        const base64Credentials = encode(credentials);
        setUserData(userFromServer)
        setAuth(`Basic ${base64Credentials}`)
        
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      } else {
        console.error('Error logging in:', response.data);
      }
    } catch (error) {
      Alert.alert('Помилка', 'Невірний пароль або телефон');
    }
  };

  return (
    <View style={styles.container}>
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
        }}>
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
          <View style={styles.formik}>
            <Text style={styles.title}>Ввійдіть в акаунт</Text>
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

            <View style={styles.errorBlock}>
              {touched.phone && errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
            </View>

            <TextInput
              style={styles.input}
              value={values.password}
              onChangeText={(text) => {
                const sanitizedText = text.replace(/[^0-9A-Za-z!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-]/g, '');
                handleChange('password')(sanitizedText);
              }}
              onBlur={handleBlur('password')}
              placeholder="Password"
              secureTextEntry
              maxLength={22}
            />  

            <View style={styles.errorBlock}>
              {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            </View>

            <TouchableOpacity style={styles.forgot} onPress={() => navigation.navigate('RequestCodeScreen')}>
              <Text style={styles.forgot__text}>Забули пароль?</Text>
            </TouchableOpacity> 

            <TouchableOpacity style={styles.saveOrder} onPress={handleSubmit} disabled={!isValid}>
              <Text style={styles.saveOrder__text}>Вхід</Text>
            </TouchableOpacity> 

          </View>
        )}
      </Formik>

      <TouchableOpacity style={styles.register} onPress={() => navigation.navigate('RegisterPhone')}>
        <Text style={styles.register__text}>Нема акаунта? Зареєструватись</Text>
      </TouchableOpacity> 

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  formik:{
    borderBottomColor: '#C8C7CC',
    borderBottomWidth: 1,
    paddingBottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    backgroundColor: '#d9d9dd',
    paddingHorizontal: 15,
    height: 48,
    borderRadius: 10,
    fontSize: 18,
    width: '85%',
  },
  phonePrefix: {
    marginRight: 5,
    fontSize: 18,
  },
  phoneInput: {
    flex: 1,
    borderWidth: 0, 
    fontSize: 18,
  },
  input: {
    backgroundColor: '#d9d9dd',
    paddingHorizontal: 15,
    height: 48,
    borderRadius: 10,
    fontSize: 18,
    width: '85%',
    marginVertical: 15,
  },
  errorBlock:{
    width: '85%',
    paddingLeft: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'left',
    fontSize: 16,
  },
  title:{
    marginBottom: 15,
    fontSize: 24,
  },
  saveOrder:{
    backgroundColor: '#4CE5B1',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    width: '85%',
    marginTop: 15,
  },
  saveOrder__text:{
    color: 'white',
    fontSize: 18,
  },
  forgot:{
    width: '85%'
  },
  forgot__text:{
    color: '#717173',
    fontSize: 16,
    textAlign: 'right'
  },
  register:{
    backgroundColor: '#4CE5B1',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    width: '85%',
    marginTop: 15,
    marginTop: 30,
  },
  register__text:{
    color: 'white',
    fontSize: 18,
  },
});

export default Login;