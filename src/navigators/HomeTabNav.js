import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import colors from '../styles/colors';
import { Account } from '../screens/Account';

import { HomeStackNav } from './HomeStackNav';

const Tab = createBottomTabNavigator();

export const HomeTabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          return (
            <Ionicons
              name={route.name === 'HomeTab' ? 'ios-home' : 'ios-person'}
              color={focused ? colors.blueGreen : colors.gray}
              size={20}
            />
          );
        },
        tabBarActiveTintColor: colors.orange,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeStackNav} />

      <Tab.Screen name="AccountTab" component={Account} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
  },
});
