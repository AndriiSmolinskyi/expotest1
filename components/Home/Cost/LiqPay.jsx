import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import { OrderContext } from '../../Context/OrderContext';
import { ServerApi } from '../../../ServerApi';
import axios from 'axios';

export const LiqPay = ({navigation}) =>{
    const {userData, auth,  request, setRequest, uid, setUid, status, setStatus} = useContext(OrderContext);
    const [idPay, setIdPay] = useState();

    const addCard = async () => {
        const amount = 6.50;
        console.log('-------------')
        try {
            const response = await axios.post(`${ServerApi}/clients/balance/transactions`, amount , {
                headers:{
                    'Accept': 'application/json',
                    'Authorization': auth,
                }
            })
            
            const responseData = response.data;
            console.log(responseData)
            console.log(response)
        } catch (error){
            if (error.response) {
                if (error.response.status === 401) {
                    console.error('Клієнт не авторизований');
                } else if (error.response.status === 503) {
                    console.error('Оплата через платіжну систему заборонена');
                } else if (error.response.status === 400) {
                    console.error('Невірна категорія клієнта або інша помилка');
                }
            } else {
                console.error('Помилка запиту до сервера', error.message);
            }
        }
    }

    return(
        <View>
            <TouchableOpacity onPress={addCard}>
                <Text>Оплатити</Text>
            </TouchableOpacity>
        </View>    
    )
}

export default LiqPay;