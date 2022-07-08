import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { ParkDetails } from '../screens/Details/ParkDetails';

import { LoginStackNav } from './LoginStackNav';

const HomeStack = createNativeStackNavigator();

export const HomeStackNav = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={Home} />
      <HomeStack.Screen name="DetailScreen" component={ParkDetails} />
      <HomeStack.Screen name="LoginScreen" component={LoginStackNav} />
    </HomeStack.Navigator>
  );
};
