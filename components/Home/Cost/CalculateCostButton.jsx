import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import { TrafficCard } from './TrafficCard'; 
import axios from 'axios';
import { ServerApi } from '../../../ServerApi';
import { GeoAdressContext } from '../../Context/GeoAdressContext';
import { ServiceContext } from "../../Context/ServiceContext";
import { OrderContext } from '../../Context/OrderContext';
import Icon from 'react-native-vector-icons/FontAwesome';

export const CalculateCostButton = ({navigation}) => {
  const [ tariffData, setTariffData ] = useState([]);
  const [ selectedTariff, setSelectedTariff ] = useState(null);
  const { setRequest, auth } = useContext(OrderContext)
  const { startLocation, endLocation, clearGeoData } = useContext(GeoAdressContext); 
  const { service, comment, payment, clearServiceData } = useContext(ServiceContext);

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
    clearServiceData()
  }

  return (
  <View style={styles.container}>   
    <FlatList
      data={tariffData}
      renderItem={({ item, index }) => (
        <TrafficCard
          tariffData={item}
          selectedTariff={selectedTariff}
          setSelectedTariff={setSelectedTariff}
        />  
      )}
      horizontal
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
      style={styles.swiper}
    />

    {selectedTariff 
      ? (<Text>{selectedTariff.order_cost_details.order_cost} грн.</Text>) 
      : (<Text></Text>)
    }

    <View style={styles.serviceBtn}>
      <TouchableOpacity onPress={() => navigation.navigate('ServicesSelection')}>
        <Icon name="list-ul" size={30} color="black" />
        <Text>Послуги</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Comment')}>
        <Icon name="comment" size={30} color="black" />
        <Text>Коментар</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('PaymentSelection')}>
        {payment === null || 1 ? (<Icon name="money" size={30} color="black" />) : (<Icon name="credit-card" size={30} color="black" />)}
        <Text>Оплата</Text>
      </TouchableOpacity>      
    </View>

    <Button title="Save" onPress={saveToOrder} />
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  responseText: {
    marginTop: 20,
    fontFamily: 'monospace',
  },
  swiper:{
    paddingBottom: 5,
    paddingTop: 5,
  }, 

  serviceBtn: {
    flexDirection: 'row',
  }
});

export default CalculateCostButton;
