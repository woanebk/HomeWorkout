import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  ImageBackground,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {COLOR} from '../constant';

function ProgressingListExcerciseItem(props) {
  return (
    <TouchableWithoutFeedback onPress={props?.onPress}>
      <View
        key={props?.key}
        style={[
          styles.container,
          props.selected ? {backgroundColor: COLOR.MATTE_BLACK} : {},
        ]}>
        <ImageBackground
          resizeMode="cover"
          source={{uri: props?.item?.data?.image}}
          imageStyle={[styles.img, props?.isDone && {opacity: 0.5}]}
          style={[styles.imageView]}>
          {props?.isDone && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon
                name="clock-o"
                type="font-awesome"
                size={20}
                color={COLOR.WHITE}
              />
              <Text
                style={{color: COLOR.WHITE, fontSize: 17, fontWeight: 'bold'}}>
                {' '}
                {props?.item?.doneTime || 0}s
              </Text>
            </View>
          )}
        </ImageBackground>
        <View style={{marginLeft: 15, flex: 1}}>
          <Text
            numberOfLines={1}
            style={[styles.title, props?.selected && {color: COLOR.WHITE}]}>
            {props.item?.data?.name}
          </Text>
          {props?.item?.time ? (
            <Text
              style={[
                styles.subTitle,
                props?.selected && {color: COLOR.WHITE},
              ]}>
              Thời gian: {props.item?.time}s
            </Text>
          ) : (
            <Text
              style={[
                styles.subTitle,
                props?.selected && {color: COLOR.WHITE},
              ]}>
              Số rep: {props.item?.reps}
            </Text>
          )}
          <Text
            style={[styles.subTitle, props?.selected && {color: COLOR.WHITE}]}>
            Thời gian nghỉ: {props.item?.rest}s
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
    </TouchableWithoutFeedback>
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
    borderRadius: 7,
    height: '100%',
    backgroundColor: COLOR.BLACK,
  },
  imageView: {
    borderRadius: 7,
    width: 110,
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.BLACK,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 11,
  },
  iconWrapper: {
    width: 25,
    height: 25,
    backgroundColor: COLOR.GOLD,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProgressingListExcerciseItem;
