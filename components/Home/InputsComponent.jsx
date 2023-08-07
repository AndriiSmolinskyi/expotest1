import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export const InputsComponent = ({ onOriginChange, onDestinationChange }) => {
  const handleInputsSubmit = () => {
    // Do any validation or processing here
    // Pass the origin and destination back to the Home component
    onOriginChange('New Origin');
    onDestinationChange('New Destination');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Звідки їдемо?"
        onChangeText={onOriginChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Куди їдемо?"
        onChangeText={onDestinationChange}
      />
      <Button title="Показати маршрут" onPress={handleInputsSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
});

export default InputsComponent;