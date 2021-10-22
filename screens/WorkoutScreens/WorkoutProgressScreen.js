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
import {COLOR, SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constant';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import WorkoutItem from '../../components/WorkoutItem';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';

const HORIZONTAL_LIST_HEIGHT = 150;
const STOP_WATCH_HEIGHT = 100;

function WorkoutProgressScreen(props, route) {
  const [excersise, setExcersise] = useState({});
  const [time, setTime] = useState(5);
  const [isCounting, setIsCounting] = useState(true);
  const [workout, setWorkout] = useState(['1', '2', '3']);
  const [isRest, setIsRest] = useState(false);
  const [showListAll, setShowListAll] = useState(false);


  const dummyDATA = [
    {
      name: 'Cơ Vai',
      img: 'https://cdn.shopify.com/s/files/1/0866/7664/articles/image2_f2c3ca07-e2b8-402e-b67b-8824e6ce1a4d_2048x.jpg?v=1607671623',
      total: 5,
    },
    {
      name: 'Cơ Ngực',
      img: 'https://onnitacademy.imgix.net/wp-content/uploads/2020/06/sizzlchestBIG-1333x1000.jpg',
      total: 5,
    },
    {
      name: 'Tay Trước',
      img: 'https://manofmany.com/wp-content/uploads/2020/06/best-bicep-exercises.jpg',
      total: 5,
    },
    {
      name: 'Tay Sau',
      img: 'https://s35247.pcdn.co/wp-content/uploads/2019/07/tw5.jpg.optimal.jpg',
      total: 5,
    },
    {
      name: 'Cơ Chân',
      img: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/bring-it-all-the-way-up-here-royalty-free-image-1625750638.jpg?crop=0.601xw:0.946xh;0.397xw,0.0103xh&resize=640:*',
      total: 5,
    },
    {
      name: 'Cơ Lưng Xô',
      img: 'https://www.bodybuilding.com/images/2017/december/your-blueprint-for-building-a-bigger-back-tall-v2-MUSCLETECH.jpg',
      total: 5,
    },
    {
      name: 'Cơ Bụng',
      img: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/bodybuilders-abdominal-muscles-royalty-free-image-1608761464.?crop=0.668xw:1.00xh;0.332xw,0&resize=640:*',
      total: 5,
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

  const renderExcerciseItem = (item, index) => {
    return (
      <View
        style={{
          width: SCREEN_WIDTH,
          height: HORIZONTAL_LIST_HEIGHT,
          backgroundColor: '#000',
        }}>
        <Image style={styles.excersiseImg} source={{uri: item.img}} />
      </View>
    );
  };

  const renderExcercise = () => {
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

  const renderSeeAllButton = () => {
    return (
      <View style={styles.seeAllBtnWrapper}>
        <TouchableOpacity
          style={styles.roundBtn}
          onPress={() => setShowListAll(true)}>
          <Icon name="tags" type="font-awesome" size={13} color={COLOR.BLACK} />
        </TouchableOpacity>
      </View>
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
          <View style={styles.listCloseBtnWrapper}>
            <TouchableOpacity style={styles.smallRoundBtn}>
              <Icon name="close" type="font-awesome" size={13} color={COLOR.BLACK} onPress={()=>setShowListAll(false)} />
            </TouchableOpacity>
          </View>
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
      {isRest ? CountClock() : renderExcercise()}

      <View style={{alignItems: 'center'}}></View>
      {renderSeeAllButton()}
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
  horizontalList: {
    backgroundColor: COLOR.RED,
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
  excersiseImg: {
    width: '100%',
    height: HORIZONTAL_LIST_HEIGHT,
    position: 'absolute',
    bottom: 0,
    borderRadius: 5,
    marginLeft: 20,
  },
  seeAllBtnWrapper: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  roundBtn: {
    width: 50,
    height: 50,
    backgroundColor: COLOR.WHITE,
    borderRadius: 50,
    justifyContent: 'center',
  },
  smallRoundBtn: {
    width: 30,
    height: 30,
    backgroundColor: COLOR.WHITE,
    borderRadius: 50,
    justifyContent: 'center',
  },
  listAllExcercise: {
    backgroundColor:COLOR.GREY,
    height:'100%',
    marginTop:STOP_WATCH_HEIGHT,
    borderTopLeftRadius:5,
    borderTopRightRadius:5,
  },
  listCloseBtnWrapper:{
    position:'absolute',
    top:20,
    right:20
  },
});

export default WorkoutProgressScreen;
