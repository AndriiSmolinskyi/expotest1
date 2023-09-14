import React, { useState, useEffect, useContext } from "react";
import { View, Button, Text } from "react-native";
import { ServiceContext } from "../../Context/ServiceContext";

export const ServicesSelection = ({ navigation }) => {
  const { service, setService } = useContext(ServiceContext);
  const [selectedServices, setSelectedServices] = useState(service);

  const availableServices = [
    "BAGGAGE", "ANIMAL", "CONDIT", "MEET", "COURIER",
    "CHECK", "BABY_SEAT", "NO_SMOKE", "ENGLISH",
    "CABLE", "FUEL", "WIRES", "SMOKE"
  ];

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
    <View>
      {availableServices.map(service => (
        <View key={service}>
          <Button
            title={isServiceSelected(service) ? `+ ${service}` : service}
            onPress={() => toggleService(service)}
          />
        </View>
      ))}
      <Button title="Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

export default ServicesSelection;