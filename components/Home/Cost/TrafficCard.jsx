// import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight} from 'react-native';

// const formatTariffName = (tariffName) => {
//   const nameMap = {
//     'Базовый': 'Базовий',
//     'Универсал': 'Універсал',
//     'Бизнес-класс': 'Бізнес',
//     'Микроавтобус': 'Мікроавтобус',
//     'Премиум-класс': 'Преміум',
//     'Эконом-класс': 'Економ'
//   };

//   const formattedName = nameMap[tariffName];
//   return formattedName || tariffName;
// };

// export const TrafficCard = ({ tariffData, selectedTariff, setSelectedTariff }) => {
//   const { flexible_tariff_name, order_cost_details } = tariffData;

//   const formattedTariffName = formatTariffName(flexible_tariff_name);

//   const selectTariff = () =>{
//     setSelectedTariff(tariffData)
//   }

//   return (
//     <View style={styles.card}>
//       <TouchableOpacity onPress={selectTariff}>
//         <Text style={styles.tariffName}>{formattedTariffName}</Text>
//         {order_cost_details ? (
//           <>
//             <Text>{order_cost_details.order_cost}{order_cost_details.currency}</Text>
//           </>
//         ) : (
//           <Text>No data available</Text>
//         )}
//       </TouchableOpacity>      
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     width: 100,
//     height: 70,
//     flex: 1,
//     justifyContent: 'center', 
//     alignItems: 'center', 
//     marginRight: 10,
//   },
//   tariffName: {
//     fontWeight: 'bold',
//     marginBottom: 5,
//   }
// });

// export default TrafficCard;

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Виберіть потрібний набір іконок

const nameMap = {
  'Базовый': 'Базовий',
  'Универсал': 'Універсал',
  'Бизнес-класс': 'Бізнес',
  'Микроавтобус': 'Мікроавтобус',
  'Премиум-класс': 'Преміум',
  'Эконом-класс': 'Економ',
};

export const TrafficCard = ({ tariffData, selectedTariff, setSelectedTariff }) => {
  const { flexible_tariff_name, order_cost_details } = tariffData;
  const formattedTariffName = nameMap[flexible_tariff_name] || flexible_tariff_name;

  const iconMap = {
    'Базовий': 'car',
    'Універсал': 'car',
    'Бізнес': 'car',
    'Мікроавтобус': 'bus',
    'Преміум': 'car', 
    'Економ': 'car', 
  };

  const iconName = iconMap[formattedTariffName] || 'car'; 
  const selectTariff = () => {
    setSelectedTariff(tariffData);
  }

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={selectTariff} style={styles.card__block}>
        <Icon name={iconName} size={30} color="black" />
        <Text style={styles.tariffName}>{formattedTariffName}</Text>
        <Text>{order_cost_details.order_cost}{order_cost_details.currency}</Text>
      </TouchableOpacity>      
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: 100,
    height: 100,
    marginRight: 10,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  card__block:{
    justifyContent: 'center', 
    alignItems: 'center',
    width: 100,
    height: 100,
  },
  tariffName: {
    fontWeight: 'bold',
  }, 
});