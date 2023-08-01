// RegisterDataScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { UserContext } from './UserContext';
import { ServerApi } from '../ServerApi';

export const RegisterDataScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [code, setCode] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${ServerApi}/account/register`, {
        phone: user.phone,
        confirm_code: code,
        password,
        confirm_password: confirmPassword,
        user_first_name: name,
      });
    
      if (response.status === 201) {
        // Registration successful
        // You can navigate to a success screen or handle as needed
        console.log('User registered successfully!');
      } else {
        console.error('Error registering user:', response.data);
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Етап 2: Заповніть дані для реєстрації</Text>
      <TextInput
        style={styles.input}
        placeholder="Ім'я"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Пароль"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Повторіть пароль"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Код з телефону"
        keyboardType="numeric"
        value={code}
        onChangeText={setCode}
      />
      <Button title="Зареєструватися" onPress={handleRegister} />
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
    borderColor: 'gray',
    borderRadius: 5,
    padding: 5,
    marginVertical: 10,
    width: '80%',
  },
});

export default RegisterDataScreen;