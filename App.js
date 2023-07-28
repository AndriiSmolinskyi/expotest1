import { View, Text, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {
  const [items, setItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = () => {
    axios('https://jsonplaceholder.typicode.com/posts')
      .then(response => setItems(response.data))
      .finally(() => setRefreshing(false));
  };

  useEffect(() =>{
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <View key={item.id}>
            <Text>{item.title}</Text>
            <Text>{item.body}</Text>
            <Text></Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});