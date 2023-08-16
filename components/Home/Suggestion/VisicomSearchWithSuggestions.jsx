import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity} from 'react-native';
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
            text: `м. Київ, ${text}`,
            limit: 1,
            key: apiKey,
          },
        });

        // Отримання підказки з API та оновлення стану
        const suggestionData = response.data; // Один об'єкт
        setSuggestion(suggestionData);
        console.log(suggestionData);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestion(null);
      }
    }, 1500); 

    // Збереження таймера
    setTimer(newTimer);
  };

  const handleChange = () => {
    let inputText;
    if(suggestion.properties.address){
      inputText = suggestion.properties.address;
    } else {
      inputText = suggestion.properties.name;
    }   
    setSuggestion(null);
    setSearchQuery(inputText);
  } 

  return (
    <View>
      <TextInput
        placeholder="Звідки їдемо?"
        value={searchQuery}
        onChangeText={handleSearchChange}
      />
      {suggestion && (
      <TouchableOpacity onPress={handleChange}>
        <View>
          <Text>Назва: {suggestion.properties.name}</Text>
          <Text>Адреса: {suggestion.properties.address}</Text>
        </View>
      </TouchableOpacity>
      )}
      <TextInput
        placeholder="Куди їдемо?"
        value={searchQuery}
        onChangeText={handleSearchChange}
      />
      {suggestion && (
      <TouchableOpacity onPress={handleChange}>
        <View>
          <Text>Назва: {suggestion.properties.name}</Text>
          <Text>Адреса: {suggestion.properties.address}</Text>
        </View>
      </TouchableOpacity>
      )}
    </View>
  );
};

export default VisicomSearchWithSuggestions;