import React, { useState, useContext } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { UserContext } from '../../Context/UserContext';
import { ServerApi } from '../../../ServerApi';

export const RequestCodeScreen = ({ navigation }) => {
  const { setUser } = useContext(UserContext);
  const [phone, setPhone] = useState('');

  const handleNext = async () => {
    try {
      const response = await axios.post(`${ServerApi}/account/restore/sendConfirmCode`, {
        phone: `380${phone}`,
      });
  
      if (response.status === 200) {
        setUser({ phone: `380${phone}` });
        navigation.navigate('ResetPassCode');
      } else {
        console.error('Error sending code:', response.data);
      }
    } catch (error) {
      if (error.response) {
        Alert.alert('Помилка', error.response.data.message); 
        Alert.alert('Помилка', error.message);
      } else if (error.request) {
        console.error('No response received from the server');
      } else {
        console.error('An error occurred while making the request:', error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text>Етап 1: Введіть телефонний номер</Text>
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
      <Button title="Далі" onPress={handleNext} />
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

export default RequestCodeScreen;