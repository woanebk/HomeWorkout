import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  Image,
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {COLOR} from '../constant';
import RoundButton from './RoundButton';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import LottieView from 'lottie-react-native';
import CommandButton from './CommandButton';
import CustomTextInput from '../components/CustomTextInput';

function SingUpModal(props) {
  const handleSignUp = () => {
    props.onPressClose;
  };
  return (
    <Modal
      animationType="slide"
      transparent
      statusBarTranslucent
      visible={props.visible}
      onRequestClose={props.onRequestClose}>
      <View style={styles.content}>
        <CustomTextInput
          style={styles.textinput}
          value={props.valueEmail}
          onChangeText={props.setValueEmail}
          title="Email"
          icon="envelope"
          placeholder="Nhập Email để đăng kí"
          keyboardType="numeric"
        />
        <CustomTextInput
          style={styles.textinput}
          value={props.valuePassword}
          onChangeText={props.setValuePassword}
          title="Mật khẩu"
          secureTextEntry={true}
          icon="circle"
          placeholder="Nhập mật khẩu"
        />
        <CustomTextInput
          style={styles.textinput}
          value={props.valuePasswordConfirm}
          onChangeText={props.setValuePasswordConfirm}
          marginTop="20"
          secureTextEntry={true}
          title="Xác nhận mật khẩu"
          icon="circle"
          placeholder="Nhập Lại mật khẩu"
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.commandBtn}>
          <Text style={styles.commandTxt} onPress={props.handleSignUp}>
            Đăng Kí
          </Text>
        </TouchableOpacity>
        <RoundButton
          icon="close"
          buttonWidth={25}
          buttonHeight={25}
          size={10}
          style={styles.closeBtnWrapper}
          onPress={props.onPressClose}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  textinput: {
    alignSelf: 'center',
    marginTop: 50,
    width: '85%',
  },
  content: {
    backgroundColor: COLOR.LIGHT_MATTE_BLACK,
    height: '100%',
    marginTop: 160,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginHorizontal: 15,
    paddingTop: 50,
  },
  closeBtnWrapper: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLOR.WHITE,
    alignSelf: 'center',
  },
  subTitle: {
    fontSize: 14,
    color: COLOR.WHITE,
    alignSelf: 'center',
    marginTop: 15,
  },
  underlineStyleBase: {
    width: 45,
    height: 45,
    borderRadius: 5,
    backgroundColor: COLOR.WHITE,
    color: COLOR.BLACK,
    fontSize: 20,
    opacity: 0.7,
    fontWeight: 'bold',
  },
  underlineStyleHighLighted: {
    borderColor: COLOR.GOLD,
    backgroundColor: COLOR.WHITE,
    borderWidth: 2,
    opacity: 1,
  },
  animation: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 10,
  },
  buttonWrapper: {
    height: 50,
    width: '75%',
    alignSelf: 'center',
    marginTop: 10,
  },
  commandBtn: {
    backgroundColor: '#ffcc00',
    marginTop: 50,
    height: 50,
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },
});

export default SingUpModal;
