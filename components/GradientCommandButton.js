import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import {COLOR} from '../constant';
import {Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

function GradientCommandButton(props) {
  return (
    <LinearGradient style={props.style}
    start={{x: 0.7, y: 0.1}}
    end={{x: 0, y: 0.5}}
    colors={[COLOR.GOLD,COLOR.DARK_BROWN , COLOR.BLACK]}
    > 
      <TouchableOpacity
        style={[
          styles.commandBtn,
        ]}
        onPress={props.onPress}>
        <Icon
          name={props.icon}
          type="font-awesome"
          size={props.iconSize ? props.iconSize : 13}
          color={props.iconColor ? props.iconColor : COLOR.WHITE}
        />
        <Text style={{color:props.textColor?textColor:COLOR.WHITE, fontSize:15, fontWeight:'bold', marginLeft:10}}>{props.title}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
    commandBtn: {
    //backgroundColor: COLOR.BLUE,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems:'center',
    flexDirection:'row',
    width:'100%',
    height:'100%'
  },
});

export default GradientCommandButton;
