import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import { TrafficCard } from './TrafficCard'; 
import axios from 'axios';
import { ServerApi } from '../../../ServerApi';
import { GeoAdressContext } from '../../Context/GeoAdressContext';
import { ServiceContext } from "../../Context/ServiceContext";
import { OrderContext } from '../../Context/OrderContext';
import { GeoContext } from '../../Context/GeoContext';
import Icon from 'react-native-vector-icons/FontAwesome';

export const CalculateCostButton = ({navigation}) => {
  const [ tariffData, setTariffData ] = useState([]);
  const [ selectedTariff, setSelectedTariff ] = useState(null);
  const { setRequest, auth } = useContext(OrderContext)
  const { startLocation, endLocation, clearGeoData } = useContext(GeoAdressContext); 
  const { service, comment, payment, clearServiceData } = useContext(ServiceContext);
  const { clearGeoCoords } = useContext(GeoContext);

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

  const deleteCost = () => {
    clearGeoData();
    clearGeoCoords();
    clearServiceData();
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
      ? (<Text style={styles.price}>{selectedTariff.order_cost_details.order_cost} грн.</Text>) 
      : (<Text></Text>)
    }

    <View style={styles.serviceBtn}>
      <TouchableOpacity onPress={() => navigation.navigate('ServicesSelection')} style={styles.serviceBtn__item}>
        <Icon name="list-ul" size={28} color="#32323b" />
        <Text style={styles.serviceBtn__item__text}>Послуги</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Comment')} style={styles.serviceBtn__item}>
        <Icon name="comment" size={28} color="#32323b" />
        <Text style={styles.serviceBtn__item__text}>Коментар</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('PaymentSelection')} style={styles.serviceBtn__item}>
        {payment === null || 1 ? (<Icon name="money" size={28} color="#32323b" />) : (<Icon name="credit-card" size={30} color="#32323b" />)}
        <Text style={styles.serviceBtn__item__text}>Оплата</Text>
      </TouchableOpacity>      
    </View>
    
   <View style={styles.btnBlock}>
    <TouchableOpacity style={styles.saveOrder} onPress={saveToOrder}>
      <Text style={styles.saveOrder__text}>Замовити</Text>
    </TouchableOpacity> 

    <TouchableOpacity style={styles.close} onPress={deleteCost}>
      <Icon name="times" size={30} color={'white'} style={styles.close__icon}/>
    </TouchableOpacity>  
   </View>

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
    borderBottomColor: '#C8C7CC', 
    borderBottomWidth: 1, 
    paddingBottom: 8, 
  },  
  price:{
    fontSize: 30,
    alignSelf: 'flex-start',
    color: '#32323b',
    paddingVertical: 8,
    paddingLeft: 5,
  },
  serviceBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderTopColor: '#C8C7CC',
    borderTopWidth: 1,
    paddingVertical: 8,
  },
  serviceBtn__item:{
    alignItems: 'center',
    padding: 5,
  },
  serviceBtn__item__text:{
    color: '#8a8a8b',
    fontSize: 15,
    marginTop: 3,
  },
  saveOrder:{
    backgroundColor: '#4CE5B1',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    width: '85%',
  },
  saveOrder__text:{
    color: 'white',
    fontSize: 18,
  },
  btnBlock:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 44,
    alignItems: 'center',
  },
  close:{
    backgroundColor: '#4CE5B1',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    width: '13%',
  }
});

export default CalculateCostButton;
