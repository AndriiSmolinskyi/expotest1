// SuggestionInput.js
import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export const SuggestionInput = ({ placeholder, value, onChangeText, suggestion, onSuggestionPress }) => {
  return (
    <View>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
      {suggestion && (
        <TouchableOpacity onPress={onSuggestionPress}>
          <View>
            <Text>Назва: {suggestion.properties.name}</Text>
            <Text>Адреса: {suggestion.properties.address}</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SuggestionInput;