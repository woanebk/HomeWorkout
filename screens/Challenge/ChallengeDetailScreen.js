import {BlurView} from '@react-native-community/blur';
import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, ScrollView, FlatList} from 'react-native';
import {Icon} from 'react-native-elements';
import {BackgroundImage} from 'react-native-elements/dist/config';
import LinearGradient from 'react-native-linear-gradient';
import CommandButton from '../../components/CommandButton';
import WorkoutByDayItem from '../../components/WorkoutByDayItem';
import CustomModal from '../../components/CustomModal';
import {COLOR, SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constant';
import Toast from 'react-native-toast-message';
import {
  addChallengeToMyList,
  deleteChallengeOutOfMyList,
  getUserChallengeById,
  getWorkoutById,
  lookupChallengeInMyList,
} from '../../utilities/FirebaseDatabase';
import LoadingView from '../../components/LoadingView';
const LINEAR_GRADIENT_HEIGHT = 120;

function ChallengeDetailScreen({route, navigation}) {
  const {item, key} = route.params;
  const [isSubCribed, setIsSubCribed] = useState(false);
  const [challengeDetail, setChallengeDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);

  useEffect(() => {
    handleGetData();
  }, []);

  const handleGetData = async () => {
    try {
      setIsLoading(true);
      if (key != null) {
        var res = await getUserChallengeById(key);
        const challengeWithDaysData = await getListWorkoutByDay(res);
        setChallengeDetail(challengeWithDaysData);
        await checkSubcribedOrNot();
      } else {
        var res = await getUserChallengeById(item.id);
        const challengeWithDaysData = await getListWorkoutByDay(res);
        setChallengeDetail(challengeWithDaysData);
        await checkSubcribedOrNot();
      }
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  const checkSubcribedOrNot = async () => {
    const res = await lookupChallengeInMyList(key);
    setIsSubCribed(res !== null);
  };

  const getListWorkoutByDay = async challenge => {
    let challengeWithData = challenge;
    for (let i = 0; i < challenge?.listWorkout?.length; i++) {
      const res = await getWorkoutById(challenge?.listWorkout[i]?.workoutId);
      challenge.listWorkout[i].data = res.val();
    }
    return challengeWithData;
  };

  const handleOnSubcribePress = async () => {
    if (isSubCribed) {
      setShowModalConfirm(true);
    } else {
      await subcribeChallenge();
    }
  };

  const subcribeChallenge = async () => {
    try {
      setIsLoading(true);
      await addChallengeToMyList(challengeDetail);
      setIsSubCribed(true);
    } catch {
    } finally {
      setIsLoading(false);
    }
  };
  const unSubcribeChallenge = async () => {
    try {
      setIsLoading(true);
      await deleteChallengeOutOfMyList(challengeDetail);
      setIsSubCribed(false);
      handleGetData()
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  const renderWorkoutByDayItem = (item, index) => {
    return (
      <WorkoutByDayItem
        onPress={() => {
          isSubCribed
            ? navigation.navigate('WorkoutInfo', {workoutId: item?.workoutId, challengeId: challengeDetail?.id, dayIndex: index})
            : Toast.show({
                type: 'info',
                text1: 'Thông báo',
                text2:
                  'Để thực hiện bài tập này bạn cần phải tham gia thử thách 👋',
              });
        }}
        isDone={item?.isDone}
        style={{marginRight: 10}}
        title={item?.data?.name}
        item={item}
        index={index}
        image={{
          uri:
            item?.data?.image ||
            'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        }}
      />
    );
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <BackgroundImage
        source={{
          uri: challengeDetail?.imgURL,
        }}
        imageStyle={styles.img}
        style={[styles.img]}>
        <BlurView
          overlayColor={'#00000010'}
          style={styles.blur}
          blurType="dark"
          blurAmount={15}
          reducedTransparencyFallbackColor="black"
        />
        <View style={styles.titleWrapper}>
          <Text style={styles.titleTxt}>{challengeDetail?.title}</Text>
        </View>
        <View style={[styles.blur]}>
          <View style={styles.rowItem}>
            <View style={styles.iconWrapper}>
              <Icon
                name="calendar-alt"
                type="font-awesome-5"
                size={25}
                color={COLOR.BLACK}
              />
            </View>
            <View style={styles.rowItemTextWrapper}>
              <Text style={styles.rowItemTitleTxt}>
                Thời gian:{' '}
                {/* {challengeDetail?.endTime != null
                  ? (convertStringDDMMYYtoDate(
                      challengeDetail.endTime,
                    ).getTime() -
                      convertStringDDMMYYtoDate(
                        challengeDetail?.startTime,
                      ).getTime()) /
                      (1000 * 3600 * 24) +
                    ''
                  : 7}{' '} */}
                  {challengeDetail?.listWorkout?.length || 0 }
                {' '}ngày
              </Text>
              <Text style={styles.rowItemSubTxt}>
                30
                phút mỗi ngày
              </Text>
              {/* <Text style={styles.rowItemSubTxt}>
                Ngày bắt đầu:{challengeDetail.startTime}
              </Text>
              <Text style={styles.rowItemSubTxt}>
                Ngày kết thúc:{challengeDetail.endTime}
              </Text> */}
            </View>
          </View>
          <FlatList
            style={styles.workoutList}
            data={challengeDetail?.listWorkout}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => renderWorkoutByDayItem(item, index)}
          />
          <Text style={styles.aboutTxt}>Giới thiệu thử thách</Text>
          <ScrollView style={styles.detail}>
            <Text style={styles.aboutContentTxt}>{challengeDetail?.body}</Text>
          </ScrollView>
        </View>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 0.9}}
          colors={[COLOR.TRANSPARENT, COLOR.MATTE_BLACK]}
          style={styles.linearGradient}></LinearGradient>

        <CommandButton
          backgroundColor={isSubCribed ? COLOR.GREY : COLOR.BLUE}
          style={styles.commandBtn}
          hasRightIcon
          title={isSubCribed ? 'Hủy đăng kí' : 'Tham gia ngay'}
          onPress={handleOnSubcribePress}
        />
      </BackgroundImage>
      <CustomModal
        visible={showModalConfirm}
        title="Bạn có chắc muốn từ bỏ thử thách này không ?"
        onConfirm={async () => {
          setShowModalConfirm(false);
          await unSubcribeChallenge();
        }}
        onCancel={() => setShowModalConfirm(false)}
      />
      {isLoading && (
        <View
          style={{
            position: 'absolute',
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
            backgroundColor: COLOR.MATTE_BLACK,
            opacity: 0.95,
          }}>
          <LoadingView />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  closeBtnWrapper: {
    position: 'absolute',
    top: 50,
    right: 15,
  },
  img: {
    width: '100%',
    height: '100%',
    backgroundColor: COLOR.BLACK,
  },
  blur: {
    position: 'absolute',
    height: 420,
    left: 0,
    bottom: 5,
    right: 0,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  linearGradient: {
    position: 'absolute',
    bottom: 0,
    height: LINEAR_GRADIENT_HEIGHT,
    width: '100%',
  },
  titleTxt: {
    color: COLOR.WHITE,
    fontSize: 32,
    lineHeight: 50,
    marginHorizontal: 10,
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: {width: -5, height: 5},
    textShadowRadius: 10,
  },
  rowItem: {
    height: 60,
    flexDirection: 'row',
    //backgroundColor:COLOR.YELLOW,
    padding: 10,
    alignItems: 'center',
  },
  iconWrapper: {
    backgroundColor: COLOR.LIGHT_BLUE,
    width: 50,
    height: 50,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowItemTextWrapper: {
    justifyContent: 'center',
    marginTop: 15,
    marginLeft: 20,
  },
  rowItemTitleTxt: {
    fontSize: 18,
    color: COLOR.WHITE,
  },
  rowItemSubTxt: {
    fontSize: 13,
    color: COLOR.LIGHT_GREY,
  },
  detail: {
    paddingHorizontal: 10,
    //backgroundColor:COLOR.BLUE,
    marginBottom: 60,
    height: 100,
  },
  aboutTxt: {
    fontSize: 16,
    color: COLOR.WHITE,
    marginBottom: 5,
    marginHorizontal: 10,
  },
  aboutContentTxt: {
    fontSize: 14,
    color: COLOR.WHITE,
  },
  titleWrapper: {
    marginTop: 80,
    paddingHorizontal: 20,
  },
  commandBtn: {
    width: 250,
    height: 50,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 10,
  },
  workoutList: {
    paddingHorizontal: 5,
    marginBottom: 20,
  },
});

export default ChallengeDetailScreen;
