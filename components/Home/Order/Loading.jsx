import React from 'react';
import {ActivityIndicator, StyleSheet, View, Text} from 'react-native';
import DeleteOrder from './DeleteOrder';

const Loading = ({titlename}) => {
  return (
    <View style={ styles.container}>
      <Text style={styles.title}>{titlename}</Text>
      <ActivityIndicator color="#4CE5B1" style={styles.customSize} size={150}/>
      <DeleteOrder></DeleteOrder>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title:{
    fontSize: 24,   
    textAlign: 'center',
    marginBottom: 10
  },
});

export default Loading;