import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {COLOR} from '../constant';

function ProgramItem(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={[styles.container, props.style]}>
        <Image
          source={props.image}
          style={styles.img}
          resizeMode="cover"></Image>
        {/* <LinearGradient
          start={{x: 0, y: 1}}
          end={{x: 0, y: 0}}
          colors={[COLOR.TRANSPARENT, COLOR.BLACK]}
          style={styles.linearGradient}></LinearGradient> */}
        <View style={{marginVertical: 5, width:'80%'}}>
          <Text numberOfLines={3} style={styles.title}>{props.title}</Text>
        </View>
        <View style={styles.tag}>
          <Icon
          type='font-awesome-5'
          name='play'
          size={12}
          color={COLOR.WHITE}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    //backgroundColor: '#000',
    borderRadius: 15,
  },
  title: {
    fontSize: 15,
    color: COLOR.WHITE,
    position: 'absolute',
    paddingHorizontal: 10,
    fontWeight: 'bold',
    top: 5,
  },
  img: {
    flex: 0.65,
    borderRadius: 15,
  },
  linearGradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  tag: {
    position: 'absolute',
    backgroundColor: '#ff6666',
    borderRadius: 10,
    bottom: '30%',
    right: 5,
    width:30,
    height:30,
    alignItems:'center',
    justifyContent:'center'
  },
  tagTxt: {
    color: COLOR.BLACK,
    fontWeight: 'bold',
  },
});

export default ProgramItem;
