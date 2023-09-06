import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { OrderContext } from '../../Context/OrderContext';
import { useContext } from 'react';
import axios from 'axios';
import { ServerApi } from '../../../ServerApi';

const Sidebar = ({toggleVisibility}) => {

    const { auth, userData } = useContext(OrderContext)
    const executionStatus = 'SearchesForCar'
    const toggleHistory = async () => {
        console.log(userData)
        try {
            const response = await axios.get(`${ServerApi}clients/ordershistory`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': auth
                }
            });
    
            const responseData = response.data;
            console.log(responseData);
        } catch (error) {
            if (error.response === 401) {
                console.error('Unauthorized');
            } else {
                console.error(error);
            }
        }    
    }

    return(
        <View style={styles.sideCont}>        
            <View style={styles.side}>
                <Text>{userData.user_phone}</Text>
                <Button title="Close" onPress={toggleVisibility}/>
                <Button title="toggleHistory" onPress={toggleHistory}/>
            </View>
        </View>    
    )
}

const styles = StyleSheet.create({
    sideCont:{
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
    }, side:{
        width: '80%',
        height: '100%',
        backgroundColor: 'white',
    }
});

export default Sidebar;