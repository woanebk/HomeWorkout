import React from 'react';
import {
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { COLOR } from '../constant';

function ProfileScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: COLOR.MATTE_BLACK }}>
      <Text>Profile Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  
});

export default ProfileScreen;
