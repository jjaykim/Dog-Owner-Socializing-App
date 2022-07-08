import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { EventDetails } from '../screens/Details/event/EventDetails';
import { EventCreate } from '../screens/Details/event/EventCreate';

const Event = createNativeStackNavigator();

export const EventNav = () => {
  return (
    <Event.Navigator screenOptions={{ headerShown: false }}>
      <Event.Screen name="EventDetails" component={EventDetails} />
      <Event.Screen name="EventCreate" component={EventCreate} />
    </Event.Navigator>
  );
};
