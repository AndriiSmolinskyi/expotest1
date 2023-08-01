import { View, Text, Button } from 'react-native';

export const Register = ({ navigation }) =>{

    return(
        <View>
            <Text>Hy its register</Text>
            <Button title="Start" onPress={() => navigation.navigate('Start')}></Button>
        </View>
    )
}