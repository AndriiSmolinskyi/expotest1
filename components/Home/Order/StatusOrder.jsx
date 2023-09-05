import { useContext, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { ServerApi } from "../../../ServerApi";
import axios from "axios";
import { OrderContext } from "../../Context/OrderContext";
import { DeleteOrder } from "./DeleteOrder";

export const StatusOrder = () => {
    const { status, setStatus, uid, auth } = useContext(OrderContext)

    const statusingOrder = async () => {
        try {
            const response = await axios.get(`${ServerApi}/weborders/${uid}`, {
                headers:{
                    'Accept': 'application/json',
                    'Authorization': auth
                }
            })

            const responseData = response.data;
            setStatus(responseData)
            console.log(responseData)
        } catch (error){
            if (error.response.status === 401) {
                console.error('Error calculating cost: Unauthorized');
            } else {
                console.error(error);
            }
        }
    }

    useEffect(() => {
        if(uid){
            statusingOrder()
        }       
    }, [uid]);

    return status ? (
        <View>
            <Text>{status.dispatching_order_uid}</Text>
            <DeleteOrder></DeleteOrder>
        </View>    
    ) : (
        <View><Text>Завантаження</Text></View>    
    )
} 