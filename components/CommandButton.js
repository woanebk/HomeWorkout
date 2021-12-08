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
          props.backgroundColor ? {backgroundColor: props.backgroundColor} : {},
        ]}
        onPress={props.onPress}>
        <Icon
          name={props.icon}
          type="font-awesome"
          size={props.iconSize ? props.iconSize : 13}
          color={props.iconColor ? props.iconColor : COLOR.WHITE}
        />
        <Text
          style={
            props.textStyle
              ? props.textStyle
              : {
                  color: props.textColor ? textColor : COLOR.WHITE,
                  fontSize: 15,
                  fontWeight: 'bold',
                  marginLeft: 10,
                }
          }>
          {props.title}
        </Text>
        {props.hasRightIcon && (
          <View
            style={[, props.rightIconContainerStyle, styles.rightIconWrapper]}>
            <Icon
              name={props?.rightIcon || 'arrow-circle-right'}
              type="font-awesome"
              size={props?.rightIconSize || 30}
              color={props?.rightIconColor || COLOR.WHITE}
            />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  commandBtn: {
    backgroundColor: COLOR.BLUE,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
  rightIconWrapper: {
    width: 30,
    height: 30,
    marginLeft: 15,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightIcon: {},
});

export default CommandButton;
