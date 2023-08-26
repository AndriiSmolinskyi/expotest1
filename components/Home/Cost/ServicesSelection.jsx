// import React, { useState, useEffect, useContext } from "react";
// import { View, Button, Text } from "react-native";
// import { ServiceContext } from "../../Context/ServiceContext";

// export const ServicesSelection = ({ navigation }) => {
//   const [selectedServices, setSelectedServices] = useState([]);
//   const { setService } = useContext(ServiceContext);

//   const availableServices = [
//     "BAGGAGE", "ANIMAL", "CONDIT", "MEET", "COURIER",
//     "CHECK", "BABY_SEAT", "NO_SMOKE", "ENGLISH",
//     "CABLE", "FUEL", "WIRES", "SMOKE"
//   ];

//   useEffect(() => {
//     setService(selectedServices)
//   }, [selectedServices]);

//   const toggleService = (services) => {
//     if (selectedServices.includes(services)) {
//       setSelectedServices(selectedServices.filter(item => item !== services));
//     } else {
//       setSelectedServices([...selectedServices, services]);
//     }
//   };

//   return (
//     <View>
//       {availableServices.map(services => (
//         <View key={services}>
//           <Button
//             title={services}
//             onPress={() => toggleService(services)}
//             color={selectedServices.includes(services) ? "green" : "red"}
//           />
//         </View>
//       ))}
//       <Text>Selected services: {selectedServices.join(", ")}</Text>
//       <Button title="Home" onPress={() => navigation.navigate('Home')} />
//     </View>
//   );
// };

// export default ServicesSelection;

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

  const toggleService = (service) => {
    if (selectedServices.includes(service)) {
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
            title={service}
            onPress={() => toggleService(service)}
            color={selectedServices.includes(service) ? "green" : "red"}
          />
        </View>
      ))}
      <Text>Selected services: {selectedServices.join(", ")}</Text>
      <Button title="Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

export default ServicesSelection;