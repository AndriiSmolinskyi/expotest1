import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { OrderContext } from '../../Context/OrderContext';
import { GeoAdressContext } from '../../Context/GeoAdressContext';
import { GeoContext } from '../../Context/GeoContext';
import { ServiceContext } from '../../Context/ServiceContext';
import { UserContext } from '../../Context/UserContext';
import { useContext } from 'react';
import axios from 'axios';
import { ServerApi } from '../../../ServerApi';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { useNavigation } from '@react-navigation/native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

const Sidebar = ({toggleVisibility}) => {
    const { setUser } = useContext(UserContext);
    const {  clearGeoData } = useContext(GeoAdressContext); 
    const { auth, clearOrderData, userData } = useContext(OrderContext);
    const { clearGeoCoords } = useContext(GeoContext);
    const { clearServiceData } = useContext(ServiceContext);

    const navigation = useNavigation();

    const handleLogout = async () => {  
        try {
          await AsyncStorage.removeItem('user');
          setUser(null)
          clearGeoData();
          clearOrderData();
          clearGeoCoords();
          clearServiceData();
          navigation.reset({
            index: 0,
            routes: [{ name: 'Start' }],
          });
        } catch (error) {
          console.error('Error removing user data from AsyncStorage:', error);
        }
      };

    const executionStatus = 'SearchesForCar'

    const onSwipeGestureEvent = (event) => {
        if (event.nativeEvent.state === State.ACTIVE) {
          toggleVisibility(); 
        }
      };

    return(
        <PanGestureHandler onHandlerStateChange={onSwipeGestureEvent}>
            <View style={styles.sideCont}> 
                <View style={styles.side}>
                    <TouchableOpacity style={styles.close} onPress={toggleVisibility}>
                      <Icon name="times" size={30} color={'black'} style={styles.close__icon} />
                    </TouchableOpacity>

                    <View style={styles.header}>
                      {userData && userData.user_full_name && <Text style={styles.header__text}>{userData.user_full_name}</Text>}
                      {userData && <Text style={[styles.header__text, styles.header__text__phone]}>{userData.user_phone}</Text>}
                    </View>
                    
                    <View style={styles.main}>
                      <TouchableOpacity  onPress={() => navigation.navigate('History')} style={styles.main__block}>
                        <Icon name="history" size={24} color={'#C1C0C9'} />
                        <Text style={styles.main__block__text}>Історія поїздок</Text>
                      </TouchableOpacity>
                      <TouchableOpacity  onPress={() => navigation.navigate('ChangeProfile')} style={styles.main__block}>
                        <Icon name="cog" size={24} color={'#C1C0C9'} />
                          <Text style={styles.main__block__text}>Налаштування</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={toggleVisibility} style={styles.main__block}>
                        <Icon name="home" size={24} color={'#C1C0C9'} />
                        <Text style={styles.main__block__text}>Додому</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={handleLogout} style={styles.main__block}>
                        <Icon name="sign-out" size={24} color="#C1C0C9" />
                        <Text style={styles.main__block__text}>Вийти з акаунта</Text>
                      </TouchableOpacity>
                    </View>
                    
                </View>
            </View>  
        </PanGestureHandler>      
    )
}

const styles = StyleSheet.create({
    sideCont:{
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
    }, side:{
        width: '80%',
        height: '100%',
        backgroundColor: 'white', 
    },
    close: {
      position: 'absolute',
      top: 15,
      left: 15,
      zIndex: 2,
      width: 40,
      height: 40,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    header:{
      backgroundColor: '',
      paddingTop: 80,
      paddingBottom: 30,
      backgroundColor: '#4CE5B1',
      paddingLeft: 20,
      gap: 10,
    },
    header__text:{
      fontSize: 24,
      color: 'white'
    },
    header__text__phone:{
      fontSize: 20,
    },
    main:{
      paddingLeft: 20,
      paddingTop: 20,
      gap: 20,
    },
    main__block:{
      flexDirection: 'row',
      alignItems: 'center',
    },
    main__block__text:{
      color: '#242E42',
      fontSize: 20,
      marginLeft: 5,
    },
});

export default Sidebar;