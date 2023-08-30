import { OrderContext } from "../../Context/OrderContext";
import { useContext } from "react";
import { View, Text, Button } from "react-native";
import { ServerApi } from "../../../ServerApi";
import { encode } from 'base-64';
import { UserContext } from '../../Context/UserContext'; 
import axios from "axios";

export const Order = () =>{
    const {userData, setUserData, auth, setAuth, request, setRequest, uid, setUid} = useContext(OrderContext)
    const { user } = useContext(UserContext); 
    const credentials = `${user.phone}:${user.hashedPassword}`;
    const base64Credentials = encode(credentials);

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
                    'Authorization': `Basic ${base64Credentials}`,
                    'X-API-VERSION': '1.52.1'
                }
            })

            const responseData = response.data;
            console.log(responseData)
        } catch (error){
            if (error.response.status === 401) {
                console.error('Error calculating cost: Unauthorized');
            } else {
                throw error;
            }
        }
    }

    return(
        <View>
            <Text>hy</Text>
            <Button title="Make Order" onPress={makeOrder}/>
        </View>    
    )
}

export default Order