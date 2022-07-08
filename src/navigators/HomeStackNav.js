import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';

import { DetailsStackNav } from './DetailsStackNav';
import { LoginStackNav } from './LoginStackNav';
import { EventNav } from './EventStackNav';

const HomeStack = createNativeStackNavigator();

export const HomeStackNav = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={Home} />
      <HomeStack.Screen name="DetailScreen" component={DetailsStackNav} />
      <HomeStack.Screen name="LoginScreen" component={LoginStackNav} />
      <HomeStack.Screen name="EventNav" component={EventNav} />
    </HomeStack.Navigator>
  );
};
