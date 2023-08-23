import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const TrafficCard = ({ tariffData }) => {
  const { flexible_tariff_name, order_cost_details } = tariffData;

  return (
    <View style={styles.card}>
      <Text style={styles.tariffName}>{flexible_tariff_name}</Text>
      {order_cost_details ? (
        <>
          <Text>{order_cost_details.order_cost}{order_cost_details.currency}</Text>
          <Text>Can Pay Bonuses: {order_cost_details.can_pay_bonuses ? 'TRUE' : 'FALSE'}</Text>
        </>
      ) : (
        <Text>No data available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '23%',
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  tariffName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default TrafficCard;