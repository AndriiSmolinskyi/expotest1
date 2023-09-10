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

  const isSelected = selectedTariff && selectedTariff.flexible_tariff_name === flexible_tariff_name;
  const cardStyles = [styles.card, isSelected ? styles.selectedCard : null];

  return (
    <View style={cardStyles}>
      <TouchableOpacity onPress={selectTariff} style={styles.card__block}>
        <Icon name={iconName} size={30} color="black" />
        <Text style={styles.tariffName}>{formattedTariffName}</Text>
        <Text style={styles.tariff__price}>{order_cost_details.order_cost}{order_cost_details.currency}</Text>
      </TouchableOpacity>      
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 100,
    height: 100,
    margin: 5,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  selectedCard: {
    borderBottomWidth: 1,
    borderColor: '#4CE5B1'
  },
  card__block:{
    justifyContent: 'center', 
    alignItems: 'center',
    width: 100,
    height: 100,
  },
  tariffName: {
    marginTop: 5,
    marginBottom: 5,
    color: '#8a8a8b',
    fontSize: 18,
  }, 
  tariff__price:{
    color: '#C8C7CC',
    fontSize: 16,
  },
});