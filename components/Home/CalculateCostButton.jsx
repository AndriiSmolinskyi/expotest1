import React, { useState, useContext } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { ServerApi } from '../../ServerApi';
import { UserContext } from '../UserContext'; // Підключіть ваш контекст користувача
import { encode } from 'base-64';

const CalculateCostButton = () => {
  const [responseText, setResponseText] = useState('');
  const [versionResponse, setVersionResponse] = useState('');
  const { user } = useContext(UserContext); // Отримайте дані користувача з контексту

  const handleCalculateCost = async () => {
    const requestData = {
      reservation: true,
      wagon: true,
      baggage: true,
      taxiColumnId: 0,
      route: [
        {"name": "вход м.Шевченко.","lat": 50.474613, "lng": 30.506389},
        {"name": "м.Иподром.","lat": 50.377615, "lng": 30.468195}
      ],
      taxiColumnId: 0
    };

    const credentials = `${user.phone}:${user.hashedPassword}`; // Використайте дані з контексту
    console.log(credentials)
    const base64Credentials = encode(credentials);
    console.log(base64Credentials)

    try {
      const response = await axios.post(`${ServerApi}weborders/cost`, requestData, {
        headers: {
          Authorization: `Basic ${base64Credentials}`,
          'X-WO-API-APP-ID': user.token, // Замініть на ваш app ID
          'X-API-VERSION': `1.52.1 `// Замініть на версію API
        }
      });

      const responseData = response.data;

      setResponseText(responseData);
    } catch (error) {
      console.error('Error calculating cost:', error);
      setResponseText('Error calculating cost');
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
      console.log(versionData)
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
      <Text style={styles.responseText}>{responseText}</Text>
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