import React, {useState, useRef} from 'react';
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
import {COLOR, HORIZONTAL_LIST_HEIGHT, SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constant';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import WorkoutItem from '../../components/WorkoutItem';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';
import RoundButton from '../../components/RoundButton';
import TextTicker from 'react-native-text-ticker';
import WorkoutStatus from '../../components/WorkoutStatus';
import CommandButton from '../../components/CommandButton';

const STOP_WATCH_HEIGHT = 100;

function WorkoutProgressScreen(props, route) {
  const [excersise, setExcersise] = useState({});
  const [time, setTime] = useState(5);
  const [isCounting, setIsCounting] = useState(true);
  const [workout, setWorkout] = useState(['1', '2', '3']);
  const [isRest, setIsRest] = useState(false);
  const [showListAll, setShowListAll] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentExcerciseListRef = useRef();

  const dummyDATA = [
    {
      name: 'Đẩy vai qua đầu',
      img: 'https://cdn.shopify.com/s/files/1/0866/7664/articles/image2_f2c3ca07-e2b8-402e-b67b-8824e6ce1a4d_2048x.jpg?v=1607671623',
      total: 5,
      restTime: 30,
    },
    {
      name: 'Cơ Ngực',
      img: 'https://onnitacademy.imgix.net/wp-content/uploads/2020/06/sizzlchestBIG-1333x1000.jpg',
      total: 5,
      restTime: 30,
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
      restTime: 30,
    },
    {
      name: 'Cơ Chân',
      img: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/bring-it-all-the-way-up-here-royalty-free-image-1625750638.jpg?crop=0.601xw:0.946xh;0.397xw,0.0103xh&resize=640:*',
      total: 5,
      restTime: 30,
    },
    {
      name: 'Cơ Lưng Xô',
      img: 'https://www.bodybuilding.com/images/2017/december/your-blueprint-for-building-a-bigger-back-tall-v2-MUSCLETECH.jpg',
      total: 5,
      restTime: 30,
    },
    {
      name: 'Cơ Bụng',
      img: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/bodybuilders-abdominal-muscles-royalty-free-image-1608761464.?crop=0.668xw:1.00xh;0.332xw,0&resize=640:*',
      total: 5,
      restTime: 30,
    },
  ];

  const CountClock = () => (
    <CountdownCircleTimer
      isPlaying={isCounting}
      size={120}
      strokeWidth={5}
      strokeLinecap="square"
      duration={time}
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
        <Video
          style={styles.video}
          repeat
          source={require('../../assets/5svideo.mp4')}
        />
        <View style={styles.nameWrapper}>
          <Text style={styles.nameTxt}>Hít đất</Text>
          <Text style={styles.repTxt}>15 Reps</Text>
        </View>
      </>
    );
  };

  const renderExcerciseStatus = () => {
    return(
    <WorkoutStatus currentIndex={currentIndex} data={dummyDATA}/>
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

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"></StatusBar>
      {isRest ? CountClock() : renderCurrentExcercise()}

      <View style={{alignItems: 'center', flex: 1}}>
        <FlatList
        horizontal
        pagingEnabled
        data={dummyDATA}
        renderItem={({item})=>{
          return(
            <View style={{ width:SCREEN_WIDTH}}>
              <Text style={{color:COLOR.WHITE}}>{item.name}</Text>
            </View>
          )
        }}
        />
        {renderExcerciseStatus()}
      </View>
      <RoundButton
        style={styles.seeAllBtnWrapper}
        icon="tag"
        onPress={() => setShowListAll(true)}
      />
      <CommandButton title='Hoàn thành' icon='tag' style={styles.commandBtn}/>
      {renderListAllExcercise()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.MATTE_BLACK,
  },
  video: {
    width: '94%',
    height: 200,
    alignSelf: 'center',
    borderRadius: 15,
    marginTop: STOP_WATCH_HEIGHT,
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
  },
  listCloseBtnWrapper: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  commandBtn:{
    position:'absolute',
    bottom:10,
    width:'90%',
    height:50,
    alignSelf:'center'
  },
});

export default WorkoutProgressScreen;
