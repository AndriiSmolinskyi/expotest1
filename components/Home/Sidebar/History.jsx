import axios from "axios";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { OrderContext } from '../../Context/OrderContext';
import { useContext, useState, useEffect } from 'react';
import { ServerApi } from "../../../ServerApi";
import Icon from 'react-native-vector-icons/FontAwesome';

export const History = ({navigation}) => {
    const { auth } = useContext(OrderContext);
    const [orders, setOrders] = useState([]);

    const toggleHistory = async () => {
        try {
            const response = await axios.get(`${ServerApi}clients/ordershistory`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': auth
                }
            });
    
            const responseData = response.data;
            console.log(responseData);
            setOrders(responseData);
        } catch (error) {
            if (error.response === 401) {
                console.error('Unauthorized');
            } else {
                console.error(error);
            }
        }    
    }

    const monthNames = [
        "січня", "лютого", "березня",
        "квітня", "травня", "червня", "липня",
        "серпня", "вересня", "жовтня",
        "листопада", "грудня"
    ];
    
    // Функція для форматування дати та часу
    function formatDateTime(dateTimeStr) {
        const date = new Date(dateTimeStr);
        const year = date.getFullYear();
        const month = monthNames[date.getMonth()]; // Отримуємо назву місяця зі словника
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
    
        return `${day} ${month} ${year} ${hours}:${minutes}`;
    }

    useEffect(() => {
        toggleHistory();
    }, []);

    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.close} onPress={() => navigation.navigate('Home')}>
                <Icon name="times" size={30} color={'black'} style={styles.close__icon}/>
            </TouchableOpacity>

            <View>
                <Text style={styles.title}>Поїздки</Text>
            </View>
            
            <FlatList
                data={orders} // Передаємо масив замовлень
                keyExtractor={(item, index) => index.toString()} // Встановлюємо унікальний ключ для кожного елемента
                renderItem={({ item }) => (
                    <View style={styles.orderItem}>                        
                        <View style={styles.order__date}>
                            <Text style={styles.order__date__text}>{formatDateTime(item.required_time)}</Text>  
                        </View> 

                        <View style={styles.road}>
                            {item.route.map((routeItem, routeIndex) => (
                                <View key={routeIndex} style={styles.road__item}>
                                    <Icon name={routeIndex === 0 ? 'map-pin' : 'map-marker'} size={18} color={routeIndex === 0 ? 'green' : 'red'} style={styles.road__block__icon} />
                                    <Text style={styles.road__item__text}>{routeItem.name} {routeItem.number}</Text>
                                </View>
                            ))}
                        </View> 

                        <View style={styles.footer}>
                            <Text style={styles.footer__price}>{item.order_cost} грн.</Text>
                            <View style={styles.footer__status}>
                                {item.execution_status === "Executed" 
                                    ? ( <View style={[styles.footer__status, styles.executed]}>
                                            <Text style={styles.footer__status__text}>Виконано</Text> 
                                    </View>  
                                    )                      
                                    : 
                                    (  <View style={[styles.footer__status, styles.cancel]}>
                                            <Text style={styles.footer__status__text}>Невиконано</Text>
                                        </View> 
                                    )                              
                                }
                            </View>                   
                        </View>
                    </View>
                )}
            />
        </View>    
    )
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 15,
        paddingVertical: 50,
    },
    close:{
      position: 'absolute',
      top: 15,
      left: 15,
    },
    orderItem:{
        marginBottom: 25,
        gap: 20,
        padding: 15,
        backgroundColor: '#e3e3e5',
        borderRadius: 12,
    },
    title:{
        fontSize: 24,
        marginBottom: 15,
    },
    road:{
        gap: 10,
        // borderBottomColor: '#C8C7CC', 
        // borderBottomWidth: 1,
        // paddingVertical: 15,      
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
    order__date__text:{
        fontSize: 18,
    },
    footer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    footer__price:{
        fontSize: 22,
    },
    footer__status:{
        width: 120,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    executed:{
        backgroundColor: '#4CE5B1',
    },
    cancel:{
        backgroundColor: 'red',
    },
    footer__status__text:{
        fontSize: 18,
        color: 'white'
    },
})

export default History