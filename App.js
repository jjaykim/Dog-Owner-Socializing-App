import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { RootStackNav } from './src/navigators/RootStack';

const App = () => {
  return (
    <SafeAreaProvider>
      <RootStackNav />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
};

export default App;
