import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { ServiceContext } from '../../Context/ServiceContext';

export const PaymentSelection = ({ navigation }) => {
  const { payment, setPayment } = useContext(ServiceContext);

  const handlePaymentSelection = (selectedPayment) => {
    setPayment(selectedPayment); 
    navigation.navigate('Home'); 
  };

  return (
    <View style={styles.container}>
      <Button title="Готівка" onPress={() => handlePaymentSelection(0)} />
      <Button title="Безготівковий" onPress={() => handlePaymentSelection(1)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PaymentSelection;