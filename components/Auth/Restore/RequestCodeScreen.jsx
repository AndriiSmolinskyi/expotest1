import React, { useState, useContext } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { UserContext } from '../../Context/UserContext';
import { ServerApi } from '../../../ServerApi';
import Icon from 'react-native-vector-icons/FontAwesome';

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
      <TouchableOpacity style={styles.close} onPress={() => navigation.navigate('Start')}>
        <Icon name="times" size={30} color={'black'} style={styles.close__icon}/>
      </TouchableOpacity>
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
      <TouchableOpacity style={styles.saveOrder} onPress={handleNext}>
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
  close:{
    position: 'absolute',
    left: '5%',
    top: '2%',
    zIndex: 2,
  },
});

export default RequestCodeScreen;