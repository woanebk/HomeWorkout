import React, {useState, useEffect} from 'react';
import {Image, Text, StyleSheet, View, StatusBar} from 'react-native';
import {Icon} from 'react-native-elements';
import {BackgroundImage} from 'react-native-elements/dist/config';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import HomeSection from '../components/HomeSection';
import WorkoutItem from '../components/WorkoutItem';
import {COLOR, SCREEN_WIDTH, WORKOUT_TAG_COLLECTION} from '../constant';
import ProgramItem from '../components/ProgramItem';
import HomeCategoryItem from '../components/HomeCategoryItem';
import CommandButton from '../components/CommandButton';
import {
  getListAllChallenge,
  getListAllWorkout,
  Test,
  getUserInfo,
  getListAllVideo,
} from '../utilities/FirebaseDatabase';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import {
  convertObjectToArrayWithoutKey,
  filterListWorkoutByUserLevel,
  shuffle,
} from '../utilities/Utilities';

const HOME_BANNER_HEIGHT = 300;
function HomeScreen({navigation}) {
  const DATA = [
    {
      id: undefined,
      imgURL: undefined,
    },
  ];
  const [suggestedWorkouts, setSuggestedWorkouts] = useState(['1', '2', '3']);
  const [workoutOfTheDay, setWorkOutOfTheDay] = useState({});
  const [suggestedChallenges, setSuggestedChallenges] = useState([
    '1',
    '2',
    '3',
  ]);
  const [suggestedVideos, setSuggestedVideos] = useState(['1', '2', '3']);
  const [allChallenges, setAllChallenges] = useState(DATA);
  const [user, setUser] = useState({abc: 'abc'});

  //#region  message
  const [notification, setNotification] = useState({
    title: undefined,
    body: undefined,
    image: undefined,
  });
  const getToken = async () => {
    const token = await messaging().getToken();
    console.log('.........................: ', token);
  };

  useEffect(() => {
    // const navigation = useNavigation();

    getToken();
    messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));

      PushNotification.configure({
        onNotification: function (notification) {
          console.log('LOCAL NOTIFICATION ==>', notification);
          navigation.navigate('ChallengeDetail', {key: remoteMessage.data.key});
        },
        popInitialNotification: true,
        requestPermissions: true,
      });
      PushNotification.localNotification({
        message: remoteMessage.notification.body,
        title: remoteMessage.notification.title,
        bigPictureUrl: remoteMessage.notification.android.imageUrl,
        smallIcon: remoteMessage.notification.android.imageUrl,
        // chanelId: remoteMessage.messageId,
        priority: 'high',
      });
      setNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        image: remoteMessage.notification.android.imageUrl,
      });
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('onNotificationOpenedApp: ', JSON.stringify(remoteMessage));
      navigation.navigate('ChallengeDetail', {key: remoteMessage.data.key});
      setNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        image: remoteMessage.notification.android.imageUrl,
      });
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            JSON.stringify(remoteMessage),
          );

          setNotification({
            title: remoteMessage.notification.title,
            body: remoteMessage.notification.body,
            image: remoteMessage.notification.android.imageUrl,
          });
        }
      });
  }, []);
  //#endregion

  useEffect(() => {
    getSuggestedWorkout(5);
    getSuggestedChallenges(5);
    getSuggestedVideos(5);
    const unsubscribe = navigation.addListener('focus', () => {
      initUser();
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    getWorkoutOfTheDay();
  }, [user?.level]);

  const initUser = async () => {
    var res = await getUserInfo();
    setUser(res.val());
    if (
      !res.val()?.weight ||
      !res.val()?.height ||
      !res.val()?.level ||
      !res.val()?.name
    )
      navigation.navigate('Survey', {isUpdateSurveyInfoOnly: true});
  };

  const getSuggestedWorkout = async n => {
    try {
      const res = await getListAllWorkout();
      if (!res) throw 'CANNOT GET LIST WORKOUTS';
      const randomList = shuffle(convertObjectToArrayWithoutKey(res.val()));
      if (randomList?.length > n) {
        setSuggestedWorkouts(randomList?.slice(0, n));
      } else setSuggestedWorkouts(randomList);
    } catch (e) {
      console.log(e);
    }
  };

  const getWorkoutOfTheDay = async () => {
    try {
      var res = await getUserInfo();
      const userLevel = res?.val()?.level;
      const workoutsRes = await getListAllWorkout();
      if (!workoutsRes) throw 'CANNOT GET LIST WORKOUTS';
      if (!userLevel)
        setWorkOutOfTheDay(
          convertObjectToArrayWithoutKey(workoutsRes.val())[0],
        );
      else {
        const listFiltered = filterListWorkoutByUserLevel(
          shuffle(convertObjectToArrayWithoutKey(workoutsRes.val())),
          userLevel,
        );
        setWorkOutOfTheDay(listFiltered[0] || workoutsRes.val()[0]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getSuggestedChallenges = async n => {
    try {
      const res = await getListAllChallenge();
      if (!res) throw 'CANNOT GET LIST CHALLENGE';
      setAllChallenges(convertObjectToArrayWithoutKey(res.val()));
      const randomList = shuffle(convertObjectToArrayWithoutKey(res.val()));
      if (randomList?.length > n) {
        setSuggestedChallenges(randomList?.slice(0, n));
      } else setSuggestedChallenges(randomList);
    } catch (e) {
      console.log(e);
    }
  };

  const getSuggestedVideos = async n => {
    try {
      const res = await getListAllVideo();
      if (!res) throw 'CANNOT GET LIST VIDEO';
      const randomList = shuffle(convertObjectToArrayWithoutKey(res.val()));
      if (randomList?.length > n) {
        setSuggestedVideos(randomList?.slice(0, n));
      } else setSuggestedVideos(randomList);
    } catch (e) {
      console.log(e);
    }
  };

  const renderBanner = () => (
    <BackgroundImage
      style={styles.banner}
      source={{
        uri:
          workoutOfTheDay?.image ||
          'https://www.cnet.com/a/img/mSdKK71X29nFhsLSencu7IwYlhQ=/1200x675/2019/11/12/e66cc0f3-c6b8-4f6e-9561-e23e08413ce1/gettyimages-1002863304.jpg',
      }}
      resizeMode="cover">
      <View style={styles.todayWorkout}>
        <Text style={styles.todayWorkoutTxt}>B??i T???p C???a Ng??y</Text>
      </View>

      <LinearGradient
        style={styles.bannerLinearGradient}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 0.9}}
        colors={[COLOR.TRANSPARENT, COLOR.MATTE_BLACK]}></LinearGradient>

      <View style={styles.bannerLeft}>
        <Text style={styles.bannerTxt}>{workoutOfTheDay?.name}</Text>
        <View style={styles.bannerBtnWrapper}>
          <TouchableOpacity
            style={styles.bannerBtn}
            onPress={() =>
              navigation.navigate('WorkoutInfo', {
                workoutId: workoutOfTheDay?.id,
              })
            }>
            <Icon
              name="dumbbell"
              type="font-awesome-5"
              size={13}
              color={COLOR.WHITE}
            />
            <Text style={styles.bannerBtnTxt}>T???p Ngay</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bannerRight}>
        <View style={styles.bannerRightInsider}>
          <Text style={styles.bannerRightTxt}>
            {workoutOfTheDay?.rounds?.length}
          </Text>
          <Text style={styles.bannerRightSmallTxt}>S??? round</Text>
          <Text style={styles.bannerRightTxt}>
            {workoutOfTheDay?.estimate_time}m
          </Text>
          <Text style={styles.bannerRightSmallTxt}>Th???i gian</Text>
          <Text style={[styles.bannerRightTxt, {fontSize: 15}]}>
            {workoutOfTheDay?.level}
          </Text>
          <Text style={styles.bannerRightSmallTxt}>Level</Text>
        </View>
      </View>
    </BackgroundImage>
  );

  const renderUserInfo = () => (
    <View style={styles.userStatus}>
      <View style={styles.userTagWrapper}>
        <View style={[styles.userTag, {borderColor: COLOR.WHITE}]}>
          <Icon
            name="account"
            type="material-community"
            size={14}
            color={COLOR.WHITE}
          />
          <Text style={[styles.userTagTxt, {color: COLOR.WHITE}]}>
            {user?.level || 'Ng?????i m???i t???p'}
          </Text>
        </View>
        <View style={[styles.userTag, {borderColor: COLOR.WHITE}]}>
          <Icon
            name="account"
            type="material-community"
            size={14}
            color={COLOR.WHITE}
          />
          <Text style={[styles.userTagTxt, {color: COLOR.WHITE}]}>T??ng c??</Text>
        </View>
      </View>

      <View style={{flexDirection: 'row', paddingVertical: 5}}>
        <View style={{flex: 5}}>
          <Text style={styles.numberTxt}>
            {user?.name ? user?.name : 'Ng?????i d??ng m???i'}
          </Text>
          <Text style={styles.silverTxt}>
            Chi???u Cao:{' '}
            <Text style={styles.numberTxt}>
              {user?.height ? user?.height : '---'}cm
            </Text>{' '}
            - C??n n???ng:{' '}
            <Text style={styles.numberTxt}>
              {user?.weight ? user?.weight : '---'} kg
            </Text>
          </Text>
        </View>
        <View style={{flex: 1, alignItems: 'center', marginTop: -20}}>
          <Text
            style={{fontWeight: 'bold', fontSize: 20, color: COLOR.DARK_BROWN}}>
            BMI
          </Text>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: COLOR.WHITE}}>
            {user?.weight && user?.height
              ? Math.round(
                  (user?.weight / user?.height / user?.height) * 1000000,
                ) / 100
              : '---'}{' '}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.userBtn}
        onPress={() => navigation.navigate('Profile')}>
        <Icon
          name="chart-line"
          type="material-community"
          size={20}
          color={COLOR.WHITE}
        />
        <Text style={[styles.userBtnTxt, {marginLeft: 10}]}>
          C???p nh???t ch??? s??? ngay
        </Text> 
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={{flex: 1, backgroundColor: COLOR.MATTE_BLACK}}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={'transparent'}
        translucent></StatusBar>
      {renderBanner()}
      {renderUserInfo()}
      <HomeSection
        title="Tham gia th??? th??ch"
        onPress={() => {
          navigation.navigate('AllChallenge', {
            type: 'All',
            challenges: allChallenges,
          });
        }}
      />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalList}
        data={suggestedChallenges}
        renderItem={({item, index}) => (
          <View style={{paddingRight: 15}} key={index}>
            <ProgramItem
              style={{height: 200, width: 160}}
              title={item.title}
              image={{
                uri: item.imgURL,
              }}
              onPress={() => {
                navigation.navigate('ChallengeDetail', {key: item?.id});
              }}
            />
          </View>
        )}
      />
      <HomeSection
        title="Danh s??ch b??i t???p"
        onPress={() => navigation.navigate('AllWorkout')}
      />
      <FlatList
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalList}
        data={suggestedWorkouts}
        renderItem={({item}) => (
          <View style={{width: SCREEN_WIDTH, paddingRight: 30}}>
            <WorkoutItem
              onPress={() =>
                navigation.navigate('WorkoutInfo', {workoutId: item?.id})
              }
              image={{
                uri: item?.image,
              }}
              workout={item}
            />
          </View>
        )}
      />
      <HomeSection
        title="Video ki???n th???c"
        onPress={() => {
          navigation.navigate('AllVideo');
        }}
      />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalList}
        data={suggestedVideos}
        renderItem={({item, index}) => (
          <View style={{paddingRight: 15}} key={index}>
            <ProgramItem
              style={{height: 200, width: 160}}
              title={item?.name}
              image={{
                uri: item?.image,
              }}
              onPress={() =>
                navigation.navigate('WatchVideo', {videoData: item})
              }
              icon="play"
              iconBackgroundColor={COLOR.RED}
            />
          </View>
        )}
      />
      <HomeSection
        title="L???a ch???n c??ch t???p c???a ri??ng b???n"
        hideButton
        onPress={() => navigation.navigate('Category')}
      />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalList}
        data={WORKOUT_TAG_COLLECTION}
        renderItem={({item, index}) => (
          <View style={{paddingRight: 15}} key={index}>
            <HomeCategoryItem
              onPress={() =>
                navigation.navigate('AllWorkout', {collectionData: item})
              }
              style={{height: 110, width: 250}}
              title={item?.tag}
              subTitle={item?.description}
              image={{
                uri:
                  item?.image ||
                  'https://ggstorage.oxii.vn/images/oxii-2021-3-2/728/tong-hop-22-bai-tap-workout-khong-ta-tai-nha-xin-nhat-2021-phan-1-1.jpg',
              }}
            />
          </View>
        )}
      />
      <View style={styles.libraryBtnWrapper}>
        <CommandButton
          icon="tag"
          title="??i ?????n th?? vi???n k??? thu???t"
          backgroundColor={COLOR.GOLD}
          onPress={() => {
            navigation.navigate('ExerciseLibrary');
          }}
        />
      </View>
      {/* <TouchableOpacity style={{height:50, backgroundColor:'#123123'}} onPress={()=>navigation.navigate('WorkoutInfo')}/> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  banner: {
    height: HOME_BANNER_HEIGHT,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bannerLinearGradient: {
    position: 'absolute',
    height: HOME_BANNER_HEIGHT,
    width: '100%',
    bottom: 0,
  },
  bannerLeft: {
    paddingLeft: 20,
    paddingBottom: 20,
    flex: 1,
  },
  bannerRight: {
    backgroundColor: '#18151090',
    width: 70,
    height: HOME_BANNER_HEIGHT * 0.6,
    borderRadius: 15,
    marginHorizontal: 10,
    marginBottom: 20,
    alignItems: 'center',
    paddingTop: 10,
    overflow: 'hidden',
    opacity: 1,
  },
  bannerRightInsider: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    paddingVertical: 0,
  },
  bannerTxt: {
    color: COLOR.WHITE,
    fontSize: 26,
    fontWeight: 'bold',
    width: '90%',
    marginBottom: 15,
  },
  bannerRightTxt: {
    color: COLOR.WHITE,
    fontSize: 20,
  },
  bannerRightSmallTxt: {
    fontSize: 13,
    color: COLOR.GREY,
    marginBottom: 10,
  },
  bannerBtn: {
    backgroundColor: COLOR.RED,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 180,
    borderRadius: 15,
  },
  bannerBtnTxt: {
    color: COLOR.WHITE,
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  todayWorkout: {
    backgroundColor: COLOR.GOLD,
    width: 170,
    height: 25,
    position: 'absolute',
    top: 50,
    right: 0,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  todayWorkoutTxt: {
    color: COLOR.MATTE_BLACK,
    fontSize: 17,
    fontWeight: 'bold',
  },
  userStatus: {
    width: '100%',
    alignSelf: 'center',
    paddingTop: 5,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  horizontalList: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  userBtn: {
    width: '100%',
    height: 40,
    backgroundColor: COLOR.LIGHT_BROWN,
    borderRadius: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  userBtnTxt: {
    color: COLOR.WHITE,
    fontWeight: 'bold',
    fontSize: 16,
  },
  numberTxt: {
    color: COLOR.WHITE,
    fontSize: 15,
  },
  silverTxt: {
    fontSize: 13,
    color: '#aaa9ad',
  },
  userTag: {
    height: 20,
    borderWidth: 1,
    borderRadius: 7,
    alignItems: 'center',
    paddingHorizontal: 5,
    flexDirection: 'row',
    marginRight: 10,
    justifyContent: 'space-between',
  },
  userTagWrapper: {
    flexDirection: 'row',
  },
  userTagTxt: {
    fontSize: 11,
    marginLeft: 3,
  },
  libraryBtnWrapper: {
    height: 50,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
