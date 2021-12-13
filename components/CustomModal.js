import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {Text, StyleSheet, View, Modal} from 'react-native';
import {COLOR} from '../constant';
import LottieView from 'lottie-react-native';
import CommandButton from './CommandButton';

function CustomModal(props) {
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={props.visible}
      onRequestClose={() => {
        props?.onRequestClose();
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{flex: 0.7, padding: 10}}>
            <Text style={{textAlign:'center', fontSize:20, fontWeight:'bold'}}>Thông báo</Text>
            <Text style={{marginTop:15}}>{props?.title}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              flex: 0.2,
              width: '100%',
              alignItems:'center'
            }}>
            <CommandButton
              style={styles.commandBtn}
              title="Cancel"
              onPress={props?.onCancel}
            />
            <CommandButton
              style={styles.commandBtn}
              title="Confirm"
              onPress={props?.onConfirm}
            />
          </View>
          {/* <LottieView
                 style={styles.icon} 
                 source={require('../assets/lottie/done_animation.json')} 
                 autoPlay={true} loop={false} /> */}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor:COLOR.BLACK
  },
  modalView: {
    backgroundColor: COLOR.WHITE,
    width: '80%',
    height: 170,
    borderRadius: 15,
    alignItems: 'center',
  },
  icon: {
    width: 120,
    height: 120,
  },
  commandBtn: {
    height: 45,
    width: 130,
  },
});

export default CustomModal;
