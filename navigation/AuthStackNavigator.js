import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import MainTabNavigator from './MainTabNavigator';
import WorkoutInfoScreen from '../screens/WorkoutScreens/WorkoutInfoScreen';
import WorkoutDetailScreen from '../screens/WorkoutScreens/WorkoutDetailScreen';
import CategoryScreen from '../screens/Category/CategoryScreen';
import ExerciseInfoScreen from '../screens/Exercise/ExerciseInfoScreen';
import WorkoutProgressScreen from '../screens/WorkoutScreens/WorkoutProgressScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import SurveyScreen from '../screens/Auth/SurveyScreen';

const AuthStack = createStackNavigator();

function AuthStackNavigator() {
  return (
    <AuthStack.Navigator
      initialRouteName="Login" //Login
      screenOptions={{
        headerTransparent: true,
        headerTitle: '',
        headerMode: 'float',
        headerTintColor:'#fff'
      }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Survey" component={SurveyScreen} />
    </AuthStack.Navigator>
  );
}

const styles = StyleSheet.create({});

export default AuthStackNavigator;
