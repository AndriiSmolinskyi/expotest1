import React, { useState, useContext } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { UserContext } from '../../Context/UserContext';
import { ServerApi } from '../../../ServerApi';

export const RegisterPhoneScreen = ({ navigation }) => {
  const { setUser } = useContext(UserContext);
  const [phone, setPhone] = useState('');

  const handleNext = async () => {
    try {
      const response = await axios.post(`${ServerApi}/account/register/sendConfirmCode`, {
        phone: `380${phone}`,
      });
  
      if (response.status === 200) {
        setUser({ phone: `380${phone}` });
        navigation.navigate('RegisterData');
      } else {
        console.error('Error sending code:', response.data);
        Alert.alert('Помилка', 'Сталася помилка при відправці запиту');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          const errorData = error.response.data;
          const errorMessage = errorData.Message || 'Невідома помилка';
          
          if (errorData.Id === -32) {
            Alert.alert('Помилка', 'Користувач з таким номером телефону вже зареєстрований');
          } else if (errorData.Id === -34) {
            Alert.alert('Помилка', 'Невірний формат номера телефону');
          } else {
            console.error('Bad Request Error:', errorData);
            Alert.alert('Помилка', errorMessage);
          }
        } else {
          console.error('Server Error:', error.response.data);
          console.error('Status Code:', error.response.status);
          Alert.alert('Помилка', 'Сталася помилка при відправці запиту');
        }
      } else if (error.request) {
        console.error('Request Error:', error.request);
        Alert.alert('Помилка', 'Сталася помилка при відправці запиту');
      } else {
        console.error('Error:', error.message);
        Alert.alert('Помилка', 'Сталася помилка при відправці запиту');
      }
    }
  };
  
  const isNextButtonDisabled = phone.length !== 9;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Введіть телефонний номер</Text>
      <View style={styles.phoneInputContainer}>
        <Text style={styles.phonePrefix}>+380</Text>
        <TextInput
          style={styles.phoneInput}
          value={phone}
          onChangeText={setPhone}
          keyboardType="numeric"
          maxLength={9}
        />
      </View>
      <TouchableOpacity style={styles.saveOrder} onPress={handleNext} disabled={isNextButtonDisabled}>
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
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    backgroundColor: '#d9d9dd',
    paddingHorizontal: 15,
    height: 48,
    borderRadius: 10,
    fontSize: 18,
    width: '85%',
  },
  phonePrefix: {
    marginRight: 5,
    fontSize: 18,
  },
  phoneInput: {
    flex: 1,
    borderWidth: 0, 
    fontSize: 18,
  },
  title:{
    fontSize: 20,
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

export default RegisterPhoneScreen;