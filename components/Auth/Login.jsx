// Login.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { API_BASE_URL } from '../../env';

export const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Виконуємо логін користувача тут з даними phone і password
      // Опрацьовуємо відповідь сервера і переходимо на Home Page
      Alert.alert('Login Successful', 'You have successfully logged in.');
    } catch (error) {
      // Обробка помилок
      Alert.alert('Error', 'Login failed.');
    }
  };

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/account/restore/sendConfirmCode`, {
        phone: phone,
      });
      // Обробка відповіді сервера, показ повідомлення або помилки
      Alert.alert('Confirmation Code Sent', 'A confirmation code has been sent to your phone.');
    } catch (error) {
      // Обробка помилок
      Alert.alert('Error', 'Failed to send confirmation code.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Phone:</Text>
      <TextInput value={phone} onChangeText={setPhone} />
      <Text>Password:</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Forgot Password" onPress={handleForgotPassword} />
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

export default Login;