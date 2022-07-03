import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Account } from '../screens/Account/Account';
import { PersonalInfo } from '../screens/Account/PersonalInfo';
import { Reviews } from '../screens/Account/Reviews';
import { Events } from '../screens/Account/Events';

const AccountStack = createNativeStackNavigator();

export const AccountStackNav = () => {
  return (
    <AccountStack.Navigator screenOptions={{ headerShown: false }}>
      <AccountStack.Screen name="AccountScreen" component={Account} />
      <AccountStack.Screen name="PersonalInfoScreen" component={PersonalInfo} />
      <AccountStack.Screen name="ReviewsScreen" component={Reviews} />
      <AccountStack.Screen name="EventsScreen" component={Events} />
    </AccountStack.Navigator>
  );
};
