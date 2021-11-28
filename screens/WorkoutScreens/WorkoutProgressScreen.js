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
import WorkoutItem from '../../components/WorkoutItem';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';
import RoundButton from '../../components/RoundButton';
import TextTicker from 'react-native-text-ticker';
import WorkoutStatus from '../../components/WorkoutStatus';
import CommandButton from '../../components/CommandButton';
import ProgressingListExcerciseItem from '../../components/ProgressingListExcerciseItem';
import Timer from '../../components/Timer';
import ModalIconDone from '../../components/ModalIconDone';

const STOP_WATCH_HEIGHT = 100;

function WorkoutProgressScreen(props, route) {
  const [currentExcersise, setCurrentExcersise] = useState({});
  const [time, setTime] = useState(5);
  const [isCounting, setIsCounting] = useState(true);
  const [workout, setWorkout] = useState(['1', '2', '3']);
  const [isRest, setIsRest] = useState(false);
  const [showListAll, setShowListAll] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mainTimerRunning, setMainTimerRunning] = useState(true);

  const excersiseStatusRef = useRef();
  const currentExcersiseTimerRef = useRef();
  const doneIconRef = useRef();
  const flatListRef = useRef();

  const scrollX = useRef(new Animated.Value(0)).current;

  const dummyDATA = [
    {
      name: 'Đẩy vai qua đầu',
      img: 'https://cdn.shopify.com/s/files/1/0866/7664/articles/image2_f2c3ca07-e2b8-402e-b67b-8824e6ce1a4d_2048x.jpg?v=1607671623',
      total: 5,
      restTime: 10,
    },
    {
      name: 'Cơ Ngực',
      img: 'https://onnitacademy.imgix.net/wp-content/uploads/2020/06/sizzlchestBIG-1333x1000.jpg',
      total: 5,
      restTime: 0,
    },
    {
      name: 'Tay Trước',
      img: 'https://manofmany.com/wp-content/uploads/2020/06/best-bicep-exercises.jpg',
      total: 5,
      restTime: 30,
    },
    {
      name: 'Tay Sau',
      img: 'https://s35247.pcdn.co/wp-content/uploads/2019/07/tw5.jpg.optimal.jpg',
      total: 5,
      restTime: 40,
    },
    {
      name: 'Cơ Chân',
      img: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/bring-it-all-the-way-up-here-royalty-free-image-1625750638.jpg?crop=0.601xw:0.946xh;0.397xw,0.0103xh&resize=640:*',
      total: 5,
      restTime: 50,
    },
    {
      name: 'Cơ Lưng Xô',
      img: 'https://www.bodybuilding.com/images/2017/december/your-blueprint-for-building-a-bigger-back-tall-v2-MUSCLETECH.jpg',
      total: 5,
      restTime: 60,
    },
    {
      name: 'Cơ Bụng',
      img: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/bodybuilders-abdominal-muscles-royalty-free-image-1608761464.?crop=0.668xw:1.00xh;0.332xw,0&resize=640:*',
      total: 5,
      restTime: 30,
    },
  ];

  useEffect(() => {}, []);

  useEffect(() => {
    setIsRest(false);
    setCurrentExcersise(dummyDATA[currentIndex]);
    currentExcersiseTimerRef?.current?.reset();
  }, [currentIndex]);

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
    outputRange: [0.9, 1, 1.1],
  });
  
  const startNextExcercise = () => {
    let nextIndex = currentIndex + 1
    if(nextIndex < dummyDATA?.length) {
      flatListRef?.current?.scrollToIndex({
        animated: true,
        index: nextIndex,
      })
      excersiseStatusRef?.current?.scrollBack()
      setCurrentIndex(nextIndex)
      setCurrentExcersise(dummyDATA[nextIndex])
    }
    else alert('stop')
  }

  const onFinishPress = () => {
    doneIconRef?.current?.start();
  }

  const CountClock = item => (
    <CountdownCircleTimer
      isPlaying={isCounting}
      size={120}
      strokeWidth={5}
      strokeLinecap="square"
      duration={item?.restTime || 0}
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
          style={{color: animatedColor, fontSize: 80, fontWeight: 'bold'}}>
          {remainingTime}
        </Animated.Text>
      )}
    </CountdownCircleTimer>
  );

  const renderCurrentExcercise = () => {
    return (
      <>
        {isRest ? (
          <View style={{marginTop: 20}}>{CountClock()}</View>
        ) : (
          <View style={{marginTop: 20}}>
            <Video
              style={styles.video}
              repeat
              source={require('../../assets/5svideo.mp4')}
              onLoad={() => currentExcersiseTimerRef?.current?.reset()}
            />
            <Timer
              ref={currentExcersiseTimerRef}
              style={{position: 'absolute', right: 30, top: 10}}
              warningTime={currentExcersise?.restTime}
            />
          </View>
        )}
        <View style={styles.nameWrapper}>
          <Text style={styles.nameTxt}>{currentExcersise?.name}</Text>
          <Text style={styles.repTxt}>{currentExcersise?.total} Reps</Text>
        </View>
      </>
    );
  };

  const renderListAllExcercise = () => {
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
            <Text style={modalStyles.title}>Quá trình tập luyện</Text>
            {dummyDATA?.map((item, index) => {
              const isSelected = index === currentIndex;
              const isDone = true;
              return (
                <ProgressingListExcerciseItem
                  selected={isSelected}
                  isDone={isDone}
                  item={item}
                />
              );
            })}
          </ScrollView>
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
            data={dummyDATA}
            renderItem={({item, index}) => {
              return (
                <View style={{width: SCREEN_WIDTH}} key={index}>
                  {/* {isRest ? CountClock() : renderCurrentExcercise(item)} */}
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
        data={dummyDATA}
      />
      <RoundButton
        style={styles.seeAllBtnWrapper}
        icon="tag"
        onPress={() => setShowListAll(true)}
      />
      <CommandButton
        title="Hoàn thành"
        icon="tag"
        style={styles.commandBtn}
        onPress={onFinishPress}
      />
      <ModalIconDone ref={doneIconRef} timeOut={1500} onHide={startNextExcercise}/>
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
    backgroundColor:COLOR.MATTE_BLACK
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
});

const modalStyles = StyleSheet.create({
  title: {
    color: COLOR.WHITE,
    fontSize: 23,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 30,
  },
});

export default WorkoutProgressScreen;
