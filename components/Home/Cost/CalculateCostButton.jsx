import React, { useState, useContext } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { ServerApi } from '../../../ServerApi';
import { UserContext } from '../../Context/UserContext'; 
import { encode } from 'base-64';

export const CalculateCostButton = () => {
  const [responseText, setResponseText] = useState('');
  const [versionResponse, setVersionResponse] = useState('');
  const { user } = useContext(UserContext); 

  const handleCalculateCost = async () => {
    const credentials = `${user.phone}:${user.hashedPassword}`;
    const base64Credentials = encode(credentials);
    
    const requestData = {
      reservation: false,
      calculated_tariff_names: [
        "Базовый",
        "Универсал",
        "Бизнес-класс",
        "Микроавтобус"
        ],
      baggage: true,
      taxiColumnId: 0,
      route: [
        {"name": "Київ, Перемоги просп., 37 корп. 7" ,"lat": 30.458361, "lng": 50.448979},
        {"name": "Київ, Лаврська (Івана Мазепи) вул., 15 корп. 42","lat": 30.56173, "lng": 50.43423}
      ]
    };

    try {
      const response = await axios.post(`${ServerApi}weborders/tariffs/cost`, requestData, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': `Basic ${base64Credentials}`,
          'X-API-VERSION': '1.52.1' 
        }
      });
    
      const responseData = response.data;
      console.log(response.data)
      setResponseText(responseData); 
    } catch (error) {
      if (error.response.status === 401) {
        console.error('Error calculating cost: Unauthorized');
        setResponseText('Error calculating cost');
      } else {
        throw error;
      }
    }

  };

  return (
    <View style={styles.container}>
    <Button title="Calculate Cost" onPress={handleCalculateCost} />
    <Text style={styles.responseText}>
      <Text>UID: {responseText.dispatching_order_uid}</Text>
      <Text>Order Cost: {responseText.order_cost}{responseText.currency}</Text>
      <Text>Discount Trip: {responseText.discount_trip ? 'TRUE' : 'FALSE'}</Text>   
      <Text>Can Pay Bonuses: {responseText.can_pay_bonuses ? 'TRUE' : 'FALSE'}</Text>         
    </Text>
    <Text style={styles.versionResponse}>API Version: {versionResponse}</Text>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  responseText: {
    marginTop: 10,
    fontFamily: 'monospace',
  },
  versionResponse: {
    marginTop: 10,
    fontFamily: 'monospace',
    color: 'blue',
  },
});

export default CalculateCostButton;