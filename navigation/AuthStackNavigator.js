import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import SurveyScreen from '../screens/Auth/SurveyScreen';
import auth from '@react-native-firebase/auth';

const AuthStack = createStackNavigator();

function AuthStackNavigator({navigation}) {
  useEffect(() => {
    const navigateBackToLogin = auth().onAuthStateChanged(() => {
      navigation.navigate('Login');
    });
    return navigateBackToLogin; // unsubscribe on unmount
  }, []);

  return (
    <AuthStack.Navigator
      initialRouteName="Login" //Login
      screenOptions={{
        headerTransparent: true,
        headerTitle: '',
        headerMode: 'float',
        headerTintColor: '#fff',
      }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Survey" component={SurveyScreen} />
    </AuthStack.Navigator>
  );
}

const styles = StyleSheet.create({});

export default AuthStackNavigator;
