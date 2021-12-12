import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import auth, {firebase} from '@react-native-firebase/auth';
import RoundButton from '../components/RoundButton';
import {COLOR} from '../constant';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {generateNewExcercise, generateNewWorkout} from '../utilities/FirebaseDatabase';

const onPressSignOut = () => {
  auth()
    .signOut()
    .then(() =>
      Alert.alert(
        '',
        //body
        'Đăng xuất thành công',
      ),
    );
};

const renderAdminButton = () => {
  return (
    <View>
      <Text style={{color:COLOR.WHITE}}>Đừng nhấn lung tung nha</Text>
      <TouchableOpacity
        style={{height: 50, backgroundColor: COLOR.WHITE, justifyContent:'center', padding:10, marginTop:20}}
        onPress={() => {
          generateNewExcercise();
        }}>
        <Text>Generate Excercise</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{height: 50, backgroundColor: COLOR.WHITE, justifyContent:'center', padding:10, marginTop:20}}
        onPress={() => {
          generateNewWorkout();
        }}>
        <Text>Generate Workout</Text>
      </TouchableOpacity>
    </View>
  );
};
function ProfileScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR.MATTE_BLACK,
      }}>
        {renderAdminButton()}
      <RoundButton
        icon="user-times"
        buttonWidth={40}
        buttonHeight={40}
        size={40}
        style={styles.closeBtnWrapper}
        onPress={() => onPressSignOut()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  closeBtnWrapper: {
    position: 'absolute',
    top: 50,
    right: 15,
  },
});

export default ProfileScreen;
