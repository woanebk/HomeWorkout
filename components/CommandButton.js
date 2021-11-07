import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import {COLOR} from '../constant';
import {Icon} from 'react-native-elements';

function CommandButton(props) {
  return (
    <View style={props.style}>
      <TouchableOpacity
        style={[
          styles.commandBtn,
          props.backgroundColor? {backgroundColor: props.backgroundColor} : {}
        ]}
        onPress={props.onPress}>
        <Icon
          name={props.icon}
          type="font-awesome"
          size={props.iconSize ? props.iconSize : 13}
          color={props.iconColor ? props.iconColor : COLOR.WHITE}
        />
        <Text style={props.textStyle ? props.textStyle : {color:props.textColor?textColor:COLOR.WHITE, fontSize:15, fontWeight:'bold', marginLeft:10}}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    commandBtn: {
    backgroundColor: COLOR.BLUE,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems:'center',
    flexDirection:'row',
    width:'100%',
    height:'100%'
  },
});

export default CommandButton;
