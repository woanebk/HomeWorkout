import React, {useEffect, useRef, useState} from 'react';
import {Text, StyleSheet, View, StatusBar, Image, Animated} from 'react-native';
import {COLOR} from '../../constant';
import HeartButton from '../../components/HeartButton';
import {Icon} from 'react-native-elements';
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {getExerciseByIds} from '../../utilities/FirebaseDatabase';
import LoadingView from '../../components/LoadingView';

const HEADER_HEIGHT = 300; // height of the image
const SCREEN_HEADER_HEIGHT = 90; // height of the header contain back button

function WorkoutDetailScreen({navigation, route}) {
  const {workoutData, challengeId, dayIndex} = route.params || {};

  const [workout, setWorkout] = useState(workoutData ? workoutData : {});
  const [liked, setLiked] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsLoading(true);
    for (let i = 0; i < workout?.rounds?.length; i++) {
      for (let j = 0; j < workout?.rounds[i]?.exercises?.length; j++) {
        const exerciseId = workout?.rounds[i]?.exercises[j]?.id;
        const res = await getExerciseByIds(exerciseId);
        if (res) workout.rounds[i].exercises[j].data = res.val();
      }
    }
    setIsLoading(false);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Animated.Image
        style={[
          styles.headerImg,
          {
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                  outputRange: [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
                }),
              },
              {
                scale: scrollY.interpolate({
                  inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                  outputRange: [2, 1, 0.75],
                }),
              },
            ],
          },
        ]}
        source={{uri: workout?.image}}
        resizeMode="cover"></Animated.Image>
      <Animated.View style={styles.headerContentWrapper}>
        <View style={styles.headerTxtWrapper}>
          <Text style={styles.infoTxt}>
            Số Round: x{workout?.rounds?.length}
          </Text>
          <Text style={styles.headerTxt}>{workout?.name}</Text>
        </View>
        <ScrollView horizontal style={styles.tagScroll}>
          {workout?.muscle_group &&
            workout?.muscle_group?.map((item, index) => (
              <View
                style={[styles.tag, index == 0 ? {marginLeft: 20} : {}]}
                key={index}>
                <Text style={styles.tagTxt}>{item}</Text>
              </View>
            ))}
        </ScrollView>
      </Animated.View>
    </View>
  );

  const renderItem = (item, index) => (
    <View style={styles.itemWrapper} key={index}>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate('ExerciseInfo', {exercise: item?.data})}>
        <View style={styles.excersiseWrapper}>
          <Image
            resizeMode="cover"
            style={styles.itemImg}
            source={{
              uri: item?.data?.image,
            }}></Image>
          <View style={styles.txtWrapper}>
            <Text style={styles.excersiseName}>{item?.data?.name}</Text>
            {item?.time ? (
            <Text style={styles.excersiseInfo}>Thời gian: {item?.time}s</Text>

            ):(
              <Text style={styles.excersiseInfo}>Rep: {item?.reps}</Text>)}
              {item?.rest && <Text style={[styles.excersiseInfo]}>Nghỉ: {item?.rest}s</Text>}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );

  const renderSection = item => {
    return (
      <View>
        <View style={styles.sectionWrapper}>
          <Text style={styles.sectionTxt}>{item?.name}</Text>
          <View style={styles.dot}></View>
          <Text style={styles.sectionTxt}>Số Set: {item?.set}</Text>
        </View>
        {item?.exercises?.map((itemExercise, index) => {
          return renderItem(itemExercise, index);
        })}
        {/* {renderRest(item?.rest)} */}
      </View>
    );
  };

  const renderRest = time => (
    <View style={styles.restWrapper}>
      <Icon name="time-outline" size={16} type="ionicon" color={COLOR.GREY} />
      <Text style={styles.restTxt}> Thời gian nghỉ: {time} phút</Text>
    </View>
  );

  if (isLoading)
    return (
      <View style={{backgroundColor: COLOR.LIGHT_MATTE_BLACK, flex: 1}}>
        <LoadingView />
      </View>
    );

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor="transparent" translucent />
      <Animated.FlatList
        style={styles.flatlist}
        data={workout.rounds}
        keyExtractor={(item, index) => index}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        ListHeaderComponent={renderHeader()}
        renderItem={({item}) => renderSection(item)}
        ListFooterComponent={() => (
          <View style={{height: 70}}></View>
        )}></Animated.FlatList>
      <View style={styles.btnWrapper}>
        <TouchableOpacity
          style={styles.commandBtn}
          onPress={() => {
            navigation.navigate('WorkoutProgress', {workoutData: workout, challengeId: challengeId, dayIndex: dayIndex});
          }}>
          <Text style={styles.commandTxt}>Bắt Đầu</Text>
        </TouchableOpacity>
      </View>
      <Animated.View
        style={[
          styles.screenHeader,
          {
            opacity: scrollY.interpolate({
              inputRange: [0 + 50, HEADER_HEIGHT - SCREEN_HEADER_HEIGHT],
              outputRange: [0, 1],
            }),
          },
        ]}>
        <Animated.Text
          numberOfLines={1}
          style={[
            styles.commandTxt,
            {
              transform: [
                {
                  translateX: scrollY.interpolate({
                    inputRange: [HEADER_HEIGHT - 80, HEADER_HEIGHT - 70, 9999],
                    outputRange: [50, 0, 0],
                  }),
                },
              ],
            },
          ]}>
          {workout?.name}
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
    backgroundColor: COLOR.MATTE_BLACK,
    justifyContent: 'center',
    paddingTop: 20,
  },
  header: {
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: COLOR.MATTE_BLACK,
    marginTop: -10000,
    paddingTop: 10000,
  },
  headerContentWrapper: {
    position: 'absolute',
    bottom: 0,
    //backgroundColor:'#fff',
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  headerTxtWrapper: {
    marginLeft: 20,
  },
  headerTxt: {
    color: COLOR.WHITE,
    fontSize: 30,
    fontWeight: 'bold',
  },
  infoTxt: {
    color: COLOR.WHITE,
    fontSize: 15,
  },
  flatlist: {
    flex: 1,
    //backgroundColor:COLOR.WHITE
  },
  itemWrapper: {
    backgroundColor: COLOR.WHITE,
    paddingVertical: 5,
  },
  excersiseWrapper: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLOR.WHITE,
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
    fontSize: 12,
    color: COLOR.GREY,
  },
  restWrapper: {
    height: 32,
    backgroundColor: COLOR.LIGHT_GREY,
    borderBottomLeftRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    marginLeft: 20,
  },
  restTxt: {
    fontWeight: 'bold',
    color: COLOR.GREY,
    fontSize: 13,
  },
  headerImg: {
    height: HEADER_HEIGHT,
    width: '200%',
    opacity: 0.5,
  },
  btnWrapper: {
    padding: 10,
    height: 70,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  commandBtn: {
    backgroundColor: COLOR.MATTE_BLACK,
    padding: 10,
    height: '100%',
    width: '100%',
    borderRadius: 5,
  },
  commandTxt: {
    fontSize: 20,
    color: COLOR.WHITE,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  sectionWrapper: {
    height: 30,
    paddingLeft: 10,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  sectionTxt: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLOR.MATTE_BLACK,
  },
  dot: {
    width: 5,
    height: 5,
    backgroundColor: COLOR.BLACK,
    borderRadius: 20,
    marginHorizontal: 8,
  },
  likeBtn: {
    position: 'absolute',
    top: 30,
    right: 10,
  },
  tagScroll: {
    maxHeight: 50,
  },
  tag: {
    height: 30,
    backgroundColor: COLOR.WHITE,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginRight: 10,
  },
  tagTxt: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingHorizontal: 15,
  },
});

export default WorkoutDetailScreen;
