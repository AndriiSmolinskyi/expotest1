import React, { useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { ServerApi } from '../../ServerApi';

const CalculateCostButton = () => {
  const [responseText, setResponseText] = useState('');

  const handleCalculateCost = async () => {
    const requestData = {
        user_full_name:"",
        user_phone:"380989058658",
        client_sub_card:null,
        required_time:null,
        reservation:false,
        route_address_entrance_from:null,
        comment:"",
        add_cost:12.0,
        wagon:true,
        minibus:false,
        premium:false,
        flexible_tariff_name: "",
        baggage:false,
        animal:false,
        conditioner:true,
        courier_delivery:false,
        route_undefined:false,      
        terminal:false,  
        receipt:false,    
        route:
        [
            {"name":"вход м.Шевченко.","lat":50.474613, "lng":30.506389},
            {"name":"м.Иподром.","lat":50.377615, "lng":30.468195}
        ],
        taxiColumnId:0
    };

    const apiUrl = `${ServerApi}weborders/cost`;

    try {
      const response = await axios.post(apiUrl, requestData)

      const responseData = response.data;

      // Обробка результату відповіді сервера
      setResponseText(JSON.stringify(responseData, null, 2));
    } catch (error) {
      console.error('Error calculating cost:', error);
      setResponseText('Error calculating cost');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Calculate Cost" onPress={handleCalculateCost} />
      <Text style={styles.responseText}>{responseText}</Text>
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
});

export default CalculateCostButton;