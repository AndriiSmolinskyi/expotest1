import { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { OrderContext } from "../../Context/OrderContext";
import Icon from 'react-native-vector-icons/FontAwesome';
import { DeleteOrder } from "./DeleteOrder";

export const CarGo = ({titlename}) => {
    // const { status } = useContext(OrderContext)

    const status = {
        order_cost: 72,
        currency: "грн.",
        order_car_info: "АА1172АА, синий, Ford C-Max",
        driver_phone:"050-123-45-67",
        rating: 4,
        route_address_from:{ name:"ОЗЕРНАЯ УЛ. (ОБОЛОНЬ)" },
        route_address_to:{ name: "ЯНГЕЛЯ АКАДЕМИКА УЛ." },
    }

    const handleCallDriver = () => {
        const phoneNumber = status.driver_phone;
        Linking.openURL(`tel:${phoneNumber}`);
    };

    return(
        <View style={ styles.container }>
            <Text style={styles.title}>{titlename}</Text>
            <View>
                
                <View style={styles.road}>
                    <View style={styles.road__item}>
                        <Icon name="map-pin" size={18} color={'green'} style={styles.road__block__icon}/>
                        <Text style={styles.road__item__text}>{status.route_address_from.name}</Text>
                    </View>
                    <View style={styles.road__item}>
                        <Icon name="map-marker" size={18} color={'red'} style={styles.road__block__icon}/>
                        <Text style={styles.road__item__text}>{status.route_address_to.name}</Text>
                    </View>              
                </View>

                <View style={styles.car}>
                    <Text style={styles.car__info}>{status.order_car_info}</Text>
                </View>

                <View style={styles.info}>
                    <Text style={styles.info__text}>{status.order_cost} {status.currency}</Text>
                    <Text style={styles.info__text}>Рейтинг {status.rating} <Icon name="star" size={18} color={'yellow'} style={styles.road__block__icon}/></Text>
                    <TouchableOpacity onPress={handleCallDriver} style={styles.callButton}>
                        <Text style={styles.info__text}>Звінок <Icon name="phone" size={20} color="#4CE5B1"/></Text>
                    </TouchableOpacity>
                </View>
               
                {titlename === "Авто прямує до вас" && (<DeleteOrder></DeleteOrder>)}
            </View>
            
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    title:{
        fontSize: 24,   
        textAlign: 'center',
    },
    road:{
        gap: 10,
        borderBottomColor: '#C8C7CC', 
        borderBottomWidth: 1,
        paddingVertical: 15,      
    },
    road__item:{
        flexDirection: 'row',
        alignItems: 'center',  
    },
    road__item__text:{
        fontSize: 18,
        marginLeft: 5,
        color: '#32323b',
    },
    car:{
        alignItems: 'center', 
        borderBottomWidth: 1,
        paddingVertical: 15,
        borderBottomColor: '#C8C7CC', 
    },
    car__info:{
        fontSize: 18,
        color: '#32323b',       
    },
    info:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
    },
    info__text:{
        fontSize: 18,
        color: '#32323b',   
    },
    callButton:{
        alignItems: 'center',
    },
});

export default CarGo
  