// http://31.43.107.151:7321/api/


import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StatusBar } from 'react-native';
import axios from 'axios';

const BASE_URL = 'http://31.43.107.151:7321/api';

export default function App() {
  const [phone, setPhone] = useState('');

  const handleSendSms = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/account/register/sendConfirmCode`, {
        phone: phone,
      });

      // Виведення відповіді сервера в консоль
      console.log('Відповідь сервера:', response.data);

      // Показ повідомлення про успішну відправку SMS
      Alert.alert('Успішно!', 'SMS успішно відправлено на номер ' + phone);
    } catch (error) {
      // Обробка помилок
      if (error.response) {
        console.log('Статус:', error.response.status);
        console.log('Дані:', error.response.data);
      } else if (error.request) {
        console.log('Помилка запиту:', error.request);
      } else {
        console.log('Помилка:', error.message);
      }

      // Показ повідомлення про помилку відправки SMS
      Alert.alert('Помилка!', 'Не вдалося відправити SMS на номер ' + phone);
    }
  };

  return (
    <View style={{ padding: 20 }}>
    <StatusBar/>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
      placeholder="Введіть номер телефону"
      value={phone}
      onChangeText={setPhone}
    />
    <Button title="Відправити SMS" onPress={handleSendSms} />
  </View>
  );
}
