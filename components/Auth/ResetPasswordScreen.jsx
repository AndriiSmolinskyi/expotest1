
import React, { useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { UserContext } from '../UserContext';
import { ServerApi } from '../../ServerApi';
import { Formik } from 'formik';
import * as Yup from 'yup';

const ResetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required('Введіть новий пароль')
    .min(6, 'Мінімум 6 символів'),
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

      if (response.status === 201) {
        // Password reset successful, redirect to login screen
        console.log('Password reset successful!');
        setUser(null);
        navigation.navigate('Login');
      } else {
        console.error('Error resetting password:', response.data);
      }
    } catch (error) {
      console.log(user)
      console.error('An error occurred:', error);
      if (error.response) {
        // Handle error responses from the server
        Alert.alert('Помилка', error.response.data.message); // or use a different key for error message
      } else {
        // Handle other types of errors
        console.error('An error occurred while resetting password:', error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text>Етап 2: Введіть новий пароль</Text>
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
          <View>
            <TextInput
              style={styles.input}
              value={values.newPassword}
              onChangeText={handleChange('newPassword')}
              onBlur={handleBlur('newPassword')}
              placeholder="Новий пароль"
              secureTextEntry
            />
            {touched.newPassword && errors.newPassword && (
              <Text style={styles.errorText}>{errors.newPassword}</Text>
            )}
            <TextInput
              style={styles.input}
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              placeholder="Повторити новий пароль"
              secureTextEntry
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}
            <Button title="Змінити пароль" onPress={handleSubmit} disabled={!isValid} />
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

export default ResetPasswordScreen;
