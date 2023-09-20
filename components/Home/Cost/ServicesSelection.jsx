import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ServiceContext } from "../../Context/ServiceContext";
import Icon from 'react-native-vector-icons/FontAwesome';

export const ServicesSelection = ({ navigation }) => {
  const { service, setService } = useContext(ServiceContext);
  const [selectedServices, setSelectedServices] = useState(service);

  const availableServices = [
    "BAGGAGE", "ANIMAL", "CONDIT", "MEET", "COURIER",
    "CHECK", "BABY_SEAT", "NO_SMOKE", "ENGLISH",
    "CABLE", "FUEL", "WIRES", "SMOKE"
  ];

  const serviceTranslations = {
    BAGGAGE: "Додатковий багаж в салон",
    ANIMAL: "З тваринкою",
    CONDIT: "Кондиціонер",
    MEET: "Зустріч з табличкою",
    COURIER: "Кур'єр",
    CHECK: "Чек",
    BABY_SEAT: "Дитяче крісло",
    NO_SMOKE: "Водій не палить",
    ENGLISH: "Англомовний водій",
    CABLE: "Трос",
    FUEL: "Підвезти бензин",
    WIRES: "Дроти",
    SMOKE: "Куріння під час поїздки",
  };

  const isServiceSelected = (service) => selectedServices.includes(service);

  const toggleService = (service) => {
    if (isServiceSelected(service)) {
      setSelectedServices(selectedServices.filter(item => item !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  useEffect(() => {
    setService(selectedServices);
  }, [selectedServices]);

  return (
    <View style={styles.serviceContainer}>

      <TouchableOpacity style={styles.close} onPress={() => navigation.navigate('Home')}>
        <Icon name="times" size={30} color={'black'} style={styles.close__icon}/>
      </TouchableOpacity>
      <Text style={styles.service__title}>Додаткові послуги</Text>
      {availableServices.map(service => (
        <TouchableOpacity key={service} onPress={() => toggleService(service)} style={styles.service}>
            <Text style={styles.service__text}>{serviceTranslations[service]}</Text>
            {isServiceSelected(service) && (<Text style={styles.service__icon}>✓</Text>) }
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.service__btn} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.service__btn__text}>Готово</Text>
      </TouchableOpacity> 
    </View>
  );
};

const styles = StyleSheet.create({
  serviceContainer:{
    paddingTop: '11%',
  },
  service__title:{
    backgroundColor: '#dcdadf',
    height: 34,
    textAlignVertical: 'center',
    paddingLeft: 15,
    color: '#68686a',
    fontSize: 16,
  },
  service:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#C8C7CC', 
    borderBottomWidth: 1, 
    paddingHorizontal: 15,
    height: 40,
    alignItems: 'center'
  },  
  service__text:{
    color: '#32323b',
    fontSize: 16,
  },
  service__icon:{
    color: '#32323b',
    fontSize: 16,
  },
  service__btn:{
    backgroundColor: '#4CE5B1',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: '80%',
    alignSelf: 'center',
    marginTop: 20,
  },
  service__btn__text:{
    color: 'white',
    fontSize: 17,
  },
  close:{
    position: 'absolute',
    left: 15,
    top: '1%',
    zIndex: 2,
  },
});

export default ServicesSelection;

