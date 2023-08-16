import React, { useState } from 'react';
import { View } from 'react-native';
import axios from 'axios';
import { SearchWithSuggestions } from './SearchWithSuggestions';

export const VisicomSearchWithSuggestions = () => {
  const [fromSuggestion, setFromSuggestion] = useState({ query: '', data: null });
  const [toSuggestion, setToSuggestion] = useState({ query: '', data: null });
  const [timer, setTimer] = useState(null);

  const handleSearchChange = async (text, setSuggestion) => {
    setSuggestion((prevSuggestion) => ({ ...prevSuggestion, query: text }));

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

        const suggestionData = response.data;
        setSuggestion((prevSuggestion) => ({ ...prevSuggestion, data: suggestionData }));
        console.log('Suggestion Data:', suggestionData);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestion((prevSuggestion) => ({ ...prevSuggestion, data: null }));
      }
    }, 1500);

    setTimer(newTimer);
  };

  const handleSuggestionChange = (suggestion, setSuggestion) => {
    let inputText;
    if (suggestion.properties.address) {
      inputText = suggestion.properties.address;
    } else {
      inputText = suggestion.properties.name;
    }
    setSuggestion({ query: inputText, data: null });
  };

  return (
    <View>
      <SearchWithSuggestions
        placeholder="Звідки їдемо?"
        suggestion={fromSuggestion}
        onSearchChange={(text) => handleSearchChange(text, setFromSuggestion)}
        onSuggestionChange={(suggestion) => handleSuggestionChange(suggestion, setFromSuggestion)}
      />
      <SearchWithSuggestions
        placeholder="Куди їдемо?"
        suggestion={toSuggestion}
        onSearchChange={(text) => handleSearchChange(text, setToSuggestion)}
        onSuggestionChange={(suggestion) => handleSuggestionChange(suggestion, setToSuggestion)}
      />
    </View>
  );
};

export default VisicomSearchWithSuggestions;