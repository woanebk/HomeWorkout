import React, {useEffect, useRef, useState} from 'react';
import {Text, Image, StyleSheet, View, Modal} from 'react-native';
import {COLOR} from '../constant';
import RoundButton from './RoundButton';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import LottieView from 'lottie-react-native';
import CommandButton from './CommandButton';

function OTPVerifyModal(props) {
  return (
    <Modal
      animationType="slide"
      transparent
      statusBarTranslucent
      visible={props.visible}
      onRequestClose={props.onRequestClose}>
      <View style={styles.content}>
        <Text style={styles.title}>Xác minh số điện thoại</Text>
        <Text style={styles.subTitle}>Nhập Code được gửi đến máy bạn</Text>
        <LottieView
          style={styles.animation}
          source={require('../assets/lottie/waitingOTP.json')}
          autoPlay
          loop></LottieView>
        <OTPInputView
          style={{width: '70%', alignSelf: 'center', height: 100}}
          pinCount={4}
          code={props.code}
          // onCodeChanged = {code => { this.setState({code})}}
          autoFocusOnLoad={false}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          selectionColor={COLOR.BLACK}
          onCodeFilled={code => {
            console.log(`Code is ${code}, you are good to go!`);
          }}
        />
        <View style={styles.buttonWrapper}>
            <CommandButton
            title="Xác minh ngay"
            backgroundColor={COLOR.GOLD}
            onPress={async () => {
            }}
            />
      </View>
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
  content: {
    backgroundColor: COLOR.LIGHT_MATTE_BLACK,
    height: '100%',
    marginTop: 70,
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
    fontWeight:'bold'
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
  buttonWrapper:{
      height:50,
      width:'75%',
      alignSelf:'center',
      marginTop:10
  },
});

export default OTPVerifyModal;
