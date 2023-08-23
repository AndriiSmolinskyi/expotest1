import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const RegisterDataSchema = Yup.object().shape({
  name: Yup.string()
    .required('Введіть ім\'я')
    .matches(/^[A-Za-zА-ЯЁа-яё\s]+$/, 'Ім\'я повинно містити лише латинські або кириличні символи'),
  password: Yup.string().min(6, 'Пароль повинен містити мінімум 6 символів').required('Введіть пароль'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Паролі повинні збігатися')
    .required('Підтвердіть пароль'),
  code: Yup.string().required('Введіть код з телефону'),
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
        <View>
          <TextInput
            style={styles.input}
            placeholder="Ім'я"
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
            autoCapitalize="none"
          />
          {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          <TextInput
            style={styles.input}
            placeholder="Пароль"
            secureTextEntry
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
          />
          {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          <TextInput
            style={styles.input}
            placeholder="Повторіть пароль"
            secureTextEntry
            onChangeText={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            value={values.confirmPassword}
          />
          {touched.confirmPassword && errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
          <TextInput
            style={styles.input}
            placeholder="Код з телефону"
            keyboardType="numeric"
            onChangeText={handleChange('code')}
            onBlur={handleBlur('code')}
            value={values.code}
          />
          {touched.code && errors.code && <Text style={styles.errorText}>{errors.code}</Text>}
          <Button title="Зареєструватися" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 5,
    marginVertical: 10,
    width: '80%',
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
});

export default RegistrationForm;