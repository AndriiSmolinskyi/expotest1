import { useContext } from "react";
import { View, Text, Button } from "react-native";
import { ServerApi } from "../../../ServerApi";
import axios from "axios";
import { OrderContext } from "../../Context/OrderContext";

export const DeleteOrder = () =>{
    const {userData, auth,  request, setRequest, uid, setUid, status, setStatus} = useContext(OrderContext)
    
    const deleteOrder = async () => {
        try {
            const response = await axios.put(`${ServerApi}/weborders/cancel/${uid}`, null, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': auth
                }
            });
    
            const responseData = response.data;
            console.log(responseData);
            setRequest(null)
            setUid(null)   
            setStatus(null)
        } catch (error) {
            if (error.response.status === 401) {
                console.error('Unauthorized');
            } else {
                console.error(error);
            }
        }    
    }

    return(
        <View>
            <Button title="deleteOrder" onPress={deleteOrder}/>
        </View>    
    )
}