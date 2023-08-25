import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export const BtnFunc = () => {
  const [baggage, setBaggage] = useState(false);
  const [animal, setAnimal] = useState(false);
  const [conditioner, setConditioner] = useState(false);
  
  const handleToggle = (setStatus) => {
    console.log(`-------------------------------------`)
    console.log(`baggage ${baggage}`)
    console.log(`animal ${animal}`)
    console.log(`conditioner ${conditioner}`)
    return () => { 
      setStatus(prevStatus => !prevStatus);
    };
  };

  return (
    <View style={styles.buttonContainer}>
      <Button title={`baggage ${baggage ? 0 : 1}`} onPress={handleToggle(setBaggage)} />
      <Button title={`animal ${animal ? 0 : 1}`} onPress={handleToggle(setAnimal)} />
      <Button title={`conditioner ${conditioner ? 0 : 1}`} onPress={handleToggle(setConditioner)} />
    </View>
  );
};

const styles = StyleSheet.create({

  buttonContainer: {
    marginBottom: 5,
  },
});