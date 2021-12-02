import React, {useRef, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  Image,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import {COLOR, SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constant';
import HeartButton from '../../components/HeartButton';
import {Icon} from 'react-native-elements';

const HEADER_HEIGHT = 250; // height of the image
const SCREEN_HEADER_HEIGHT = 90; // height of the header contain back button
const NOTCH_SIZE = 30;
const LIST_EXTRA_SIZE = 120;

function AllExcerciseScreen({navigation}) {
  const DATA = [
    {
      title: 'Khởi động',
    },
    {
      title: 'Khởi động',
    },
    {
      title: 'Khởi động',
    },
    {
      title: 'Khởi động',
    },
    {
      title: 'Khởi động',
    },
    {
      title: 'Khởi động',
    },
    {
      title: 'Khởi động',
    },
    {
      title: 'Khởi động',
    },
    {
      title: 'Khởi động',
    },
    {
      title: 'Khởi động',
    },
    {
      title: 'Khởi động',
    },
    {
      title: 'Khởi động',
    },
    {
      title: 'Khởi động',
    },
    {
      title: 'Khởi động',
    },
    {
      title: 'Khởi động',
    },
    {
      title: 'Khởi động',
    },
    {
      title: 'Khởi động',
    },
    {
      title: 'Khởi động',
    },
    {
      title: 'Khởi động',
    },
    {
      title: 'Khởi động',
    },
    {
      title: 'Khởi động',
    },
    {
      title: 'Khởi động',
    },
    {
      title: 'Khởi động',
    },
    {
      title: 'Khởi động',
    },
  ];

  const scrollY = useRef(new Animated.Value(0)).current;

  const renderHeader = () => (
    <Animated.View
      style={[
        styles.header,
        {
          transform: [
            {
              scaleY: scrollY.interpolate({
                inputRange: [0, 200, SCREEN_HEIGHT, 9999],
                outputRange: [1, 1, 20, 20],
              }),
            },
          ],
        },
      ]}>
      <Animated.Image
        blurRadius={scrollY.interpolate({
          inputRange: [0, HEADER_HEIGHT, SCREEN_HEIGHT],
          outputRange: [0, 20, 20],
        })}
        style={[
          styles.headerImg,
          {
            transform: [
              {
                scaleY: scrollY.interpolate({
                  inputRange: [0, 400, 99999],
                  outputRange: [1, 1.95, 1.95],
                }),
              },
            ],
          },
        ]}
        source={{uri:'https://upload.wikimedia.org/wikipedia/vi/4/45/Divide_cover.png'}}
        resizeMode="cover"></Animated.Image>
      <Animated.View style={[styles.headerContentWrapper,{
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [0, HEADER_HEIGHT, 99999],
                outputRange: [0, -HEADER_HEIGHT, HEADER_HEIGHT],
              }),
            },
          ],
      }]}>
        <View style={styles.headerTxtWrapper}>
          <Text style={styles.headerTxt}>Thư viện bài tập</Text>
          <Text style={styles.infoTxt}>Số lượng: {DATA?.length}</Text>
        </View>
      </Animated.View>
    </Animated.View>
  );

  const renderItem = item => (
    <View style={styles.itemWrapper}>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate('ExcerciseInfo')}>
        <Text style={styles.excersiseInfo}>Rep: 15</Text>
      </TouchableWithoutFeedback>
    </View>
  );

  return (
    <View style={{flex: 1, backgroundColor: COLOR.LIGHT_MATTE_BLACK}}>
      <StatusBar backgroundColor="transparent" translucent />
      {renderHeader()}
      <Animated.FlatList
        style={[
          styles.flatlist,
          {
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, HEADER_HEIGHT, 99999],
                  outputRange: [0, -LIST_EXTRA_SIZE, 0],
                }),
              },
            ],
          },
        ]}
        data={DATA}
        keyExtractor={(item, index) => index}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        renderItem={item => renderItem(item)}></Animated.FlatList>
      <Animated.View style={[styles.screenHeader]}>
        <Animated.Text
          numberOfLines={1}
          style={[
            styles.commandTxt,
            {
              transform: [
                {
                  translateX: scrollY.interpolate({
                    inputRange: [
                      HEADER_HEIGHT - 80,
                      HEADER_HEIGHT - 70,
                      999999999,
                    ],
                    outputRange: [50, 0, 0],
                  }),
                },
              ],
            },
          ]}>
          Bài Tập Vai
        </Animated.Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenHeader: {
    height: SCREEN_HEADER_HEIGHT,
    position: 'absolute',
    top: 0,
    width: '100%',
    justifyContent: 'center',
    paddingTop: 20,
  },
  header: {
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: COLOR.BLACK,
    // marginTop: -10000,
    // paddingTop: 10000,
  },
  headerImg: {
    height: HEADER_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: COLOR.BLACK,
  },
  headerContentWrapper: {
    position: 'absolute',
    bottom: 0,
    paddingBottom: NOTCH_SIZE + 30,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
  },
  headerTxtWrapper: {
    marginLeft: 20,
  },
  headerTxt: {
    color: COLOR.WHITE,
    fontSize: 35,
    fontWeight: '600',
  },
  infoTxt: {
    color: COLOR.WHITE,
    fontSize: 15,
    fontWeight:'400'
  },
  flatlist: {
    flex: 1,
    backgroundColor: COLOR.MATTE_BLACK,
    borderRadius: 7,
    marginTop: -NOTCH_SIZE,
    marginBottom: -LIST_EXTRA_SIZE,
    marginHorizontal: 20,
    paddingHorizontal:10
  },
  itemWrapper: {
    //backgroundColor: COLOR.WHITE,
    paddingVertical: 5,
    height:100
  },
  excersiseWrapper: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    //backgroundColor: COLOR.WHITE,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
  },
  itemImg: {
    width: 120,
    height: 60,
    borderRadius: 10,
  },
  txtWrapper: {
    paddingHorizontal: 10,
  },
  excersiseName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  excersiseInfo: {
    fontSize: 13,
    color: COLOR.GREY,
  },
  commandTxt: {
    fontSize: 20,
    color: COLOR.WHITE,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export default AllExcerciseScreen;
