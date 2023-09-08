import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export const SearchWithSuggestions = ({ placeholder, suggestion, onSearchChange, onSuggestionChange }) => {

  const maxTextLength = 60; 

  // Функція для обрізання тексту
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <View style={styles.inputsBlock}>
      <TextInput
        placeholder={placeholder}
        value={suggestion.query}        
        onChangeText={onSearchChange}
        style={styles.input}        
      />
      {suggestion.data && (
        <TouchableOpacity onPress={() => onSuggestionChange(suggestion.data)} style={styles.sugges}>
          <View>
            <Text style={styles.sugges__name}>
              {truncateText(suggestion.data.properties.name, maxTextLength)}
            </Text>
            {suggestion.data.properties.address && (
              <Text style={styles.sugges__adr}>{truncateText(suggestion.data.properties.address, maxTextLength)}</Text>
            )}
          </View>
        </TouchableOpacity>
      )}
    </View>
  );  
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#d9d9dd',
        paddingHorizontal: 15,
        height: 48,
        borderRadius: 10,
        fontSize: 18,
    },
    sugges: {
        marginLeft: 15,
        marginTop: 10,
    },
    sugges__name: {
        fontSize: 18,
    }, sugges__adr:{
      fontSize: 16,
      marginTop: 5,
      color: '#a1a1a3',
    }
});