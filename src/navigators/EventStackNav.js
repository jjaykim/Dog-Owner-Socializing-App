import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { EventDetails } from '../screens/Details/event/EventDetails';

const Event = createNativeStackNavigator();

export const EventNav = () => {
  return (
    <Event.Navigator screenOptions={{ headerShown: false }}>
      <Event.Screen name="EventDetails" component={EventDetails} />
    </Event.Navigator>
  );
};
