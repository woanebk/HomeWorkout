import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  StyleSheet,
} from 'react-native';
import MainStackNavigator from './navigation/MainStackNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App () {

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <MainStackNavigator/>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
