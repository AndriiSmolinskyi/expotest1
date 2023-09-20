import { useContext, useEffect } from "react";
import { View  } from "react-native";
import { ServerApi } from "../../../ServerApi";
import axios from "axios";
import { OrderContext } from "../../Context/OrderContext";
import Loading from "./Loading";
import CarGo from "./CarGo";
import Executed from "./Executed";

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
            if (responseData.execution_status === "SearchesForCar") {
                setTimeout(statusingOrder, 4000); // Викликати кожні 3 секунди
            } else if (responseData.execution_status === "CarFound" || responseData.execution_status === "Running") {
                setTimeout(statusingOrder, 30000); // Викликати кожні 30 секунд
            }
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
   
    if(status){
        if(status.execution_status === "SearchesForCar"){
            return(
                <View>
                    <Loading titlename={"Пошук машини"}></Loading> 
                </View>     
            )
        } 
        
        else if(status.execution_status === "CarFound"){
            return(
               <CarGo titlename={"Авто прямує до вас"}></CarGo>   
            )
        } 

        else if(status.execution_status === "Running"){
            return(
                <CarGo titlename={"Виконується"}></CarGo>
            )
        } 
        
        else if(status.execution_status === "Executed"){
            return(
                <Executed></Executed>
            )
        } else{
            return(
                <Loading titlename={"Завантаження"}></Loading>    
            )
        }

    } else {
        return(
            <Loading titlename={"Завантаження"}></Loading>
        )
    }
}