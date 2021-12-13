import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Text,
  ScrollView,
  StatusBar,
  Animated,
  FlatList,
  Modal,
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
import TextTicker from 'react-native-text-ticker';
import WorkoutStatus from '../../components/WorkoutStatus';
import CommandButton from '../../components/CommandButton';
import ProgressingListExcerciseItem from '../../components/ProgressingListExcerciseItem';
import Timer from '../../components/Timer';
import ModalIconDone from '../../components/ModalIconDone';
import {cloneArrayOrObject} from '../../utilities/Utilities';
import {IconButton} from 'react-native-paper';
import WorkoutProgressBar from '../../components/WorkoutProgressBar';
import CustomModal from '../../components/CustomModal';
import ProgressCircle from 'react-native-progress-circle';

const STOP_WATCH_HEIGHT = 100;

function WorkoutProgressScreen({route, navigation}, props) {
  const {workoutData} = route.params;

  const [currentExcersise, setCurrentExcersise] = useState({});
  const [isCounting, setIsCounting] = useState(true);
  const [listExcercise, setListExcercise] = useState([]);
  const [isRest, setIsRest] = useState(false);
  const [showListAll, setShowListAll] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mainTimerRunning, setMainTimerRunning] = useState(true);
  const [showModalExit, setShowModalExit] = useState(false);
  const [showModalConfirmFinish, setshowModalConfirmFinish] = useState(false);

  const excersiseStatusRef = useRef();
  const currentExcersiseTimerRef = useRef();
  const doneIconRef = useRef();
  const flatListRef = useRef();

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
    generateListExcercise();
  }, [workoutData]);

  useEffect(() => {
    setIsRest(false);
    setCurrentExcersise(listExcercise[currentIndex]);
    currentExcersiseTimerRef?.current?.reset();
  }, [currentIndex, listExcercise]);

  const generateListExcercise = () => {
    let arr = [];
    workoutData?.rounds?.map(round => {
      for (let i = 0; i < round?.set; i++) {
        arr = arr.concat(round?.excercises);
      }
    });
    console.log('DATA', arr);
    const cloneArr = cloneArrayOrObject(arr); // tranh loi isDone sau khi back ve
    setListExcercise([...cloneArr]);
  };

  const onHideDoneIcon = () => {
    if (!isRest) {
      //Ghi nhan du lieu:
      listExcercise[currentIndex].doneTime =
        currentExcersiseTimerRef?.current?.currentTime;
      listExcercise[currentIndex].isDone = true;
      // setIsRest phai duoc dat sau ghi nhan du lieu
      setIsRest(true);
      setIsCounting(true);
    } else {
      startNextExcercise();
    }
  };
  const startNextExcercise = () => {
    let nextIndex = currentIndex + 1;
    if (nextIndex < listExcercise?.length) {
      flatListRef?.current?.scrollToIndex({
        animated: true,
        index: nextIndex,
      });
      excersiseStatusRef?.current?.scrollBack();
      setCurrentIndex(nextIndex);
      setCurrentExcersise(listExcercise[nextIndex]);
    } else handleFinishWorkout();
  };

  const handleFinishWorkout = () => {
    if (
      listExcercise?.some(item => {
        return !item?.isDone;
      })
    ) {
      setshowModalConfirmFinish(true)
    } else {
      alert('Done');
    }
  };

  const onFinishWorkout = () => {
   //Luu du lieu
   navigation.navigate('Home')
  };

  const goToExcercise = index => {
    flatListRef?.current?.scrollToIndex({
      animated: true,
      index: index,
    });
    excersiseStatusRef?.current?.scrollBack();
    setCurrentIndex(index);
    setCurrentExcersise(listExcercise[index]);
  };

  const calculateWorkoutPercentage = () => {
    let listDone = listExcercise?.filter(item => {
      return item?.isDone === true;
    });
    console.log(listDone?.length);
    console.log(listExcercise?.length);
    return (listDone?.length / listExcercise?.length) * 100;
  };

  const onDonePress = () => {
    doneIconRef?.current?.start();
    //Xu ly su kien sau khi icon bien mat o function onHideDoneIcon
  };

  const CountClock = item => (
    <CountdownCircleTimer
      isPlaying={isCounting}
      size={120}
      strokeWidth={5}
      strokeLinecap="square"
      duration={item?.rest || 10}
      trailColor={isCounting ? COLOR.WHITE : COLOR.RED}
      onComplete={() => {
        // do your stuff here
        setIsCounting(false);
        //return [true, 1500] // repeat animation in 1.5 seconds
      }}
      colors={[
        [COLOR.KELLY_GREEN, 0.4],
        [COLOR.YELLOW, 0.4],
        [COLOR.RED, 0.2],
      ]}>
      {({remainingTime, elapsedTime, animatedColor}) => (
        <Animated.Text
          adjustsFontSizeToFit
          style={{color: animatedColor, fontSize: 60, fontWeight: 'bold'}}>
          {remainingTime}
        </Animated.Text>
      )}
    </CountdownCircleTimer>
  );

  const renderCurrentExcercise = () => {
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
              onLoad={() => currentExcersiseTimerRef?.current?.reset()}
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

  const renderListAllExcercise = () => {
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
        <View style={styles.listAllExcercise}>
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
            {listExcercise?.map((item, index) => {
              const isSelected = index === currentIndex;
              const isDone = item?.isDone;
              return (
                <ProgressingListExcerciseItem
                  onPress={() => {
                    goToExcercise(index);
                    setShowListAll(false);
                  }}
                  key={index}
                  selected={isSelected}
                  isDone={isDone}
                  item={item}
                />
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
              isMinuteAndSecondFormat
              isActive={mainTimerRunning}
              textStyle={{color: COLOR.WHITE, fontWeight: 'bold'}}
              style={styles.mainTimer}
            />
            <WorkoutProgressBar
              length={listExcercise?.length}
              currentIndex={currentIndex}
              listExcercise={listExcercise}
            />
            {renderCurrentExcercise()}
          </View>
          <Animated.FlatList
            ref={flatListRef}
            viewabilityConfig={{
              itemVisiblePercentThreshold: 99,
            }}
            initialNumToRender={1}
            horizontal
            pagingEnabled
            data={listExcercise}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    width: SCREEN_WIDTH,
                    paddingTop: 430,
                    paddingHorizontal: 40,
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
        {renderListAllExcercise()}
      </Animated.View>
      <WorkoutStatus
        ref={excersiseStatusRef}
        currentIndex={currentIndex}
        data={listExcercise}
      />
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
          onFinishWorkout();
        }}
        onCancel={() => setshowModalConfirmFinish(false)}
      />
      <IconButton
        icon="close"
        style={styles.exitBtn}
        color={COLOR.WHITE}
        size={25}
        onPress={() => setShowModalExit(true)}
      />
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
    borderRadius: 15,
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
  listAllExcercise: {
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
