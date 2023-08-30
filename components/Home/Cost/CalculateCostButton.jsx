import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { TrafficCard } from './TrafficCard'; 
import axios from 'axios';
import { ServerApi } from '../../../ServerApi';
import { UserContext } from '../../Context/UserContext'; 
import { GeoAdressContext } from '../../Context/GeoAdressContext';
import { ServiceContext } from "../../Context/ServiceContext";
import { OrderContext } from '../../Context/OrderContext';

export const CalculateCostButton = ({navigation}) => {
  const [ tariffData, setTariffData ] = useState([]);
  const [ selectedTariff, setSelectedTariff ] = useState(null);
  const { setRequest, auth } = useContext(OrderContext)
  const { startLocation, endLocation, clearGeoData } = useContext(GeoAdressContext); 
  const { service, comment, payment } = useContext(ServiceContext);

  const handleCalculateCost = async () => {


    const requestData = {
      reservation: false,
      comment: comment,
      payment_type: payment,
      calculated_tariff_names: [
        "Базовый",
        "Универсал",
        "Бизнес-класс",
        "Микроавтобус",
        "Премиум-класс",
        "Эконом-класс",
      ],
      taxiColumnId: 0,
      extra_charge_codes: service,
      route: [
        {"name":startLocation.name,"lat":startLocation.lat, "lng":startLocation.lng},
        {"name":endLocation.name,"lat":endLocation.lat, "lng":endLocation.lng}
      ]
    };

    try {
      const response = await axios.post(`${ServerApi}weborders/tariffs/cost`, requestData, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': auth,
          'X-API-VERSION': '1.52.1' 
        }
      });
      
      const responseData = response.data;
      setTariffData(responseData); 

      if(selectedTariff === null){
        setSelectedTariff(responseData[0]);
      }    
      
      if (selectedTariff) {
        const updatedSelectedTariff = responseData.find(tariff => tariff.flexible_tariff_name === selectedTariff.flexible_tariff_name);
        setSelectedTariff(updatedSelectedTariff);
      }  

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
  }, [startLocation, endLocation, service, comment, payment]);

  const saveToOrder = () =>{
    const requestToOrder = {
      tariff: selectedTariff.flexible_tariff_name,
      comm: comment,
      pay: payment,
      taxiCol: 0,
      serviceAdd: service,   
      road: [
        {"name":startLocation.name,"lat":startLocation.lat, "lng":startLocation.lng},
        {"name":endLocation.name,"lat":endLocation.lat, "lng":endLocation.lng}
      ]
    }
    setRequest(requestToOrder);
    clearGeoData()
  }

  return (
    <View style={styles.container}>     
      <View style={styles.trafficContainer}>
        {tariffData.map((tariff, index) => (
          <TrafficCard key={index} tariffData={tariff}             
          selectedTariff={selectedTariff} 
          setSelectedTariff={setSelectedTariff} 
          />            
        ))}
      </View>    
      {selectedTariff 
        ? (<Text>{selectedTariff.order_cost_details.order_cost}</Text>) 
        : (<Text></Text>)
      }
      <Button title="ServicesSelection" onPress={() => navigation.navigate('ServicesSelection')} />
      <Button title="Comment" onPress={() => navigation.navigate('Comment')} />
      <Button title="Select Payment" onPress={() => navigation.navigate('PaymentSelection')} />
      <Button title="Save" onPress={saveToOrder} />
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
});

export default CalculateCostButton;
