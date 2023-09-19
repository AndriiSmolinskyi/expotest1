import React, { useState, useContext, useRef } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import axios from 'axios';
import { UserContext } from '../../Context/UserContext';
import { ServerApi } from '../../../ServerApi';

export const ResetPassCode = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);
  const codeInputRefs = useRef([]);
  const [code, setCode] = useState(['', '', '', '']); // Масив для зберігання кожної цифри
  const [isCodeValid, setIsCodeValid] = useState(false); // Додана змінна для валідації

  const handleCode = async () => {
    const enteredCode = code.join(''); // Об'єднати всі цифри в одну рядок
    try {
      const response = await axios.post(`${ServerApi}/account/restore/checkConfirmCode`, {
        phone: user.phone,
        confirm_code: enteredCode,
      });
  
      if (response.status === 200) {
        setUser((prevUser) => ({
          ...prevUser,
          confirm_code: enteredCode,
        }));
        navigation.navigate('ResetPasswordScreen');
      } else {
        console.error('Error sending code:', response.data);
      }
    } catch (error) {
      if (error.response) {
        // Якщо сервер відповів з помилкою (мала б бути відповідь зі статусом 4xx або 5xx)
        Alert.alert('Помилка', error.response.data.message); // або використайте інший ключ для повідомлення про помилку
      } else if (error.request) {
        // Якщо запит було зроблено, але не отримано відповіді
        console.error('No response received from the server');
      } else {
        // Якщо сталася якась інша помилка
        console.error('An error occurred while making the request:', error.message);
      }
    }
  };

  // Функція для обробки зміни тексту в інпуті для цифри та автоматичного переходу фокуса
  const handleCodeInputChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Автоматичний перехід фокуса до наступного інпута, якщо не досягнуто останнього інпута
    if (index < codeInputRefs.current.length - 1 && value !== '') {
      codeInputRefs.current[index + 1].focus();
    }
    
    // Валідація: Перевірити, чи всі поля заповнені
    const isValid = newCode.every((digit) => digit !== '');
    setIsCodeValid(isValid);
  };

  // Функція для обробки видалення символу з інпута та фокусування на попередньому інпуті
  const handleCodeInputBackspace = (index) => {
    if (index > 0 && code[index] === '') {
      codeInputRefs.current[index - 1].focus();
    }
    
    // Валідація: Перевірити, чи всі поля заповнені
    const isValid = code.every((digit) => digit !== '');
    setIsCodeValid(isValid);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Введіть код з смс</Text>
      <View style={styles.codeInputContainer}>
        {/* Створюємо 4 інпути для кожної цифри */}
        {code.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.codeInput}
            placeholder='*'
            value={digit}
            onChangeText={(value) => handleCodeInputChange(index, value)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Backspace') {
                handleCodeInputBackspace(index);
              }
            }}
            keyboardType="numeric"
            maxLength={1}
            ref={(input) => (codeInputRefs.current[index] = input)} // Збереження посилання на інпут в масив
          />
        ))}
      </View>
      <TouchableOpacity 
        style={[styles.saveOrder, { backgroundColor: isCodeValid ? '#4CE5B1' : 'gray' }]} // Заблокувати кнопку, якщо не всі поля заповнені
        onPress={isCodeValid ? handleCode : null} // Заблокувати обробник, якщо не всі поля заповнені
      >
        <Text style={styles.saveOrder__text}>Далі</Text>
      </TouchableOpacity> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeInput: {
    padding: 5,
    marginHorizontal: 5,
    width: 50, // Ширина інпута для цифри
    textAlign: 'center', // Текст по центру
    fontSize: 24, // Розмір шрифту
    height: 60,
    borderBottomColor: '#C8C7CC', 
    borderBottomWidth: 1,    
  },
  title:{
    fontSize: 20,
    marginBottom: 20,
  },
  saveOrder:{
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    width: '85%',
    marginTop: 20,
  },
  saveOrder__text:{
    color: 'white',
    fontSize: 18,
  },
});

export default ResetPassCode;