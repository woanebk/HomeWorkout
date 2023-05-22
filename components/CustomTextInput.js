import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLOR} from '../constant';

const TITLE_HEIGHT = 20;

function CustomTextInput(props) {
  const inputRef = useRef();
  const [showPassword, setShowPassword] = useState(
    props.isPassword ? false : !props.secureTextEntry,
  );
  const renderLeadingIcon = () => {
    if (props.isPassword)
      return (
        <TouchableOpacity
          onPress={() => {
            setShowPassword(showPassword => !showPassword);
          }}>
          <Icon
            name={showPassword ? 'unlock' : 'lock'}
            type="font-awesome"
            size={18}
            color={COLOR.WHITE}
          />
        </TouchableOpacity>
      );
    return (
      <Icon
        name={props.icon}
        type="font-awesome"
        size={18}
        color={COLOR.WHITE}
      />
    );
  };

  return (
    <KeyboardAvoidingView
      style={[
        styles.body,
        props.style,
        {
          backgroundColor: props.backgroundColor
            ? props.backgroundColor
            : COLOR.LIGHT_GREY,
        },
      ]}>
      <View style={styles.title}>
        <Text style={styles.titleTxt}>{props.title}</Text>
      </View>
      {renderLeadingIcon()}
      <TextInput
        ref={inputRef}
        value={props.value}
        onChangeText={props.onChangeText}
        style={{width: '80%', marginLeft: 10, color: COLOR.WHITE, fontSize: 18}}
        placeholderTextColor={COLOR.WHITE}
        secureTextEntry={!showPassword}
        keyboardType={props.keyboardType ? props.keyboardType : 'default'}
        placeholder={props.placeholder}
      />
      {props.value != '' ? (
        <TouchableOpacity
          style={{marginRight: 10}}
          onPress={() => {
            props.onChangeText('');

            inputRef.current.clear();
          }}>
          <Icon
            name={'close'}
            type="font-awesome"
            size={14}
            color={COLOR.WHITE}
          />
        </TouchableOpacity>
      ) : (
        <View style={{width: 22}}></View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  body: {
    width: 300,
    height: 45,

    opacity: 0.6,
    borderRadius: 6,
    paddingLeft: 8,
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  title: {
    position: 'absolute',
    paddingHorizontal: 10,
    height: TITLE_HEIGHT,
    top: -TITLE_HEIGHT - 5,
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
