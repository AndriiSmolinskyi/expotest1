import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { ServiceContext } from '../../Context/ServiceContext';
import Icon from 'react-native-vector-icons/FontAwesome';

export const PaymentSelection = ({ navigation }) => {
  const { payment, setPayment, setService, service } = useContext(ServiceContext);

  const handlePaymentSelection = (selectedPayment) => {
    setPayment(selectedPayment); 
    navigation.navigate('Home'); 
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.close} onPress={() => navigation.navigate('Home')}>
        <Icon name="times" size={30} color={'black'} style={styles.close__icon}/>
      </TouchableOpacity>
      <Text style={styles.title}>Тип оплати</Text>
      <TouchableOpacity style={styles.saveOrder} onPress={() => handlePaymentSelection(0)}>
        <Text style={styles.saveOrder__text}>Готівка</Text>
      </TouchableOpacity> 
      {/* <Button title="Безготівковий" onPress={() => handlePaymentSelection(1)} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  close:{
    position: 'absolute',
    left: 15,
    top: '1%',
    zIndex: 2,
  },
  title:{
    fontSize: 20,
  },
  saveOrder:{
    backgroundColor: '#4CE5B1',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    width: '85%',
    marginTop: 15,
  },
  saveOrder__text:{
    color: 'white',
    fontSize: 18,
  },
});

export default PaymentSelection;