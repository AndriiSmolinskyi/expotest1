import { View,  Button} from "react-native";

export const ServicesSelection = ({ selectedServices, setSelectedServices }) => {
    const availableServices = [
      "BAGGAGE", "ANIMAL", "CONDIT", "MEET", "COURIER",
      "CHECK", "BABY_SEAT", "NO_SMOKE", "ENGLISH",
      "CABLE", "FUEL", "WIRES", "SMOKE"
    ];
  
    const toggleService = (service) => {
      if (selectedServices.includes(service)) {
        setSelectedServices(selectedServices.filter(s => s !== service));
      } else {
        setSelectedServices([...selectedServices, service]);
      }
    };
  
    return (
      <View>
        {availableServices.map(service => (
          <Button
            key={service}
            title={`${service} ${selectedServices.includes(service) ? "0" : "1"}`}
            onPress={() => toggleService(service)}
          />
        ))}
        <Button title="Home" onPress={() => navigation.navigate('Home')} />
      </View>
    );
  };