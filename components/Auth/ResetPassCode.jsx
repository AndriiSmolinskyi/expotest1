import React, { useState, useContext } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { UserContext } from '../UserContext';
import { ServerApi } from '../../ServerApi';

export const ResetPassCode = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);
  const [code, setCode] = useState('');

  const handleCode = async () => {
    try {
      const response = await axios.post(`${ServerApi}/account/restore/checkConfirmCode`, {
        phone: user.phone,
        confirm_code: code,
      });
  
      if (response.status === 200) {
        const user = {
          phone: user.phone,
          confirm_code: code,
        }
        setUser({ user });
        navigation.navigate('ResetPasswordScreen');
      } else {
        console.error('Error sending code:', response.data);
      }
    } catch (error) {
      if (error.response) {
        // Якщо сервер відповів з помилкою (мала б бути відповідь зі статусом 4xx або 5xx)
        Alert.alert('Помилка', error.response.data.message); // або використайте інший ключ для повідомлення про помилку
        Alert.alert('Помилка', error.message);
      } else if (error.request) {
        // Якщо запит було зроблено, але не отримано відповіді
        console.error('No response received from the server');
      } else {
        // Якщо сталася якась інша помилка
        console.error('An error occurred while making the request:', error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text>Етап 1: Введіть код з смс</Text>
      <View style={styles.phoneInputContainer}>
        <TextInput
          style={styles.phoneInput}
          value={code}
          onChangeText={setCode}
          keyboardType="numeric"
          maxLength={9}
        />
      </View>
      <Button title="Далі" onPress={handleCode} />
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
  },
});

export default ResetPassCode;