import React from 'react';
import {
  Text,
  StyleSheet,
  View,
} from 'react-native';
import auth, { firebase } from '@react-native-firebase/auth';
import RoundButton from '../components/RoundButton';
import { COLOR } from '../constant';

const onPressSignOut = () => {
  auth()
  .signOut()
  .then(() =>  Alert.alert(
    '',
    //body
    'Đăng xuất thành công',
  ));
   
};
function ProfileScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: COLOR.MATTE_BLACK }}>
        <RoundButton
          icon="user-times"
          buttonWidth={40}
          buttonHeight={40}
          size={40}
          style={styles.closeBtnWrapper}
          onPress={()=>onPressSignOut()}
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
