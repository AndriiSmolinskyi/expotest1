import React, { useState } from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';
import axios from 'axios';

export const VisicomSearchWithSuggestions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestion, setSuggestion] = useState(null); // Змінено state на об'єкт
  const [timer, setTimer] = useState(null);

  const handleSearchChange = async (text) => {
    setSearchQuery(text);

    if (timer) {
      clearTimeout(timer);
    }

    const newTimer = setTimeout(async () => {
      const apiUrl = 'https://api.visicom.ua/data-api/5.0/uk/geocode.json';
      const apiKey = '20a396a7d85377ccd96d9491b7889643';

      try {
        const response = await axios.get(apiUrl, {
          params: {
            lang: 'uk',
            text: text,
            limit: 1,
            key: apiKey,
          },
        });

        // Отримання підказки з API та оновлення стану
        const suggestionData = response.data.properties; // Один об'єкт
        setSuggestion(suggestionData);
        console.log(suggestionData);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestion(null);
      }
    }, 1500); // Затримка 0.5 секунди (500 мілісекунд)

    // Збереження таймера
    setTimer(newTimer);
  };

  return (
    <View>
      <TextInput
        placeholder="Введіть текст пошуку"
        value={searchQuery}
        onChangeText={handleSearchChange}
      />
      {suggestion && (
        <View>
          <Text>Назва: {suggestion.name}</Text>
          <Text>Адреса: {suggestion.address}</Text>
        </View>
      )}
    </View>
  );
};

export default VisicomSearchWithSuggestions;