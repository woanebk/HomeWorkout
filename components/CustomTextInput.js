import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {COLOR} from '../constant';

const TITLE_HEIGHT = 20;

function CustomTextInput(props) {
  return (
    <KeyboardAvoidingView style={[styles.body, props.style]}>
      <View style={styles.title}>
        <Text style={styles.titleTxt}>{props.title}</Text>
      </View>
      <Icon
        name={props.icon}
        type="font-awesome"
        size={18}
        color={COLOR.WHITE}
      />
      <TextInput
        value={props.value}
        onChangeText={props.onChangeText}
        style={{width: '80%', marginLeft: 10, color:COLOR.WHITE}}
        placeholderTextColor={COLOR.WHITE}
        placeholder={props.placeholder}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    width: 300,
    height: 45,
    backgroundColor: COLOR.WHITE,
    opacity: 0.6,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  title: {
    position: 'absolute',
    paddingHorizontal: 5,
    height: TITLE_HEIGHT,
    top: -TITLE_HEIGHT -5,
    left: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  titleTxt: {
    fontWeight: 'bold',
    fontSize: 15,
    color: COLOR.WHITE,
  },
});

export default CustomTextInput;
