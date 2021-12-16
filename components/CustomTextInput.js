import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {Icon} from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {COLOR} from '../constant';

const TITLE_HEIGHT = 20;

function CustomTextInput(props) {

  const inputRef = useRef();

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
        ref={inputRef}
        value={props.value}
        onChangeText={props.onChangeText}
        style={{width: '80%', marginLeft: 10, color:COLOR.WHITE,fontSize:18}}
        placeholderTextColor={COLOR.WHITE}
        secureTextEntry={props.secureTextEntry}
        keyboardType={props.keyboardType?props.keyboardType:'default'}
        placeholder={props.placeholder}
      />
      <TouchableOpacity onPress={()=>inputRef.current.clear()}>
        <Icon
        name={'close'}
        type="font-awesome"
        size={14}
        color={COLOR.WHITE}
        />
      </TouchableOpacity>
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
    borderWidth:0.5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  title: {
    position: 'absolute',
    paddingHorizontal: 10,
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
