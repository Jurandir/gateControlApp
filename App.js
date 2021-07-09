import React from 'react';
import { View } from 'react-native';
import { activateKeepAwake } from "expo-keep-awake";  
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login     from './src/pages/Login';
import LerQRcode from './src/pages/LerQRcode';
// import Movimento from './src/pages/Movimento';

const Stack = createStackNavigator();

export default function App() {

  activateKeepAwake();
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">

      <Stack.Screen name="Login" component={Login} 
          options={{
            headerShown: false,
            title: 'Login',
            headerTransparent: true,
            headerTintColor: '#000',
          }}
        />        

        <Stack.Screen name="LerQRcode" component={LerQRcode} 
          options={{
            headerShown: false,
            title: 'LerQRcode',
            headerTransparent: false,
            headerTintColor: '#000',
          }}        
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
