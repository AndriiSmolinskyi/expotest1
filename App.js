// // http://31.43.107.151:7321/api/
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, Text } from 'react-native';
import { UserProvider } from './components/UserContext';
import Start from './components/Start';
import Home from './components/Home/Home';
import RegisterPhoneScreen from './components/Auth/RegisterPhoneScreen';
import RegisterDataScreen from './components/Auth/RegisterDataScreen';
import Login from './components/Auth/Login';
import RequestCodeScreen from './components/Auth/RequestCodeScreen';
import ResetPasswordScreen from './components/Auth/ResetPasswordScreen';
import ResetPassCode from './components/Auth/ResetPassCode';
import MyMapComponent from './components/Home/MyMapComponent';
import LiveSearchComponent from './components/Home/LiveSearchComponent';
import VisicomSearchWithSuggestions from './components/Home/VisicomSearchWithSuggestions';

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
          <Stack.Screen name="RequestCodeScreen" component={RequestCodeScreen} />
          <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
          <Stack.Screen name="ResetPassCode" component={ResetPassCode} />
          <Stack.Screen name="MyMapComponent" component={MyMapComponent} />
          <Stack.Screen name="LiveSearchComponent" component={LiveSearchComponent} />
          <Stack.Screen name="VisicomSearchWithSuggestions" component={VisicomSearchWithSuggestions} />
        </Stack.Navigator>
      </UserProvider>
    </NavigationContainer>
  );
};

export default App;