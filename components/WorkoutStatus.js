import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {BackgroundImage} from 'react-native-elements/dist/config';
import LinearGradient from 'react-native-linear-gradient';
import TextTicker from 'react-native-text-ticker';
import {COLOR, HORIZONTAL_LIST_HEIGHT, SCREEN_WIDTH} from '../constant';

function WorkoutStatus(props, ref) {
  const currentExerciseListRef = useRef();

  useImperativeHandle(
    ref,
    () => ({
      scrollBack: () => {
        currentExerciseListRef.current.scrollTo({
          x: 0,
          y: 0,
          animated: true,
        });
      },
    }),
    [],
  );

  return (
    <ScrollView
      ref={currentExerciseListRef}
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      horizontal
      style={{
        //backgroundColor: COLOR.GREY,
        width: '100%',
        height: HORIZONTAL_LIST_HEIGHT,
        position: 'absolute',
        bottom: 0,
      }}>
      {props.data?.map((item, index) => {
        if (index === props.currentIndex)
          return (
            <View
              key={index}
              style={{
                width: SCREEN_WIDTH,
                height: HORIZONTAL_LIST_HEIGHT,
                //backgroundColor: COLOR.KELLY_GREEN,
                flexDirection: 'row',
              }}>
              <View style={styles.background} />
              <Image
                style={styles.excersiseImg}
                source={{uri: item?.data?.image}}
              />

              <View style={styles.excersiseItemDesWrapper}>
                <TextTicker
                  style={styles.excersiseDesTxt}
                  duration={6000}
                  bounce
                  loop
                  marqueeDelay={1000}>
                  {item?.data?.name}
                </TextTicker>
                <Text style={[styles.excersisesSmallDesTxt]}>
                  Thời gian nghỉ: {item?.rest}s
                </Text>
              </View>
              <View style={styles.nextExercise}>
                <TouchableOpacity
                  style={{alignItems: 'center'}}
                  onPress={() => {
                    currentExerciseListRef.current.scrollTo({
                      x: SCREEN_WIDTH,
                      y: 0,
                      animated: true,
                    });
                  }}>
                  <Image
                    style={styles.nextExcersiseImg}
                    source={{
                      uri:
                        props.data[index + 1]?.data?.image ||
                        'https://hips.hearstapps.com/ame-prod-menshealth-assets.s3.amazonaws.com/main/thumbs/39579/workout_finished.jpg',
                    }}
                  />
                  <Text
                    style={{
                      color: COLOR.WHITE,
                      marginTop: 5,
                      fontSize: 13,
                      fontWeight: 'bold',
                    }}>
                    Next
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        if (index === props.currentIndex + 1)
          return (
            <View
              style={{
                width: SCREEN_WIDTH,
                height: HORIZONTAL_LIST_HEIGHT,
                flexDirection: 'row',
              }}>
              <View style={styles.background} />
              <BackgroundImage
                style={styles.nextExcersiseImg2}
                imageStyle={{borderRadius: 5}}
                source={{uri: item?.data?.image}}>
                <LinearGradient
                  style={styles.nextExcersiseItemDesWrapper}
                  start={{x: 0.7, y: 0}}
                  end={{x: 0, y: 0}}
                  colors={[COLOR.TRANSPARENT, COLOR.BLACK]}>
                  <TextTicker
                    style={styles.excersiseDesTxt}
                    duration={6000}
                    bounce
                    loop
                    marqueeDelay={1000}>
                    {item?.data?.name}
                  </TextTicker>
                  {item?.time ? (
                    <Text style={[styles.excersisesSmallDesTxt]}>
                      Thời gian thực hiện: {item?.time}s
                    </Text>
                  ) : (
                    <Text style={[styles.excersisesSmallDesTxt]}>
                      Số reps: {item?.reps}
                    </Text>
                  )}
                  <Text style={[styles.excersisesSmallDesTxt]}>
                    Thời gian nghỉ: {item?.rest}s
                  </Text>
                </LinearGradient>
                <View style={styles.tag}>
                  <Text style={styles.tagTxt}>Động tác tiếp theo</Text>
                </View>
              </BackgroundImage>
            </View>
          );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  excersiseImg: {
    width: 100,
    height: 60,
    borderRadius: 10,
    marginLeft: 20,
    top: 70,
  },
  excersiseItemDesWrapper: {
    top: 10,
    marginLeft: 10,
    flex: 0.7,
    top: 70,
  },
  excersiseDesTxt: {
    color: COLOR.WHITE,
    fontSize: 20,
    fontWeight: 'bold',
    width: '100%',
  },
  excersisesSmallDesTxt: {
    color: COLOR.WHITE,
    fontSize: 14,
  },
  excersiseMuscleDesTxt: {
    color: COLOR.WHITE,
    fontSize: 14,
  },
  nextExercise: {
    width: 100,
    height: '100%',
    alignItems: 'flex-end',
    position: 'absolute',
    right: 10,
    top: 35,
    //paddingRight:10,
    //backgroundColor: COLOR.RED,
  },
  nextExcersiseImg: {
    width: 50,
    height: 50,
    borderRadius: 70,
  },
  nextExcersiseImg2: {
    width: '100%',
    height: 110,
    borderRadius: 10,
    marginHorizontal: 10,
    top: 20,
  },
  nextExcersiseItemDesWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  background: {
    height: HORIZONTAL_LIST_HEIGHT - 60,
    width: '100%',
    position: 'absolute',
    backgroundColor: '#555',
    bottom: 0,
  },
  tag: {
    backgroundColor: COLOR.BLACK,
    height: 25,
    width: 120,
    position: 'absolute',
    right: 30,
    top: 5,
    opacity: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  tagTxt: {
    color: COLOR.WHITE,
    fontSize: 13,
    fontWeight: 'bold',
  },
});

export default forwardRef(WorkoutStatus);
