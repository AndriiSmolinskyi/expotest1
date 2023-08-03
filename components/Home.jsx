// // Home.js
// import React from 'react';
// import { View, Text, Button } from 'react-native';

// export const Home = ({ navigation }) => {
//   return (
//     <View>
//       <Text>Welcome to Home Page!</Text>
//       <Button title="Start" onPress={() => navigation.navigate('Start')}></Button>
//     </View>
//   );
// };

// export default Home;



// components/Home.js
// import React, { useContext } from 'react';
// import { View, Text, Button } from 'react-native';
// import { UserContext } from './UserContext';

// export const Home = ({ navigation }) => {
//   const { user, setUser } = useContext(UserContext);

//   const handleLogout = () => {
//     setUser(null);
//     navigation.navigate('Start');
//   };

//   return (
//     <View>
//       <Text>Welcome to Home Page!</Text>
//       <Text>Phone: {user.phone}</Text>
//       <Button title="Logout" onPress={handleLogout} />
//     </View>
//   );
// };

// export default Home;


import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { UserContext } from './UserContext';

export const Home = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    setUser(null);
    navigation.navigate('Start');
  };

  return (
    <View>
      <Text>Welcome to Home Page!</Text>
      <Text>Phone: {user ? user.phone : ''}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default Home;