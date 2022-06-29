import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { HomeTabNav } from './HomeTabNav';

const RootStack = createNativeStackNavigator();

export const RootStackNav = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Root" component={HomeTabNav} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
