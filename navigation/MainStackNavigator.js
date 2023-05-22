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
import AllWorkoutScreen from '../screens/WorkoutScreens/AllWorkoutScreen';
import ExerciseLibraryScreen from '../screens/Exercise/ExerciseLibraryScreen';
import ChallengeDetailScreen from '../screens/Challenge/ChallengeDetailScreen';
import AllChallengeScreen from '../screens/Challenge/AllChallengeSreen';
import AllFavoriteWorkoutScreen from '../screens/WorkoutScreens/AllFavoriteWorkoutScreen';
import SurveyScreen from '../screens/Auth/SurveyScreen';
import AllVideoScreen from '../screens/Video/AllVideoScreen';
import WatchVideoScreen from '../screens/Video/WatchVideoScreen';
const MainStack = createStackNavigator();

const AuthStack = createStackNavigator();

function MainStackNavigator() {
  return (
    <MainStack.Navigator
      initialRouteName="Tab" //AuthStack
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
        name="ExerciseInfo"
        component={ExerciseInfoScreen}
        options={{headerTintColor: '#fff'}}
      />
      <MainStack.Screen
        name="WorkoutProgress"
        component={WorkoutProgressScreen}
        options={{headerTintColor: '#fff', headerLeft: () => null}}
      />
      {/*<MainStack.Screen*/}
      {/*  name="AuthStack"*/}
      {/*  component={AuthStackNavigator}*/}
      {/*  options={{headerTintColor: '#fff'}}*/}
      {/*/>*/}
      <MainStack.Screen
        name="AllWorkout"
        component={AllWorkoutScreen}
        options={{headerTintColor: '#fff'}}
      />
      <MainStack.Screen
        name="ExerciseLibrary"
        component={ExerciseLibraryScreen}
        options={{headerTintColor: '#fff'}}
      />
      <MainStack.Screen
        name="ChallengeDetail"
        component={ChallengeDetailScreen}
        options={{headerTintColor: '#fff'}}
        screenOptions={{
          headerTitle: 'asasasd',
          headerMode: 'float',
        }}
      />
      <MainStack.Screen
        name="AllChallenge"
        component={AllChallengeScreen}
        options={{headerTintColor: '#fff'}}
        screenOptions={{
          headerTitle: 'asasasd',
          headerMode: 'float',
        }}
      />
      <MainStack.Screen
        name="AllFavoriteWorkout"
        component={AllFavoriteWorkoutScreen}
        options={{headerTintColor: '#fff'}}
      />
      <MainStack.Screen name="Survey" component={SurveyScreen} />
      <MainStack.Screen
        name="AllVideo"
        component={AllVideoScreen}
        options={{headerTintColor: '#fff'}}
      />
      <MainStack.Screen
        name="WatchVideo"
        component={WatchVideoScreen}
        options={{headerTintColor: '#fff'}}
      />
    </MainStack.Navigator>
  );
}

// function AuthStackNavigator() {
//   return (
//     <AuthStack.Navigator
//       initialRouteName="Login"
//       screenOptions={{
//         headerTransparent: true,
//         headerTitle: '',
//         headerMode: 'float',
//       }}>
//       <AuthStack.Screen name="Login" component={LoginScreen} />
//     </AuthStack.Navigator>
//   );
// }

const styles = StyleSheet.create({});

export default MainStackNavigator;
