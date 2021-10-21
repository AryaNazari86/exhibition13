import 'react-native-gesture-handler';
import React from 'react';

import { DataProvider } from './src/hooks';
import AccountStack from './src/navigation/Account';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <AccountStack />
    </NavigationContainer>
  );
}
