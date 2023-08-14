import React, { useState } from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';
import axios from 'axios';

export const VisicomSearchWithSuggestions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSearchChange = async (text) => {
    setSearchQuery(text);

    const apiUrl = 'https://api.visicom.ua/data-api/5.0/uk/geocode.json';
    const apiKey = '20a396a7d85377ccd96d9491b7889643'; // Замініть на ваш ключ доступу

    try {
      const response = await axios.get(apiUrl, {
        params: {
          lang: 'uk',
          text: text,
          limit: 3, // Обмеження на кількість підказок
          key: apiKey,
        },
      });

      // Отримання підказок з API та оновлення стану
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Введіть текст пошуку"
        value={searchQuery}
        onChangeText={handleSearchChange}
      />
    </View>
  );
};

export default VisicomSearchWithSuggestions;