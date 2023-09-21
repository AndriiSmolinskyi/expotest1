import { View, Button, StyleSheet, Text, ActivityIndicator } from 'react-native'; // Додав імпорт ActivityIndicator

export const LoadingStart = () => {
    return(
        <View style={styles.loadingContainer}>
            <Text style={styles.loading__title}>ТАКСІ КИЇВ</Text>
            <ActivityIndicator size="120" color="green" />
        </View>
    )
}

const styles = StyleSheet.create({
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loading__title:{
        fontSize: 36,
    },
});
  
  export default LoadingStart;