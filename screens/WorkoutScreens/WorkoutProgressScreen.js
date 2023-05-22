import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  StatusBar,
  Animated,
  Modal,
  BackHandler,
  PermissionsAndroid,
} from 'react-native';
import Video from 'react-native-video';
import {
  COLOR,
  HORIZONTAL_LIST_HEIGHT,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../constant';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import RoundButton from '../../components/RoundButton';
import WorkoutStatus from '../../components/WorkoutStatus';
import CommandButton from '../../components/CommandButton';
import ProgressingListExerciseItem from '../../components/ProgressingListExerciseItem';
import Timer from '../../components/Timer';
import ModalIconDone from '../../components/ModalIconDone';
import {
  cloneArrayOrObject,
  handleArrayToString,
} from '../../utilities/Utilities';
import {IconButton} from 'react-native-paper';
import WorkoutProgressBar from '../../components/WorkoutProgressBar';
import CustomModal from '../../components/CustomModal';
import ProgressCircle from 'react-native-progress-circle';
import {
  getUserInfo,
  submitWorkout,
  submitWorkoutInChallenge,
} from '../../utilities/FirebaseDatabase';
import Toast from 'react-native-toast-message';
import LoadingView from '../../components/LoadingView';
import Tts from 'react-native-tts';
import {useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Voice from '@react-native-voice/voice';
import LottieView from 'lottie-react-native';
import {Icon} from 'react-native-elements';
import {useDidUpdateEffect} from '../../utilities/CustomHook';

const STOP_WATCH_HEIGHT = 100;
const VOICE_BLOCK_HEIGHT = 50;

function WorkoutProgressScreen({route, navigation}, props) {
  const {workoutData, challengeId, dayIndex} = route.params || {};

  const [currentExcersise, setCurrentExcersise] = useState({});
  const [isCounting, setIsCounting] = useState(true);
  const [listExercise, setListExercise] = useState([]);
  const [isRest, setIsRest] = useState(false);
  const [showListAll, setShowListAll] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mainTimerRunning, setMainTimerRunning] = useState(true);
  const [showModalExit, setShowModalExit] = useState(false);
  const [showModalConfirmFinish, setshowModalConfirmFinish] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [speakEnable, setSpeakEnable] = useState(true);

  const excersiseStatusRef = useRef();
  const currentExcersiseTimerRef = useRef();
  const mainTimerRef = useRef();
  const doneIconRef = useRef();
  const flatListRef = useRef();

  const [results, setResults] = useState([]);
  const [partialResults, setPartialResults] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [microphoneEnable, setMicrophoneEnable] = useState(false);

  const scrollX = useRef(new Animated.Value(0)).current;
  const opacity = scrollX.interpolate({
    inputRange: [
      (currentIndex - 1) * SCREEN_WIDTH,
      currentIndex * SCREEN_WIDTH,
      (currentIndex + 1) * SCREEN_WIDTH,
    ],
    outputRange: [0, 1, 0],
  });
  const screenScaleX = scrollX.interpolate({
    inputRange: [
      (currentIndex - 1) * SCREEN_WIDTH,
      currentIndex * SCREEN_WIDTH,
      (currentIndex + 1) * SCREEN_WIDTH,
    ],
    outputRange: [0.9, 1, 0.9],
  });

  useEffect(() => {
    getLocalSoundSettingData();
    generateListExercise();
  }, [workoutData]);

  useEffect(() => {
    setIsRest(false);
    setCurrentExcersise(listExercise[currentIndex]);
    currentExcersiseTimerRef?.current?.reset();
    Tts.stop();
  }, [currentIndex, listExercise]);

  useFocusEffect(
    useCallback(() => {
      const onBackPressDisable = () => {
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPressDisable);

      return () =>
        BackHandler.removeEventListener(
          'hardwareBackPress',
          onBackPressDisable,
        );
    }, []),
  );

  useEffect(() => {
    //requestMicroPermission();
    //Setting callbacks for the process status
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    //checkVoice();
    return () => {
      //destroy the process after switching the screen
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  useDidUpdateEffect(() => {
    if (!microphoneEnable) {
      stopRecognizing();
    } else {
      startRecognizing();
    }
  }, [microphoneEnable]);

  useEffect(() => {
    handleVoice(results);
  }, [results]);

  const requestMicroPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Yêu cầu truy cập micro',
          message:
            'Ứng dụng cần sử dụng micro để có thể sử dụng chức năng ra lệnh bằng giọng nói ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the micro');
      } else {
        console.log('Micro permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const checkVoice = async () => {
    const res = await Voice.isAvailable();
    console.log(res);
  };

  const onSpeechStart = e => {
    //Invoked when .start() is called without error
    console.log('onSpeechStart: ', e);
    setIsListening(true);
  };

  const onSpeechEnd = async e => {
    //Invoked when SpeechRecognizer stops recognition
    console.log('onSpeechEnd: ', e);
    setIsListening(false);
    //infinite listening:
    const res = await Voice.isRecognizing();
    if (!res) await startRecognizing();
  };

  const onSpeechError = e => {
    //Invoked when an error occurs.
    console.log('onSpeechError: ', e);
    setIsListening(false);
  };

  const onSpeechResults = e => {
    //Invoked when SpeechRecognizer is finished recognizing
    console.log('onSpeechResults: ', e);
    setResults(e.value);
    //handleVoice(e.value);
  };

  const onSpeechPartialResults = e => {
    //Invoked when any results are computed
    console.log('onSpeechPartialResults: ', e);
    setPartialResults(e.value);
  };

  const startRecognizing = async () => {
    //Starts listening for speech for a specific locale
    try {
      await Voice.start('vi-VN', {
        RECOGNIZER_ENGINE: 'GOOGLE',
        EXTRA_PARTIAL_RESULTS: true,
      });
      setResults([]);
      setPartialResults([]);
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  const stopRecognizing = async () => {
    //Stops listening for speech
    try {
      await Voice.stop();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  const destroyRecognizer = async () => {
    //Destroys the current SpeechRecognizer instance
    try {
      await Voice.destroy();
      setResults([]);
      setPartialResults([]);
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  const handleVoice = voice => {
    voice?.map(item => {
      if (item?.toLowerCase() === 'hoàn thành' && !isRest) {
        onDonePress();
      }
      if (item?.toLowerCase() === 'nghỉ xong' && isRest) {
        onDonePress();
      }
    });
  };

  const getLocalSoundSettingData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('soundEnable');
      const res = jsonValue != null ? JSON.parse(jsonValue) : null;
      setSpeakEnable(res);
    } catch (e) {}
  };

  const speakWithCheckingSetting = text => {
    if (speakEnable) Tts.speak(text);
  };

  const speakCurrentExerciseData = () => {
    speakWithCheckingSetting('Động tác');
    speakWithCheckingSetting(currentExcersise?.data?.name);
    speakWithCheckingSetting(currentExcersise?.data?.description);
  };

  const onSoundButtonPress = async () => {
    if (speakEnable) {
      const jsonValue = JSON.stringify(false);
      await AsyncStorage.setItem('soundEnable', jsonValue);
      setSpeakEnable(false);
      Tts.stop();
    } else {
      const jsonValue = JSON.stringify(true);
      await AsyncStorage.setItem('soundEnable', jsonValue);
      setSpeakEnable(true);
      Tts.speak('Động tác');
      Tts.speak(currentExcersise?.data?.name);
      Tts.speak(currentExcersise?.data?.description);
    }
  };

  const generateListExercise = () => {
    let arr = [];
    workoutData?.rounds?.map(round => {
      for (let i = 0; i < round?.set; i++) {
        arr = arr.concat(round?.exercises);
      }
    });
    console.log('DATA', arr);
    const cloneArr = cloneArrayOrObject(arr); // tranh loi isDone sau khi back ve
    cloneArr?.map((item, index) => {
      item.randomKey = index;
    });
    setListExercise([...cloneArr]);
  };

  const onHideDoneIcon = () => {
    if (!isRest) {
      //Ghi nhan du lieu:
      listExercise[currentIndex].doneTime =
        currentExcersiseTimerRef?.current?.currentTime;
      listExercise[currentIndex].isDone = true;
      // setIsRest phai duoc dat sau ghi nhan du lieu
      setIsRest(true);
      setIsCounting(true);
    } else {
      startNextExercise();
    }
  };
  const startNextExercise = () => {
    let nextIndex = currentIndex + 1;
    if (nextIndex < listExercise?.length) {
      flatListRef?.current?.scrollToIndex({
        animated: true,
        index: nextIndex,
      });
      excersiseStatusRef?.current?.scrollBack();
      setCurrentIndex(nextIndex);
      setCurrentExcersise(listExercise[nextIndex]);
    } else handleFinishWorkout();
  };

  const handleFinishWorkout = () => {
    setMicrophoneEnable(false);
    if (
      listExercise?.some(item => {
        return !item?.isDone;
      })
    ) {
      setshowModalConfirmFinish(true);
    } else {
      onSubmitWorkout();
    }
  };

  const onSubmitWorkout = async () => {
    try {
      setShowListAll(false);
      setIsLoading(true);
      const res = await getUserInfo();
      if (!res.val()?.id) throw 'User Không tồn tại';
      const userId = res.val()?.id;
      if (challengeId) {
        await submitWorkoutInChallenge(
          userId,
          workoutData?.id,
          mainTimerRef?.current?.currentTime || 0,
          calculateWorkoutPercentage().toFixed(),
          workoutData,
          challengeId,
          dayIndex,
        );
      } else {
        await submitWorkout(
          userId,
          workoutData?.id,
          mainTimerRef?.current?.currentTime || 0,
          calculateWorkoutPercentage().toFixed(),
          workoutData,
        );
      }

      navigation.navigate('Home');
      Toast.show({
        type: 'success',
        text1: 'Thông báo',
        text2: 'Chúc mừng bạn đã hoàn thành bài tập 👋',
      });
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: e + '👋',
      });
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const goToExercise = index => {
    flatListRef?.current?.scrollToIndex({
      animated: true,
      index: index,
    });
    excersiseStatusRef?.current?.scrollBack();
    setCurrentIndex(index);
    setCurrentExcersise(listExercise[index]);
  };

  const calculateWorkoutPercentage = () => {
    let listDone = listExercise?.filter(item => {
      return item?.isDone === true;
    });
    return (listDone?.length / listExercise?.length) * 100;
  };

  const onDonePress = () => {
    doneIconRef?.current?.start();
    Tts.stop();
    //Xu ly su kien sau khi icon bien mat o function onHideDoneIcon
  };

  const renderVoiceBlock = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          height: VOICE_BLOCK_HEIGHT,
          position: 'absolute',
          bottom: HORIZONTAL_LIST_HEIGHT,
          alignSelf: 'center',
          paddingTop: 20,
        }}>
        {isListening && (
          <LottieView
            style={{width: 150, position: 'absolute'}}
            source={require('../../assets/lottie/microphone.json')}
            autoPlay
            loop></LottieView>
        )}
        {microphoneEnable && (
          <>
            <Text style={{color: COLOR.WHITE, textAlign: 'center'}}>
              <Icon
                name="microphone"
                type="font-awesome"
                size={12}
                color={COLOR.WHITE}
              />{' '}
              {partialResults || ''}
            </Text>
            <Text style={{color: COLOR.WHITE, textAlign: 'center'}}>
              {handleArrayToString(results) || ''}
            </Text>
          </>
        )}
      </View>
    );
  };

  const CountClock = item => {
    let speakCount = 0;
    return (
      <CountdownCircleTimer
        isPlaying={isCounting}
        size={120}
        strokeWidth={5}
        strokeLinecap="square"
        duration={item?.rest || 10}
        trailColor={isCounting ? COLOR.WHITE : COLOR.RED}
        onComplete={totalElapsedTime => {
          // do your stuff here
          setIsCounting(false);
          speakWithCheckingSetting('Đã hết thời gian nghỉ');
          //return [true, 1500] // repeat animation in 1.5 seconds
        }}
        renderAriaTime={({remainingTime}) => {
          if (remainingTime === 10 && speakCount === 0) {
            speakWithCheckingSetting('Còn 10 giây nghỉ');
            speakCount += 1;
          }
          return <></>;
        }}
        colors={[
          [COLOR.KELLY_GREEN, 0.4],
          [COLOR.YELLOW, 0.4],
          [COLOR.RED, 0.2],
        ]}>
        {({remainingTime, elapsedTime, animatedColor}) => {
          return (
            <Animated.Text
              adjustsFontSizeToFit
              style={{color: animatedColor, fontSize: 60, fontWeight: 'bold'}}>
              {remainingTime}
            </Animated.Text>
          );
        }}
      </CountdownCircleTimer>
    );
  };

  const renderCurrentExercise = () => {
    return (
      <>
        {isRest ? (
          <View
            style={{
              marginTop: 20,
              height: 200,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {CountClock(currentExcersise)}
          </View>
        ) : (
          <View style={{marginTop: 20}}>
            <Video
              resizeMode="cover"
              style={styles.video}
              repeat
              source={{uri: currentExcersise?.data?.video}}
              onLoad={() => {
                currentExcersiseTimerRef?.current?.reset();
                if (
                  currentExcersise?.data?.description &&
                  !currentExcersise?.isDone
                ) {
                  speakCurrentExerciseData();
                }
              }}
            />
            <Timer
              ref={currentExcersiseTimerRef}
              style={{position: 'absolute', right: 30, top: 10}}
              warningTime={currentExcersise?.rest}
            />
          </View>
        )}
        <View style={styles.nameWrapper}>
          <Text style={styles.nameTxt}>{currentExcersise?.data?.name}</Text>
          {currentExcersise?.time ? (
            <Text style={styles.repTxt}>{currentExcersise?.time} Giây</Text>
          ) : (
            <Text style={styles.repTxt}>{currentExcersise?.reps} Reps</Text>
          )}
        </View>
      </>
    );
  };

  const renderListAllExercise = () => {
    let percentage = calculateWorkoutPercentage().toFixed();
    return (
      <Modal
        animationType="slide"
        transparent
        statusBarTranslucent
        visible={showListAll}
        onRequestClose={() => {
          setShowListAll(false);
        }}>
        <View style={styles.listAllExercise}>
          <ScrollView style={{flex: 1, backgroundColor: COLOR.GREY}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 20,
                marginBottom: 10,
              }}>
              <ProgressCircle
                percent={percentage}
                radius={18}
                borderWidth={4}
                color="#fff"
                shadowColor="#999"
                bgColor={COLOR.GREY}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: COLOR.WHITE,
                  }}>
                  {percentage + '%'}
                </Text>
              </ProgressCircle>
              <Text style={modalStyles.title}>Quá trình tập luyện</Text>
            </View>
            {listExercise?.map((item, index) => {
              const isSelected = index === currentIndex;
              const isDone = item?.isDone;
              return (
                <View key={index}>
                  <ProgressingListExerciseItem
                    onPress={() => {
                      goToExercise(index);
                      setShowListAll(false);
                    }}
                    key={index}
                    selected={isSelected}
                    isDone={isDone}
                    item={item}
                  />
                </View>
              );
            })}
          </ScrollView>
          <View style={styles.finishAllWrapper}>
            <CommandButton
              title={'Kết thúc bài tập'}
              hasRightIcon
              backgroundColor={COLOR.GOLD}
              style={{width: '80%', height: 50}}
              onPress={handleFinishWorkout}
            />
          </View>
          <RoundButton
            icon="close"
            buttonWidth={30}
            buttonHeight={30}
            size={10}
            style={styles.listCloseBtnWrapper}
            onPress={() => setShowListAll(false)}
          />
        </View>
      </Modal>
    );
  };

  const onScrollThroughtPage = e => {
    // action when a page is focus (https://newbedev.com/react-native-get-current-page-in-flatlist-when-using-pagingenabled)
    let contentOffset = e.nativeEvent.contentOffset;
    let viewSize = e.nativeEvent.layoutMeasurement;

    // Divide the horizontal offset by the width of the view to see which page is visible
    let pageNum = Math.floor(contentOffset.x / (viewSize.width - 10)); // need -10 to fix last item cannot view
    // Action:
    if (pageNum != currentIndex) {
      setCurrentIndex(pageNum);
      excersiseStatusRef.current.scrollBack();
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: COLOR.MATTE_BLACK}}>
      <Animated.View
        style={[
          styles.container,
          {opacity: opacity, scaleX: screenScaleX, scaleY: screenScaleX},
        ]}>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"></StatusBar>

        <View style={{alignItems: 'center', flex: 1}}>
          <View style={{position: 'absolute', width: SCREEN_WIDTH}}>
            <Timer
              ref={mainTimerRef}
              isMinuteAndSecondFormat
              isActive={mainTimerRunning}
              textStyle={{color: COLOR.WHITE, fontWeight: 'bold'}}
              style={styles.mainTimer}
            />
            <WorkoutProgressBar
              length={listExercise?.length}
              currentIndex={currentIndex}
              listExercise={listExercise}
            />
            {renderCurrentExercise()}
          </View>
          <Animated.FlatList
            ref={flatListRef}
            viewabilityConfig={{
              itemVisiblePercentThreshold: 99,
            }}
            initialNumToRender={1}
            horizontal
            pagingEnabled
            data={listExercise}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    width: SCREEN_WIDTH,
                    paddingTop: 410,
                    paddingHorizontal: 40,
                    paddingBottom: HORIZONTAL_LIST_HEIGHT + 50,
                  }}
                  key={index}>
                  <ScrollView>
                    <Text style={{color: COLOR.WHITE, textAlign: 'center'}}>
                      {item?.data?.description}
                    </Text>
                  </ScrollView>
                </View>
              );
            }}
            onMomentumScrollEnd={onScrollThroughtPage}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: true},
            )}
          />
        </View>
        {renderListAllExercise()}
      </Animated.View>
      <WorkoutStatus
        ref={excersiseStatusRef}
        currentIndex={currentIndex}
        data={listExercise}
      />
      {renderVoiceBlock()}
      <RoundButton
        style={styles.seeAllBtnWrapper}
        icon="tag"
        onPress={() => setShowListAll(true)}
      />
      {currentExcersise?.isDone && !isRest ? (
        <CommandButton
          title={'Đã hoàn thành'}
          hasRightIcon
          rightIcon="check-circle"
          rightIconSize={23}
          backgroundColor={COLOR.GREY}
          style={styles.commandBtn}
          onPress={() => setShowListAll(true)}
        />
      ) : (
        <CommandButton
          title={isRest ? 'Nghỉ Xong' : 'Hoàn thành'}
          icon="tag"
          style={styles.commandBtn}
          onPress={onDonePress}
          backgroundColor={isRest && COLOR.KELLY_GREEN}
        />
      )}
      <ModalIconDone ref={doneIconRef} timeOut={1500} onHide={onHideDoneIcon} />
      <CustomModal
        visible={showModalExit}
        title="Bạn chưa hoàn thành bài tập, bạn có chắc muốn thoát ?"
        onConfirm={() => {
          Tts.stop();
          navigation.pop();
          setShowModalExit(false);
        }}
        onCancel={() => setShowModalExit(false)}
      />
      <CustomModal
        visible={showModalConfirmFinish}
        title="Bạn chưa hoàn thành bài tập, bạn có chắc muốn kết thúc ?"
        onConfirm={() => {
          setshowModalConfirmFinish(false);
          Tts.stop();
          onSubmitWorkout();
        }}
        onCancel={() => setshowModalConfirmFinish(false)}
      />
      <IconButton
        icon="close"
        style={styles.exitBtn}
        color={COLOR.WHITE}
        size={25}
        onPress={() => {
          setShowModalExit(true);
          setMicrophoneEnable(false);
        }}
      />
      <IconButton
        icon={speakEnable ? 'volume-high' : 'volume-off'}
        style={styles.soundButton}
        color={COLOR.WHITE}
        size={25}
        onPress={async () => await onSoundButtonPress()}
      />
      {/*<IconButton*/}
      {/*  icon={microphoneEnable ? 'microphone' : 'microphone-off'}*/}
      {/*  style={styles.microBtn}*/}
      {/*  color={COLOR.WHITE}*/}
      {/*  size={25}*/}
      {/*  onPress={() => {*/}
      {/*    microphoneEnable*/}
      {/*      ? setMicrophoneEnable(false)*/}
      {/*      : setMicrophoneEnable(true);*/}
      {/*  }}*/}
      {/*/>*/}
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
  container: {
    flex: 1,
  },
  video: {
    width: '94%',
    height: 200,
    alignSelf: 'center',
    // borderRadius: 15,
    backgroundColor: COLOR.MATTE_BLACK,
  },
  nameTxt: {
    fontSize: 30,
    color: COLOR.WHITE,
    fontWeight: 'bold',
  },
  nameWrapper: {
    alignItems: 'center',
    marginTop: 10,
  },
  repTxt: {
    fontSize: 24,
    color: COLOR.GREY,
    fontWeight: 'bold',
  },
  seeAllBtnWrapper: {
    position: 'absolute',
    bottom: HORIZONTAL_LIST_HEIGHT - 40,
    left: 10,
  },
  listAllExercise: {
    backgroundColor: COLOR.GREY,
    height: '100%',
    marginTop: STOP_WATCH_HEIGHT,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    paddingTop: 20,
  },
  listCloseBtnWrapper: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  commandBtn: {
    position: 'absolute',
    bottom: 10,
    width: '90%',
    height: 50,
    alignSelf: 'center',
  },
  mainTimer: {
    alignSelf: 'center',
    marginTop: 40,
  },
  exitBtn: {
    position: 'absolute',
    top: 35,
    left: 10,
  },
  soundButton: {
    position: 'absolute',
    top: 35,
    right: 10,
  },
  microBtn: {
    position: 'absolute',
    top: 35,
    right: 50,
  },
  finishAllWrapper: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: STOP_WATCH_HEIGHT,
  },
});

const modalStyles = StyleSheet.create({
  title: {
    color: COLOR.WHITE,
    fontSize: 23,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default WorkoutProgressScreen;
