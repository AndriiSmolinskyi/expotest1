import React, { useState, useContext } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { ServerApi } from '../../ServerApi';
import { UserContext } from '../UserContext'; 
import { encode } from 'base-64';

export const CalculateCostButton = () => {
  const [responseText, setResponseText] = useState('');
  const [versionResponse, setVersionResponse] = useState('');
  const { user } = useContext(UserContext); 

  const handleCalculateCost = async () => {
    const credentials = `${user.phone}:${user.hashedPassword}`;
    const base64Credentials = encode(credentials);
    console.log(`login ${user.phone} password ${user.hashedPassword} row ${credentials} base64 ${base64Credentials}`)
    const requestData = {
      reservation: false,
      wagon: true,
      baggage: true,
      taxiColumnId: 0,
      route: [
        {"name": "вход м.Шевченко.","lat": 50.474613, "lng": 30.506389},
        {"name": "м.Иподром.","lat": 50.377615, "lng": 30.468195}
      ]
    };

    try {
      const response = await axios.post(`${ServerApi}weborders/cost`, requestData, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': `Basic ${base64Credentials}`,
          'X-API-VERSION': '1.52.1' 
        }
      });
    
      const responseData = response.data;
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

  const handleGetVersion = async () => {
    try {
      const response = await axios.get(`${ServerApi}version`, {
        headers: {
          Accept: 'application/json',
        }
      });

      const versionData = response.data;
      setVersionResponse(versionData.version);
      
    } catch (error) {
      console.error('Error getting version:', error);
      setVersionResponse('Error getting version');
    }
  };

  return (
    <View style={styles.container}>
    <Button title="Calculate Cost" onPress={handleCalculateCost} />
    <Button title="Get Version" onPress={handleGetVersion} />
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