import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import MainTabNavigator from './MainTabNavigator';
import WorkoutInfoScreen from '../screens/WorkoutScreens/WorkoutInfoScreen';
import WorkoutDetailScreen from '../screens/WorkoutScreens/WorkoutDetailScreen';
import CategoryScreen from '../screens/Category/CategoryScreen';
import ExcerciseInfoScreen from '../screens/Exercise/ExerciseInfoScreen';
import WorkoutProgressScreen from '../screens/WorkoutScreens/WorkoutProgressScreen';
import LoginScreen from '../screens/Auth/LoginScreen';

const MainStack = createStackNavigator();

const AuthStack = createStackNavigator();

function MainStackNavigator() {
  return (
    <MainStack.Navigator
      initialRouteName="AuthStack" //AuthStack
      screenOptions={{
        headerTransparent: true,
        headerTitle: '',
        headerMode: 'float',
      }}>
      <MainStack.Screen
        name="Tab"
        options={{
          headerLeft: () => {
            return null;
          },
        }}
        component={MainTabNavigator}
      />
      <MainStack.Screen
        name="WorkoutInfo"
        component={WorkoutInfoScreen}
        options={{headerTintColor: '#fff'}}
      />
      <MainStack.Screen
        name="WorkoutDetail"
        component={WorkoutDetailScreen}
        options={{headerTintColor: '#fff'}}
      />
      <MainStack.Screen
        name="Category"
        component={CategoryScreen}
        options={{headerTintColor: '#fff'}}
      />
      <MainStack.Screen
        name="ExcerciseInfo"
        component={ExcerciseInfoScreen}
        options={{headerTintColor: '#fff'}}
      />
      <MainStack.Screen
        name="WorkoutProgress"
        component={WorkoutProgressScreen}
        options={{headerTintColor: '#fff'}}
      />
      <MainStack.Screen
        name="AuthStack"
        component={AuthStackNavigator}
        options={{headerTintColor: '#fff'}}
      />
    </MainStack.Navigator>
  );
}

function AuthStackNavigator() {
  return (
    <AuthStack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerTransparent: true,
        headerTitle: '',
        headerMode: 'float',
      }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
    </AuthStack.Navigator>
  );
}

const styles = StyleSheet.create({});

export default MainStackNavigator;
