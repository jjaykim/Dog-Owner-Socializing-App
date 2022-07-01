import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Login } from '../screens/Login/login';
import { SignUp } from '../screens/Login/signUp';

const LoginStack = createNativeStackNavigator();

export const LoginStackNav = () => {
  return (
    <LoginStack.Navigator screenOptions={{ headerShown: false }}>
      <LoginStack.Screen name="Login" component={Login} />
      <LoginStack.Screen name="SignUp" component={SignUp} />
    </LoginStack.Navigator>
  );
};
