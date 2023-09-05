import { OrderContext } from "../../Context/OrderContext";
import { useContext, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { ServerApi } from "../../../ServerApi";
import axios from "axios";

export const Order = () =>{
    const {userData, auth,  request, setRequest, uid, setUid} = useContext(OrderContext)
    
    const requestData = {
        user_full_name: userData.user_full_name,
        user_phone: userData.user_phone,
        comment: request.comm,
        flexible_tariff_name : request.tariff,
        extra_charge_codes: request.serviceAdd,
        route: request.road,
        payment_type: request.pay,
        taxiColumnId: request.taxiCol
    }
   
    const makeOrder = async () => {
        try {
            const response = await axios.post(`${ServerApi}/weborders`,requestData, {
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization': auth,
                    'X-API-VERSION': '1.52.1'
                }
            })

            const responseData = response.data;
            const orderId = response.data.dispatching_order_uid
            setUid(orderId)
            console.log(orderId)
        } catch (error){
            if (error.response.status === 401) {
                console.error('Error calculating cost: Unauthorized');
            } else {
                console.error(error.response.data.message);
            }
        }
    }

    useEffect(() => {
        if(!uid){
            makeOrder();
        }    
    }, []);

    useEffect(() => {
        statusOrder()
    }, [uid]);

    const statusOrder = async () => {
        try {
            const response = await axios.get(`${ServerApi}/weborders/${uid}`, {
                headers:{
                    'Accept': 'application/json',
                    'Authorization': auth
                }
            })

            const responseData = response.data;
            console.log(responseData)
        } catch (error){
            if (error.response.status === 401) {
                console.error('Error calculating cost: Unauthorized');
            } else {
                console.error(error);
            }
        }
    }

    const deleteOrder = () => {
        setRequest(null)
        setUid(null)
    }

    return(
        <View>
            <Button title="uid" onPress={statusOrder}/>
            <Button title="deleteOrder" onPress={deleteOrder}/>
        </View>    
    )
}

export default Order