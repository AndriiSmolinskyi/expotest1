import { OrderContext } from "../../Context/OrderContext";
import { useContext, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { ServerApi } from "../../../ServerApi";
import axios from "axios";

export const Order = () =>{
    const {userData, auth,  request, setRequest, uid, setUid} = useContext(OrderContext)
    
    const statusOrder = async () => {
        try {
            const response = await axios.get(`${ServerApi}/weborders/${uid}`, {
                headers:{
                    'Accept': 'application/json',
                    'Authorization': auth
                }
            })

            const responseData = response.data;
            setUid(response.data.dispatching_order_uid)
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
            statusOrder()
        }
    }, [uid]);

    const deleteOrder = async () => {
        try {
            const response = await axios.put(`${ServerApi}/weborders/cance/${uid}`, {
                headers:{
                    'Accept': 'application/json',
                    'Authorization': auth
                }
            })

            const responseData = response.data;
            console.log(responseData)
            setRequest(null)
            setUid(null)
        } catch (error){
            if (error.response.status === 401) {
                console.error('Error calculating cost: Unauthorized');
            } else {
                console.error(error);
            }
        }
        
    }

    return(
        <View>
            <Text>hy</Text>
            <Button title="uid" onPress={statusOrder}/>
            <Button title="deleteOrder" onPress={deleteOrder}/>
        </View>    
    )
}

export default Order