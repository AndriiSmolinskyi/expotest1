import { useContext } from "react";
import { View, Text,  TouchableOpacity, StyleSheet } from "react-native";
import { ServerApi } from "../../../ServerApi";
import axios from "axios";
import { OrderContext } from "../../Context/OrderContext";
import { GeoContext } from "../../Context/GeoContext";

export const DeleteOrder = () =>{
    const {userData, auth,  request, setRequest, uid, setUid, status, setStatus} = useContext(OrderContext)
    const { clearGeoCoords } = useContext(GeoContext);

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
            clearGeoCoords()
        } catch (error) {
            if (error.response.status === 401) {
                console.error('Unauthorized');
            } else {
                console.error(error);
            }
        }    
        setRequest(null)
            setUid(null)   
            setStatus(null)
            clearGeoCoords()
    }

    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={deleteOrder} style={styles.delete}>
                <Text style={styles.delete__text}>Скасувати замовлення</Text>
            </TouchableOpacity>
        </View>    
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 5,
    },
    delete:{
        
    },
    delete__text:{
        fontSize: 20,
        color: 'red'
    },
});

export default DeleteOrder