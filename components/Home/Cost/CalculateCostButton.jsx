import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { TrafficCard } from './TrafficCard'; 
import axios from 'axios';
import { ServerApi } from '../../../ServerApi';
import { UserContext } from '../../Context/UserContext'; 
import { GeoAdressContext } from '../../Context/GeoAdressContext';
import { encode } from 'base-64';

export const CalculateCostButton = () => {
  const [tariffData, setTariffData] = useState([]);
  const { user } = useContext(UserContext); 
  const { startLocation, endLocation } = useContext(GeoAdressContext); 
  const [baggage, setBaggage] = useState(false);
  const [animal, setAnimal] = useState(false);
  const [conditioner, setConditioner] = useState(false);

  const handleToggle = (setStatus) => {
    return () => { 
      setStatus(prevStatus => !prevStatus);
    };
  };

  const handleCalculateCost = async () => {
    const credentials = `${user.phone}:${user.hashedPassword}`;
    const base64Credentials = encode(credentials);

    const requestData = {
      reservation: false,
      comment: '',
      baggage: baggage,
      animal: animal,
      conditioner: conditioner,
      payment_type: null,
      calculated_tariff_names: [
        "Базовый",
        "Универсал",
        "Бизнес-класс",
        "Микроавтобус",
        "Премиум-класс",
        "Эконом-класс",
      ],
      taxiColumnId: 0,
      extra_charge_codes: [ "CONDIT", "ANIMAL", "ENGLISH", "BABY_SEAT"],
      route: [
        {"name":startLocation.name,"lat":startLocation.lat, "lng":startLocation.lng},
        {"name":endLocation.name,"lat":endLocation.lat, "lng":endLocation.lng}
      ]
    };
    console.log(requestData)

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
      setTariffData(responseData); 
    } catch (error) {
      if (error.response.status === 401) {
        console.error('Error calculating cost: Unauthorized');
      } else {
        throw error;
      }
    }
  };

  useEffect(() => {
    if (startLocation && endLocation) {
      handleCalculateCost();
    }
  }, [startLocation, endLocation, baggage, animal, conditioner]);

  const handleFetchSettings = async () => {
    try {
      const response = await axios.get(`${ServerApi}settings`);
      const settingsData = response.data;
      console.log("Settings Data:", settingsData);
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  return (
    <View style={styles.container}>     
      <View style={styles.trafficContainer}>
        {tariffData.map((tariff, index) => (
          <TrafficCard key={index} tariffData={tariff} />
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <Button title={`baggage ${baggage ? 0 : 1}`} onPress={handleToggle(setBaggage)}/>
        <Button title={`animal ${animal ? 0 : 1}`} onPress={handleToggle(setAnimal)} />
        <Button title={`conditioner ${conditioner ? 0 : 1}`} onPress={handleToggle(setConditioner)} />
        <Button title="Fetch Settings" onPress={handleFetchSettings} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  trafficContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  responseText: {
    marginTop: 20,
    fontFamily: 'monospace',
  },
  buttonContainer:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  }
});

export default CalculateCostButton;
