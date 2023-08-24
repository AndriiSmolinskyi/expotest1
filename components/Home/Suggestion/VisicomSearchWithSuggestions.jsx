import React, { useState, useContext } from 'react';
import { View, Button } from 'react-native';
import axios from 'axios';
import { SearchWithSuggestions } from './SearchWithSuggestions';
import { GeoContext } from '../../Context/GeoContext';
import { GeoAdressContext } from '../../Context/GeoAdressContext';

export const VisicomSearchWithSuggestions = ({ navigation }) => {
  const [fromSuggestion, setFromSuggestion] = useState({ query: '', data: null });
  const [toSuggestion, setToSuggestion] = useState({ query: '', data: null });
  const [timer, setTimer] = useState(null);
  const { setStartCoords, setEndCoords } = useContext(GeoContext);
  const { setStartLocation, setEndLocation } = useContext(GeoAdressContext);
  
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
    }, 1000);

    setTimer(newTimer);
  };

  const handleSuggestionChange = (suggestion, setSuggestion, setCords, setLocation) => {
    const { coordinates } = suggestion.geo_centroid;
    setCords(coordinates);
    let inputText;
    if (suggestion.properties.address) {
      inputText = suggestion.properties.address;
      setLocation({"name": suggestion.properties.address, "lat": coordinates[0], "lng": coordinates[1]})
    } else {
      inputText = suggestion.properties.name;
      setLocation({"name": suggestion.properties.name, "lat": coordinates[0], "lng": coordinates[1]})
    }
    setSuggestion({ query: inputText, data: null });
  };

  return (
    <View>
      <SearchWithSuggestions
        placeholder="Звідки їдемо?"
        suggestion={fromSuggestion}
        onSearchChange={(text) => handleSearchChange(text, setFromSuggestion)}
        onSuggestionChange={(suggestion) => handleSuggestionChange(suggestion, setFromSuggestion, setStartCoords, setStartLocation)}
      />
      <SearchWithSuggestions
        placeholder="Куди їдемо?"
        suggestion={toSuggestion}
        onSearchChange={(text) => handleSearchChange(text, setToSuggestion)}
        onSuggestionChange={(suggestion) => handleSuggestionChange(suggestion, setToSuggestion, setEndCoords, setEndLocation)}
      />
      <Button title="Побудувати маршрут" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

export default VisicomSearchWithSuggestions;