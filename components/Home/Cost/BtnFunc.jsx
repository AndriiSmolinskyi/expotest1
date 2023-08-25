import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export const BtnFunc = ({ title, updateParams }) => {
  const [isTrue, setIsTrue] = useState(false);

  const handleToggle = () => {
    setIsTrue(prevState => !prevState);
  };

  return (
    <View style={styles.buttonContainer}>
      <Button title={title} onPress={handleToggle} />
      <Text>Стан: {isTrue ? 'Плюс' : 'Мінус'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({

  buttonContainer: {
    marginBottom: 5,
  },
});