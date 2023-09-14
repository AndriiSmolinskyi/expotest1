import React, { useContext, useState } from 'react';
import { ServiceContext } from '../../Context/ServiceContext';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export const Comment = ({ navigation }) => {
  const { comment, setComment } = useContext(ServiceContext);
  const [ draftComment, setDraftComment ] = useState(comment);

  const commentChange = (text) => {
    setDraftComment(text); 
  };

  const saveComment = () => {
    setComment(draftComment); 
    navigation.navigate('Home'); 
  };

  return (
    <View style={styles.сommentContainer}>

      <TouchableOpacity style={styles.close} onPress={() => navigation.navigate('Home')}>
        <Icon name="times" size={30} color={'black'} style={styles.close__icon}/>
      </TouchableOpacity>

      <View style={styles.comment}>
        <Icon name="comment" size={35} color="#32323b" style={styles.comment__icon}/>
        <TextInput
          type="text"
          value={draftComment}
          onChangeText={(text) => commentChange(text)}
          placeholder='Уточнення для водія'
          style={styles.comment__input}
          maxLength={120}
        />          
      </View>
 
      <TouchableOpacity style={styles.service__btn} onPress={saveComment}>
        <Text style={styles.service__btn__text}>Готово</Text>
      </TouchableOpacity> 

    </View>
  );
};

const styles = StyleSheet.create({
  service__btn:{
    backgroundColor: '#4CE5B1',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: '80%',
    alignSelf: 'center',
    marginTop: 20,
  },
  service__btn__text:{
    color: 'white',
    fontSize: 17,
  },
  close:{
    position: 'absolute',
    left: '5%',
    top: '10%',
    zIndex: 2,
  },
  сommentContainer:{
    paddingTop: '15%',
    paddingHorizontal: '5%',
  },
  comment:{
    flexDirection: 'row',
    height: 48,
    alignItems: 'center',
    gap: 15,
  },
  comment__input:{
    backgroundColor: '#d9d9dd',
    paddingHorizontal: 15,
    borderRadius: 10,
    fontSize: 18,
    width: '85%',
    height: 40,
  },
});

export default Comment;