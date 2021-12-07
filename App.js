import { NavigationContainer, useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
} from 'react-native';
import MainStackNavigator from './navigation/MainStackNavigator';
import AuthStackNavigator from './navigation/AuthStackNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import LoginScreen from './screens/Auth/LoginScreen';

function App () {
  const navigation = useNavigation();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <NavigationContainer>
        <AuthStackNavigator/>
      </NavigationContainer>
    );
  }

  return (
      <NavigationContainer>
        <MainStackNavigator/>
      </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
