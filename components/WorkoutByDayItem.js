import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  ImageBackground,
} from 'react-native';
import {COLOR} from '../constant';
import {Icon} from 'react-native-elements';
import { handleArrayToString } from '../utilities/Utilities';

function WorkoutByDayItem(props) {
  return (
    <View style={props?.style}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          <Text numberOfLines={1} style={styles.dayTxt}>
            Ngày {props?.index + 1}
          </Text>
          <Text numberOfLines={1} style={styles.day2Txt}>
            {handleArrayToString(props?.item?.data?.muscle_group)}
          </Text>
        </View>
        {props?.isDone && (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 30,
            }}>
            <Icon
              name="check-circle"
              type="font-awesome-5"
              size={23}
              color={COLOR.WHITE}
            />
          </View>
        )}
      </View>
      <TouchableOpacity onPress={props?.onPress}>
        <View style={[props.style, styles.container]}>
          {props?.isDone ? (
            <ImageBackground
              style={styles.imageBackgroundDone}
              imageStyle={[props?.imageStyle, styles.image, {opacity: 0.4}]}
              source={props?.image}
              resizeMode="cover">
              <Text
                numberOfLines={1}
                style={[styles.titleTxt, {fontWeight: 'bold'}]}>
                Đã Hoàn Thành
              </Text>
            </ImageBackground>
          ) : (
            <ImageBackground
              style={styles.imageBackground}
              imageStyle={[props?.imageStyle, styles.image]}
              source={props?.image}
              resizeMode="cover">
              <Text numberOfLines={1} style={styles.titleTxt}>
                {props.title}
              </Text>
            </ImageBackground>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 160,
    height: 70,
    backgroundColor: '#000',
    borderRadius: 7,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageBackgroundDone: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 7,
  },
  titleTxt: {
    color: COLOR.WHITE,
    fontSize: 16,
    marginHorizontal: 5,
    marginBottom: 5,
  },
  desTxt: {
    color: COLOR.WHITE,
    fontSize: 12,
  },
  dayTxt: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 15,
    color: COLOR.WHITE,
    fontWeight: 'bold',
  },
  day2Txt: {
    marginBottom: 5,
    fontSize: 13,
    color: COLOR.WHITE,
  },
});

export default WorkoutByDayItem;
