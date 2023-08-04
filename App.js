// // http://31.43.107.151:7321/api/
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Start from './components/Start';
import Home from './components/Home';
import { StatusBar, Text } from 'react-native';
import RegisterDataScreen from './components/Auth/RegisterDataScreen';
import { UserProvider } from './components/UserContext';
import RegisterPhoneScreen from './components/Auth/RegisterPhoneScreen';
import Login from './components/Auth/Login';

const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <UserProvider>
        <StatusBar />
        <Stack.Navigator
          // screenOptions={{
          //   headerShown: false, // Приховати заголовок та стрілку "назад"
          // }}
        >
          <Stack.Screen name="Start" component={Start} />
          <Stack.Screen name="RegisterPhone" component={RegisterPhoneScreen} />
          <Stack.Screen name="RegisterData" component={RegisterDataScreen} />        
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </UserProvider>
    </NavigationContainer>
  );
};

export default App;