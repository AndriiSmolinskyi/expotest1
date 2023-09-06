import { useContext, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { ServerApi } from "../../../ServerApi";
import axios from "axios";
import { OrderContext } from "../../Context/OrderContext";
import { DeleteOrder } from "./DeleteOrder";

export const StatusOrder = () => {
    const { status, setStatus, uid, auth, setRequest, setUid } = useContext(OrderContext)

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
            // if (responseData.execution_status === "SearchesForCar") {
            //     setTimeout(statusingOrder, 4000); // Викликати кожні 3 секунди
            // } else if (responseData.execution_status === "CarFound" || responseData.execution_status === "Running") {
            //     setTimeout(statusingOrder, 30000); // Викликати кожні 30 секунд
            // }
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

    const closeOrder = () => {
        setRequest(null)
        setUid(null)   
        setStatus(null)
    }

    if(status){
        if(status.execution_status === "SearchesForCar"){
            return(
                // <View>
                //     <Text>Пошук машини</Text>
                // </View>    
                <View>
                <Text>Виконується</Text>
                <Text>Order Cost: {status.order_cost}</Text>
                <Text>Driver Phone: {status.driver_phone}</Text>
                <DeleteOrder></DeleteOrder>
                </View>    
            )
        } 
        
        else if(status.execution_status === "CarFound"){
            return(
                <View>
                    <Text>Машина прямує до вас</Text>
                    <Text>Order Cost: {status.order_cost}</Text>
                    <Text>Driver Phone: {status.driver_phone}</Text>
                    <DeleteOrder></DeleteOrder>
                </View>    
            )
        } 

        else if(status.execution_status === "Running"){
            return(
                <View>
                    <Text>Виконується</Text>
                    <Text>Order Cost: {status.order_cost}</Text>
                    <Text>Driver Phone: {status.driver_phone}</Text>
                    <DeleteOrder></DeleteOrder>
                </View>    
            )
        } 
        
        else if(status.execution_status === "Executed"){
            return(
                <View>
                    <Text>Виконано</Text>
                    <Button title="Закрити" onPress={closeOrder}/>
                </View>    
            )
        } else{
            return(
                <View>
                    <Text>Завантаження</Text>
                </View>    
            )
        }

    } else {
        return(
            <View>
                <Text>Завантаження</Text>
            </View>    
        )
    }
}