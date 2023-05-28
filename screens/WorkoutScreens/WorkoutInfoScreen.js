import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  ImageBackground,
  ScrollView,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLOR, SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constant';
import HeartButton from '../../components/HeartButton';
import StartButton from '../../components/StartButton';
import {
  addWorkoutToListFavorite,
  getUserInfo,
  getWorkoutById,
  removeWorkoutFromListFavorite,
} from '../../utilities/FirebaseDatabase';
import LoadingView from '../../components/LoadingView';
import {convertObjectToArrayWithoutKey} from '../../utilities/Utilities';
function WorkoutInfoScreen({navigation, route}) {
  const {workoutId, challengeId, dayIndex} = route.params || '';

  const [liked, setLiked] = useState(false);
  const [workout, setWorkout] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getWorkoutData();
    checkIsLiked();
  }, [workoutId]);

  const getWorkoutData = async () => {
    try {
      setIsLoading(true);
      const res = await getWorkoutById(workoutId);
      if (!res) throw 'CANNOT GET WORKOUT DATA';
      setWorkout(res.val());
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const checkIsLiked = async () => {
    const res = await getUserInfo();
    const listFavorite = convertObjectToArrayWithoutKey(
      res.val()?.favoriteWorkouts,
    );
    const isLiked = listFavorite?.some(item => {
      return item?.id === workoutId;
    });
    setLiked(isLiked);
  };

  const handleLike = async () => {
    if (!liked) {
      addWorkoutToListFavorite(workoutId);
      setLiked(true);
    } else {
      removeWorkoutFromListFavorite(workoutId);
      setLiked(false);
    }
  };

  const renderHeader = () => (
    <View style={styles.banner}>
      <ImageBackground
        source={{uri: workout?.image}}
        resizeMode="cover"
        style={{flex: 1, justifyContent: 'space-between'}}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={[COLOR.BLACK, COLOR.TRANSPARENT]}
          style={styles.topLinearGradient}>
          <HeartButton
            style={styles.likeBtn}
            isliked={liked}
            onButtonPress={() => {
              handleLike();
            }}
          />
        </LinearGradient>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={[COLOR.TRANSPARENT, COLOR.BLACK]}
          style={styles.linearGradient}>
          <Text style={styles.levelTxt} numberOfLines={1}>
            Level: {workout?.level}
          </Text>
          <Text style={styles.title} numberOfLines={2}>
            {workout?.name}
          </Text>
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
          <Text style={styles.levelTxt}>
            Thời gian ước tính : {workout?.estimate_time} phút
          </Text>
          <Text style={styles.levelTxt}>
            Số Round : x{workout?.rounds?.length}
          </Text>
        </LinearGradient>
      </ImageBackground>
    </View>
  );

  return (
    <View style={{flex: 1, backgroundColor: COLOR.BLACK}}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"></StatusBar>
      {renderHeader()}
      <View style={styles.btnWrapper}>
        <StartButton
          title="Bắt Đầu"
          onButtonPress={() =>
            navigation.navigate('WorkoutDetail', {
              workoutData: workout,
              challengeId: challengeId,
              dayIndex: dayIndex,
            })
          }></StartButton>
      </View>
      {isLoading && (
        <View
          style={{
            position: 'absolute',
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
            backgroundColor: COLOR.MATTE_BLACK,
          }}>
          <LoadingView />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    height: '80%',
  },
  topLinearGradient: {
    height: 120,
  },
  linearGradient: {
    height: 300,
    justifyContent: 'flex-end',
  },
  levelTxt: {
    fontSize: 15,
    color: COLOR.WHITE,
    width: '80%',
    paddingHorizontal: 20,
    lineHeight: 25,
  },
  title: {
    fontSize: 40,
    color: COLOR.WHITE,
    fontWeight: 'bold',
    width: '100%',
    paddingHorizontal: 20,
  },
  btnWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 60,
    //backgroundColor:'#fff'
  },
  btn: {
    width: 120,
    height: 120,
    backgroundColor: '#fff',
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTxt: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
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
  likeBtn: {
    position: 'absolute',
    right: 20,
    top: 30,
  },
});

export default WorkoutInfoScreen;
