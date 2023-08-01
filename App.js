// http://31.43.107.151:7321/api/

// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Start from './components/Start'; // Правильний імпорт
import Home from './components/Home';
import { StatusBar } from 'react-native';
import { Register } from './components/Register';
import RegisterDataScreen from './components/RegisterDataScreen';
import RegisterPhoneScreen from './components/RegisterPhoneScreen';
import { UserProvider } from './components/UserContext';

const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <UserProvider>
      <StatusBar/>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // Приховати заголовок та стрілку "назад"
        }}
      >
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="RegisterPhone" component={RegisterPhoneScreen} />
        <Stack.Screen name="RegisterData" component={RegisterDataScreen} />
      </Stack.Navigator>
      </UserProvider>
    </NavigationContainer>
  );
};

export default App;