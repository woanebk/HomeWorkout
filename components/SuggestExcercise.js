import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Text
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLOR} from '../constant';

function SuggestExcercise(props) {

  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={[styles.container, props.style]}>
        <Image source={props.image} style={styles.img} resizeMode="cover"></Image>
        <LinearGradient
          start={{x: 0, y: 0.5}}
          end={{x: 0, y: 0}}
          colors={[COLOR.TRANSPARENT, COLOR.BLACK]}
          style={styles.linearGradient}></LinearGradient>
        <Text style={styles.title}>{props.title}</Text>
        <View style={styles.tag}>
          <Text numberOfLines={1} adjustsFontSizeToFit style={styles.tagTxt}>Liên quan</Text>
        </View>
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    borderRadius: 10,
  },
  title: {
    fontSize: 17,
    color: COLOR.WHITE,
    position: 'absolute',
    paddingHorizontal:10,
    fontWeight:'bold',
    top:5
  },
  img: {
    flex: 1,
    borderRadius: 10,
  },
  linearGradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  tag:{
    position:'absolute',
    backgroundColor:COLOR.GOLD,
    borderTopLeftRadius:10,
    bottom:0,
    right:0,
    paddingHorizontal:5
  },
  tagTxt:{
    color:COLOR.BLACK,
    fontWeight:'bold'
  },
});

export default SuggestExcercise;
