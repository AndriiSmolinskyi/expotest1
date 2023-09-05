import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export const TrafficCard = ({ tariffData, selectedTariff, setSelectedTariff }) => {
  const { flexible_tariff_name, order_cost_details } = tariffData;

  const selectTariff = () =>{
    setSelectedTariff(tariffData)
  }


  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={selectTariff}>
        <Text style={styles.tariffName}>{flexible_tariff_name}</Text>
        {order_cost_details ? (
          <>
            <Text>{order_cost_details.order_cost}{order_cost_details.currency}</Text>
          </>
        ) : (
          <Text>No data available</Text>
        )}
      </TouchableOpacity>      
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
  }
});

export default TrafficCard;