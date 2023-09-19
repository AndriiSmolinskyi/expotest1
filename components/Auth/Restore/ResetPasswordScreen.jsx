
import React, { useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { UserContext } from '../../Context/UserContext';
import { ServerApi } from '../../../ServerApi';
import { Formik } from 'formik';
import * as Yup from 'yup';

const ResetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(7, 'Мінімум 7 символів')
    .max(22, 'Не більше 22 символів')
    .matches(/[0-9]/, 'Повинен містити цифру')
    .matches(/[a-zA-Z]/, 'Повинен містити букву')
    .required('Введіть новий пароль'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Паролі повинні співпадати')
    .required('Підтвердіть новий пароль'),
});

export const ResetPasswordScreen = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);

  const handleResetPassword = async (values) => {
    console.log(user)
    try {
      const response = await axios.post(`${ServerApi}/account/restore`, {
        phone: user.phone,
        confirm_code: user.confirm_code,
        password: values.newPassword,
        confirm_password: values.confirmPassword,
      });

      if (response.status === 200) {
        console.log('Password reset successful!');
        setUser(null);
        navigation.navigate('Login');
      } else {
        console.error('Error resetting password:', response.data ? 'yes' : 'no');
      }
    } catch (error) {
      console.log(user)
      console.error('An error occurred:', error);
      if (error.response) {
        Alert.alert('Помилка', error.response.data.message); 
      } else {
        console.error('An error occurred while resetting password:', error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Введіть новий пароль</Text>
      <Formik
        initialValues={{
          newPassword: '',
          confirmPassword: '',
        }}
        validationSchema={ResetPasswordSchema}
        onSubmit={async (values) => {
          try {
            await handleResetPassword(values);
          } catch (err) {
            console.error(err);
          }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
          <View style={styles.inputBlock}>
            <TextInput
              style={styles.input}
              value={values.newPassword}
              onChangeText={handleChange('newPassword')}
              onBlur={handleBlur('newPassword')}
              placeholder="Новий пароль"
              secureTextEntry
            />
            <View style={styles.errorBlock}>
              {touched.newPassword && errors.newPassword && (
                <Text style={styles.errorText}>{errors.newPassword}</Text>
              )}
            </View>
            
            <TextInput
              style={styles.input}
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              placeholder="Повторити новий пароль"
              secureTextEntry
            />
            <View style={styles.errorBlock}>
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}
            </View>
            <TouchableOpacity style={styles.saveOrder} onPress={handleSubmit} disabled={!isValid}>
              <Text style={styles.saveOrder__text}>Змінити пароль</Text>
            </TouchableOpacity> 
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
  input: {
    backgroundColor: '#d9d9dd',
    paddingHorizontal: 15,
    height: 48,
    borderRadius: 10,
    fontSize: 18,
    width: '85%',
    marginVertical: 15,
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
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
  errorBlock:{
    width: '85%',
    paddingLeft: 10,
  },
  errorText: {
    width: '85%',
    color: 'red',
    fontSize: 16,
  },
  inputBlock:{
    width: '100%',
    alignItems: 'center'
  },
  title:{
    fontSize: 24,   
  },
});

export default ResetPasswordScreen;
