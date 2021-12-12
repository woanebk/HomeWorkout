import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
} from 'react-native';
import { Icon } from 'react-native-elements';
import {COLOR} from '../constant';

function ProgressingListExcerciseItem(props) {
  return (
    <View key={props?.key}
      style={[
        styles.container,
        props.selected ? {backgroundColor: COLOR.MATTE_BLACK} : {},
      ]}>
      <Image source={{uri: props?.item?.data?.image}} style={styles.img} />
      <View style={{marginLeft: 15, flex: 1}}>
        <Text numberOfLines={1} style={[styles.title, props?.selected && {color: COLOR.WHITE}]}>
          {props.item?.data?.name}
        </Text>
        <Text
          style={[styles.subTitle, props?.selected && {color: COLOR.WHITE}]}>
          Số rep: {props.item?.reps}
        </Text>
        <Text
          style={[styles.subTitle, props?.selected && {color: COLOR.WHITE}]}>
          Thời gian nghỉ: {props.item?.rest}
        </Text>
      </View>
      {props.isDone && (
          <View style={styles.iconWrapper}>
              <Icon
            name="check-bold"
            type="material-community"
            size={14}
            color={COLOR.BLACK}
          />
          </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  img: {
    width: 100,
    height: '80%',
    borderRadius: 7,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 10,
  },
  iconWrapper:{
    width:25,
    height:25, 
    backgroundColor:COLOR.GOLD,
    borderRadius:40,
    justifyContent:'center',
    alignItems:'center'
  }
});

export default ProgressingListExcerciseItem;
