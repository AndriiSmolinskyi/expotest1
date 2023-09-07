import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export const SearchWithSuggestions = ({ placeholder, suggestion, onSearchChange, onSuggestionChange }) => {
    return (
      <View>
        <TextInput
          placeholder={placeholder}
          value={suggestion.query}
          onChangeText={onSearchChange}
        />
        {suggestion.data && (
          <TouchableOpacity onPress={() => onSuggestionChange(suggestion.data)}>
            <View>
              <Text>{suggestion.data.properties.name}</Text>
              <Text>{suggestion.data.properties.address}</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
};
