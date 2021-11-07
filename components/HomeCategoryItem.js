import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {COLOR} from '../constant';

function HomeCategoryItem(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <BackgroundImage source={props.image} 
          imageStyle={styles.img} style={[styles.container, props.style]}>
              <Text style={styles.title}>{props.title}</Text>
              <Text style={styles.subTitle}>{props.subTitle}</Text>
      </BackgroundImage>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    justifyContent:'center',
    alignItems:'center'
  },
  title: {
    fontSize: 25,
    color: COLOR.WHITE,
    fontWeight: 'bold',
  },
  img: {
    borderRadius: 8,
    backgroundColor: '#000000',
    opacity:0.8
  },
  subTitle: {
    fontSize: 13,
    color: COLOR.WHITE,
    fontWeight: 'bold',
  },
});

export default HomeCategoryItem;
