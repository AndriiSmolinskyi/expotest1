import { useContext } from "react";
import { View, Text, Button } from "react-native";
import { ServerApi } from "../../../ServerApi";
import axios from "axios";
import { OrderContext } from "../../Context/OrderContext";

export const StatusOrder = () => {
    const { status } = useContext(OrderContext)

    return(
        <View>
            <Text>{status.execution_status}</Text>
        </View>    
    )
}