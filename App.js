import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { RootStackNav } from './src/navigators/RootStack';
import HomeViewerContextProvider from './src/context/HomeViewer';

const App = () => {
  return (
    <HomeViewerContextProvider>
      <SafeAreaProvider>
        <RootStackNav />
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </HomeViewerContextProvider>
  );
};

export default App;
