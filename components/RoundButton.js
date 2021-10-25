import React from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import {COLOR} from '../constant';
import {Icon} from 'react-native-elements';

function RoundButton(props) {
  return (
    <View style={props.style}>
      <TouchableOpacity
        style={[
          styles.roundBtn,
          {
            width: props.buttonWidth ? props.buttonWidth : 50,
            height: props.buttonHeight?props.buttonHeight:50,
          },
        ]}
        onPress={props.onPress}>
        <Icon
          name={props.icon}
          type="font-awesome"
          size={props.iconSize ? props.iconSize : 13}
          color={props.iconColor ? props.iconColor : COLOR.BLACK}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  roundBtn: {
    backgroundColor: COLOR.WHITE,
    borderRadius: 1000,
    justifyContent: 'center',
  },
});

export default RoundButton;
