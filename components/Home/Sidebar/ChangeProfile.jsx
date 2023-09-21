import axios from "axios";
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { OrderContext } from '../../Context/OrderContext';
import { ServerApi } from "../../../ServerApi";
import Icon from 'react-native-vector-icons/FontAwesome';

export const ChangeProfile = ({navigation}) => {
    const { auth, userData, setUserData } = useContext(OrderContext);

    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleProfile = async () => {
        try {
            const response = await axios.put(`${ServerApi}/clients/profile`, {
                patch: "name",
                user_first_name: firstName,
                user_middle_name: middleName,
                user_last_name: lastName,
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': auth
                }
            });
            setUserData({
                ...userData, // Зберігаємо всі інші поля userData без змін
                user_full_name: `${firstName} ${middleName} ${lastName}`, // Оновлюємо поле user_full_name
              });

            navigation.navigate('Home');
        } catch (error) {
            if (error.response.status === 401) {
                console.error('Error calculating cost: Unauthorized');
            } else {
                console.error(error);
            }
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.close} onPress={() => navigation.navigate('Home')}>
                <Icon name="times" size={30} color={'black'} style={styles.close__icon} />
            </TouchableOpacity>

            <View>
                <Text style={styles.title}>Редагування профілю</Text>
            </View>
            
            <TextInput
                style={styles.input}
                placeholder="Ім'я"
                onChangeText={(text) => setFirstName(text.replace(/\s/g, ''))}
                value={firstName}
            />                    
            <TextInput
                style={styles.input}
                placeholder="По батькові"
                onChangeText={(text) => setMiddleName(text.replace(/\s/g, ''))}         
                value={middleName}
            />                
            <TextInput
                style={styles.input}
                placeholder="Прізвище"
                onChangeText={(text) => setLastName(text.replace(/\s/g, ''))}                        
                value={lastName}
            />
                        
            <TouchableOpacity style={styles.saveOrder} onPress={handleProfile}>
                <Text style={styles.saveOrder__text}>Зберегти</Text>
            </TouchableOpacity>
                                       
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    close: {
        position: 'absolute',
        top: 15,
        left: 15,
    },
    title: {
        fontSize: 24,
        marginBottom: 15,
    },
    input: {
        backgroundColor: '#d9d9dd',
        paddingHorizontal: 15,
        height: 48,
        borderRadius: 10,
        fontSize: 18,
        width: '85%',
        marginVertical: 15,
    },
    saveOrder: {
        backgroundColor: '#4CE5B1',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 44,
        width: '85%',
        marginTop: 15,
    },
    saveOrder__text: {
        color: 'white',
        fontSize: 18,
    },
    errorText:{
        color: 'red',
    },
});

export default ChangeProfile;