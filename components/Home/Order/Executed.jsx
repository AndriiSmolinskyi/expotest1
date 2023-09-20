import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import { OrderContext } from "../../Context/OrderContext";
import Icon from 'react-native-vector-icons/FontAwesome';
import { GeoContext } from "../../Context/GeoContext";

export const Executed = () => {
    const { uid, auth } = useContext(OrderContext);
    const [rating, setRating] = useState(0); // Стан для збереження оцінки
    const [modalVisible, setModalVisible] = useState(false); // Стан для показу/приховування модального вікна
    const { clearGeoCoords } = useContext(GeoContext);

    const handleRate = async () => {
        if (rating === 0) {
            // Перевірка, чи вибрана оцінка перед відправленням
            Alert.alert('Помилка', 'Будь ласка, виберіть оцінку.');
            return;
        }

        try {
            // Надсилання оцінки на сервер
            const response = await axios.post(`${ServerApi}/rate/${uid}`, rating, {
                headers:{
                    'Accept': 'application/json',
                    'Authorization': auth
                }
            });

            // Виведення модального вікна з повідомленням "Дякуємо"
            setModalVisible(true);

            // Скидання оцінки
            setRating(0);

            const responseData = response.data;
            console.log(responseData);
        } catch (error) {
            if (error.response.status === 401) {
                console.error('Error calculating cost: Unauthorized');
            } else {
                console.error(error);
            }
        }
        setRequest(null)
        setUid(null)   
        setStatus(null)
        clearGeoCoords()
    }

    // Функція для встановлення оцінки
    const setStarRating = (value) => {
        setRating(value);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Виконано</Text>
            <View style={styles.starContainer}>
                {[1, 2, 3, 4, 5].map((value) => (
                    <TouchableOpacity
                        key={value}
                        onPress={() => setStarRating(value)}
                        style={[styles.star, value <= rating && styles.starSelected]}
                    >
                        <Icon name="star" size={24} color={value <= rating ? '#FFD700' : '#808080'} />
                    </TouchableOpacity>
                ))}
            </View>
            <TouchableOpacity onPress={handleRate} style={styles.rateButton}>
                <Text style={styles.rateButtonText}>Оцінити</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.modalText}>Дякуємо за вашу оцінку!</Text>
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalCloseButton}>
                        <Text style={styles.modalCloseButtonText}>Закрити</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
    },
    starContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    star: {
        marginHorizontal: 5,
    },
    starSelected: {
        opacity: 1,
    },
    rateButton: {
        backgroundColor: '#4CE5B1',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 44,
        marginTop: 20,
        width: '50%',
    },
    rateButtonText: {
        color: 'white',
        fontSize: 18,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalText: {
        fontSize: 24,
        marginBottom: 20,
    },
    modalCloseButton: {
        backgroundColor: '#4CE5B1',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 44,
        width: '50%',
    },
    modalCloseButtonText: {
        color: 'white',
        fontSize: 18,
    },
});

export default Executed;