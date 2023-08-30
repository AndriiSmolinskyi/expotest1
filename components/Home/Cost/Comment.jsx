import React, { useContext, useState } from 'react';
import { ServiceContext } from '../../Context/ServiceContext';
import { View, TextInput, Button } from 'react-native';

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
    <View>
      <TextInput
        type="text"
        value={draftComment}
        onChangeText={(text) => commentChange(text)}
      />
      <Button title="Save Comment" onPress={saveComment} />
    </View>
  );
};

export default Comment;