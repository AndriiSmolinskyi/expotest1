// import React, { useState, useContext } from 'react';
// import { View, Button, Text, StyleSheet } from 'react-native';
// import axios from 'axios';
// import { ServerApi } from '../../../ServerApi';
// import { UserContext } from '../../Context/UserContext'; 
// import { GeoAdressContext } from '../../Context/GeoAdressContext';
// import { encode } from 'base-64';

// export const CalculateCostButton = () => {
//   const [responseText, setResponseText] = useState('');
//   const { user } = useContext(UserContext); 
//   const {startLocation, endLocation} = useContext(GeoAdressContext); 

//   const handleCalculateCost = async () => {
//     const credentials = `${user.phone}:${user.hashedPassword}`;
//     const base64Credentials = encode(credentials);

//     const requestData = {
//       reservation: false,
//       calculated_tariff_names: [
//         "Базовый",
//         "Универсал",
//         "Бизнес-класс",
//         "Микроавтобус"
//         ],
//       baggage: true,
//       taxiColumnId: 0,
//       route: [
//         {"name":startLocation.name,"lat":startLocation.lat, "lng":startLocation.lng},
//         {"name":endLocation.name,"lat":endLocation.lat, "lng":endLocation.lng}
//       ]
//     };

//     try {
//       const response = await axios.post(`${ServerApi}weborders/tariffs/cost`, requestData, {
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json; charset=utf-8',
//           'Authorization': `Basic ${base64Credentials}`,
//           'X-API-VERSION': '1.52.1' 
//         }
//       });
    
//       const responseData = response.data;
//       console.log(response.data)
//       setResponseText(responseData); 
//     } catch (error) {
//       if (error.response.status === 401) {
//         console.error('Error calculating cost: Unauthorized');
//         setResponseText('Error calculating cost');
//       } else {
//         throw error;
//       }
//     }

//   };

//   return (
//     <View style={styles.container}>
//     <Button title="Calculate Cost" onPress={handleCalculateCost} />
//     <Text style={styles.responseText}>
//       <Text>UID: {responseText.dispatching_order_uid}</Text>
//       <Text>Order Cost: {responseText.order_cost}{responseText.currency}</Text>
//       <Text>Discount Trip: {responseText.discount_trip ? 'TRUE' : 'FALSE'}</Text>   
//       <Text>Can Pay Bonuses: {responseText.can_pay_bonuses ? 'TRUE' : 'FALSE'}</Text>         
//     </Text>
//   </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   responseText: {
//     marginTop: 10,
//     fontFamily: 'monospace',
//   },
// });

// export default CalculateCostButton;

import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TrafficCard } from './TrafficCard'; // Шлях до вашого дочірнього компонента
import axios from 'axios';
import { ServerApi } from '../../../ServerApi';
import { UserContext } from '../../Context/UserContext'; 
import { GeoAdressContext } from '../../Context/GeoAdressContext';
import { encode } from 'base-64';

export const CalculateCostButton = () => {
  const [tariffData, setTariffData] = useState([]);
  const { user } = useContext(UserContext); 
  const { startLocation, endLocation } = useContext(GeoAdressContext); 

  const handleCalculateCost = async () => {
    const credentials = `${user.phone}:${user.hashedPassword}`;
    const base64Credentials = encode(credentials);

    const requestData = {
      reservation: false,
      calculated_tariff_names: [
        "Базовый",
        "Универсал",
        "Бизнес-класс",
        "Микроавтобус"
      ],
      baggage: true,
      taxiColumnId: 0,
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
          'Authorization': `Basic ${base64Credentials}`,
          'X-API-VERSION': '1.52.1' 
        }
      });
    
      const responseData = response.data;
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
  }, [startLocation, endLocation]);

  return (
    <View style={styles.container}>
      <Text>Traffic Tariffs:</Text>
      <View style={styles.trafficContainer}>
        {tariffData.map((tariff, index) => (
          <TrafficCard key={index} tariffData={tariff} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  trafficContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
  responseText: {
    marginTop: 20,
    fontFamily: 'monospace',
  },
});

export default CalculateCostButton;