import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const RegisterDataSchema = Yup.object().shape({
  name: Yup.string()
    .required('Введіть ім\'я')
    .min(2, 'Мінімум 2 символів')
    .max(22, 'Не більше 22 символів'),
  password: Yup.string()
    .min(7, 'Мінімум 7 символів')
    .max(22, 'Не більше 22 символів')
    .matches(/[0-9]/, 'Повинен містити цифру')
    .matches(/[a-zA-Z]/, 'Повинен містити букву')
    .required('Введіть пароль'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Паролі повинні збігатися')
    .required('Підтвердіть пароль'),
  code: Yup.string()
    .min(4, 'Повинно бути 4 символа')
    .required('Введіть код з телефону'),
});

const RegistrationForm = ({ handleRegister }) => {
  const [errors, setErrors] = useState({});

  return (
    <Formik
      initialValues={{
        name: '',
        password: '',
        confirmPassword: '',
        code: '',
      }}
      validationSchema={RegisterDataSchema}
      onSubmit={async (values) => {
        try {
          await handleRegister(values);
        } catch (err) {
          setErrors(err);
        }
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.inputBlock}>
          <TextInput
            style={styles.input}
            placeholder="Ім'я"
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
            autoCapitalize="none"
            maxLength={22}
          />
          <View style={styles.errorBlock}>
            {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          </View>
          <TextInput
            style={styles.input}
            placeholder="Пароль"
            secureTextEntry
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            maxLength={22}
          />
          <View style={styles.errorBlock}>
            {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          </View>
          <TextInput
            style={styles.input}
            placeholder="Повторіть пароль"
            secureTextEntry
            onChangeText={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            value={values.confirmPassword}
            maxLength={22}
          />
          <View style={styles.errorBlock}>
            {touched.confirmPassword && errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
          </View>
          <TextInput
            style={styles.input}
            placeholder="Код з телефону"
            keyboardType="numeric"
            onChangeText={handleChange('code')}
            onBlur={handleBlur('code')}
            value={values.code}
            maxLength={4}
          />
          <View style={styles.errorBlock}>
            {touched.code && errors.code && <Text style={styles.errorText}>{errors.code}</Text>}
          </View>       
          <TouchableOpacity style={styles.saveOrder} onPress={handleSubmit}>
            <Text style={styles.saveOrder__text}>Зареєструватись</Text>
          </TouchableOpacity> 
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  inputBlock:{
    width: '100%',
    alignItems: 'center'
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
    width: '85%',
    color: 'red',
    fontSize: 16,
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
});

export default RegistrationForm;