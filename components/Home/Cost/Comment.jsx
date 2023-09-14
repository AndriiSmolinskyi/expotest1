import React, { useContext, useState } from 'react';
import { ServiceContext } from '../../Context/ServiceContext';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

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
      
      <View style={styles.comment}>
        <Icon name="comment" size={28} color="#32323b" style={styles.comment__icon}/>
        <TextInput
          type="text"
          value={draftComment}
          onChangeText={(text) => commentChange(text)}
          placeholder='Уточнення для водія'
          style={styles.comment__input}
        />
      </View>

      <Button title="Save Comment" onPress={saveComment} style={styles.comment__btn}/>
    </View>
  );
};

const styles = StyleSheet.create({

});

export default Comment;