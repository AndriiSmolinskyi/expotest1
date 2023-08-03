// // http://31.43.107.151:7321/api/

// // App.js
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import Start from './components/Start'; // Правильний імпорт
// import Home from './components/Home';
// import { StatusBar } from 'react-native';
// import RegisterDataScreen from './components/Auth/RegisterDataScreen';
// import RegisterPhoneScreen from './components/Auth/RegisterPhoneScreen';
// import { UserProvider } from './components/UserContext';

// const Stack = createStackNavigator();

// const App = () => {

//   return (
//     <NavigationContainer>
//       <UserProvider>
//         <StatusBar/>
//         <Stack.Navigator
//           screenOptions={{
//             headerShown: false, // Приховати заголовок та стрілку "назад"
//           }}
//         >
//           <Stack.Screen name="Start" component={Start} />     
//           <Stack.Screen name="Home" component={Home} /> 
//           <Stack.Screen name="RegisterPhone" component={RegisterPhoneScreen} />
//           <Stack.Screen name="RegisterData" component={RegisterDataScreen} />
                    
//         </Stack.Navigator>
//       </UserProvider>
//     </NavigationContainer>
//   );
// };

// export default App;



// // App.js
// import React, { useEffect, useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import Start from './components/Start';
// import Home from './components/Home';
// import { StatusBar, Text} from 'react-native';
// import RegisterDataScreen from './components/Auth/RegisterDataScreen';
// import { UserProvider } from './components/UserContext';
// import RegisterPhoneScreen from './components/Auth/RegisterPhoneScreen';
// import axios from 'axios';
// import { ServerApi } from './ServerApi';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Login from './components/Auth/Login';

// const Stack = createStackNavigator();

// const App = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [initialRoute, setInitialRoute] = useState('Start');

//   useEffect(() => {
//     // Перевіряємо наявність даних користувача у локальному сховищі
//     AsyncStorage.getItem('user').then((userStr) => {
//       if (userStr) {
//         const user = JSON.parse(userStr);
//         // Здійснюємо запит на сервер для перевірки існування акаунта з такими даними
//         axios.post(`${ServerApi}/account`, {
//           login: user.phone.replace('380', ''), // Використовуємо номер телефону як логін
//           password: user.hashedPassword,
//           WebOrdersApiClientAppToken: 'App_Token',
//         }).then((response) => {
//           if (response.status === 200) {
//             // Якщо сервер підтвердив існування акаунта, переходимо на сторінку Home
//             setInitialRoute('Home');
//           } else {
//             // Інакше акаунт не існує, переходимо на сторінку Start
//             setInitialRoute('Start');
//           }
//         }).catch((error) => {
//           // Виникла помилка під час запиту на сервер, так що переходимо на сторінку Start
//           console.error('Error checking account:', error);
//           setInitialRoute('Start');
//         });
//       } else {
//         // Якщо дані користувача відсутні, переходимо на сторінку Start
//         setIsLoading(false);
//       }
//     });
//   }, []);

//   return (
//     <NavigationContainer>
//       <UserProvider>
//         <StatusBar />
//         <Stack.Navigator
//           initialRouteName={initialRoute} // Встановлюємо початкову сторінку в залежності від наявності даних користувача
//           screenOptions={{
//             headerShown: false, // Приховати заголовок та стрілку "назад"
//           }}
//         >
//           <Stack.Screen name="RegisterPhone" component={RegisterPhoneScreen} />
//           <Stack.Screen name="RegisterData" component={RegisterDataScreen} />
//           <Stack.Screen name="Start" component={Start} />
//           <Stack.Screen name="Home" component={Home} />
//           <Stack.Screen name="Login" component={Login} />
//         </Stack.Navigator>
//       </UserProvider>
//     </NavigationContainer>
//   );
// };

// export default App;


// App.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Start from './components/Start';
import Home from './components/Home';
import { StatusBar, Text } from 'react-native';
import RegisterDataScreen from './components/Auth/RegisterDataScreen';
import { UserProvider } from './components/UserContext';
import RegisterPhoneScreen from './components/Auth/RegisterPhoneScreen';
import axios from 'axios';
import { ServerApi } from './ServerApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './components/Auth/Login';

const Stack = createStackNavigator();

const App = () => {
  const [initialRoute, setInitialRoute] = useState('Start');


  useEffect(() => {
    // Перевіряємо наявність даних користувача у локальному сховищі
    AsyncStorage.getItem('user').then((userStr) => {
      if (userStr) {
        const user = JSON.parse(userStr);
        // Виводимо дані з AsyncStorage в консоль
        console.log('User data from AsyncStorage:', user);

        // Здійснюємо запит на сервер для перевірки існування акаунта з такими даними
        axios
          .post(`${ServerApi}/account`, {
            login: user.phone.replace('380', ''), // Використовуємо номер телефону як логін
            password: user.hashedPassword,
            WebOrdersApiClientAppToken: 'App_Token',
          })
          .then((response) => {
            if (response.status === 200) {
              // Якщо сервер підтвердив існування акаунта, переходимо на сторінку Home
              setInitialRoute('Home');
            } else {
              // Інакше акаунт не існує, переходимо на сторінку Start
              setInitialRoute('Start');
            }
          })
          .catch((error) => {
            // Виникла помилка під час запиту на сервер, так що переходимо на сторінку Start
            console.error('Error checking account:', error);
            setInitialRoute('Start');
          });
      } else {
        // Якщо дані користувача відсутні, переходимо на сторінку Start
        setInitialRoute('Start');
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <UserProvider>
        <StatusBar />
        <Stack.Navigator
          initialRouteName={initialRoute} // Встановлюємо початкову сторінку в залежності від наявності даних користувача
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

