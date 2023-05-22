import React, {useEffect} from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChallengesCategoryScreen from '../screens/ChallengesCategoryScreen';
import {Text, StyleSheet, View} from 'react-native';
import {COLOR} from '../constant';
import {Icon} from 'react-native-elements';

const MainTab = createMaterialBottomTabNavigator();

function MainTabNavigator({navigation}) {
  useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        e.preventDefault();
      }),
    [navigation],
  );
  return (
    <MainTab.Navigator
      initialRouteName={'Home'}
      barStyle={{backgroundColor: COLOR.SILVER}}>
      <MainTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Trang Chủ',
          tabBarIcon: ({color}) => (
            <Icon name="home" type="font-awesome-5" size={18} color={color} />
          ),
        }}
      />
      <MainTab.Screen
        name="Challenges"
        component={ChallengesCategoryScreen}
        options={{
          tabBarLabel: 'Thử thách',
          tabBarIcon: ({color}) => (
            <Icon
              name="dumbbell"
              type="font-awesome-5"
              size={14}
              color={color}
            />
          ),
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Cá Nhân',
          tabBarIcon: ({color}) => (
            <Icon name="person" type="ionicon" size={18} color={color} />
          ),
        }}
      />
    </MainTab.Navigator>
  );
}

const styles = StyleSheet.create({});

export default MainTabNavigator;
