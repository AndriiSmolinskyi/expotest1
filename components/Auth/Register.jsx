// Register.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { API_BASE_URL } from '../../env';

export const Register = () => {
  const [phone, setPhone] = useState('');
  const [confirmCode, setConfirmCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSendConfirmCode = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/account/register/sendConfirmCode`, {
        phone: phone,
      });
      // Обробка відповіді сервера, показ повідомлення або помилки
      Alert.alert('Confirmation Code Sent', 'A confirmation code has been sent to your phone.');
    } catch (error) {
      // Обробка помилок
      Alert.alert('Error', 'Failed to send confirmation code.');
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/account/register`, {
        phone: phone,
        confirm_code: confirmCode,
        password: password,
        confirm_password: confirmPassword,
      });
      // Обробка відповіді сервера, перехід на сторінку Home
      Alert.alert('Registration Successful', 'You have successfully registered.');
    } catch (error) {
      // Обробка помилок
      Alert.alert('Error', 'Registration failed.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Phone:</Text>
      <TextInput value={phone} onChangeText={setPhone} />
      <Button title="Send Confirmation Code" onPress={handleSendConfirmCode} />

      {confirmCode ? (
        <>
          <Text>Confirmation Code:</Text>
          <TextInput value={confirmCode} onChangeText={setConfirmCode} />
        </>
      ) : null}

      {confirmCode ? (
        <>
          <Text>Password:</Text>
          <TextInput value={password} onChangeText={setPassword} secureTextEntry />
          <Text>Confirm Password:</Text>
          <TextInput value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
          <Button title="Register" onPress={handleRegister} />
        </>
      ) : null}
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

export default Register;