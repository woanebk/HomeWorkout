import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  Animated,
} from 'react-native';
import {COLOR, SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constant';
import {Icon} from 'react-native-elements';
import WorkoutRowItem from '../../components/WorkoutRowItem';
import {getListAllWorkout} from '../../utilities/FirebaseDatabase';
import {convertObjectToArrayWithoutKey, filterListWorkoutByTag} from '../../utilities/Utilities';

const HEADER_HEIGHT = 250; // height of the image
const SCREEN_HEADER_HEIGHT = 90; // height of the header contain back button
const NOTCH_SIZE = 30;
const LIST_EXTRA_SIZE = 120;

function AllWorkoutScreen({navigation, route}) {
  const [listWorkout, setListWorkout] = useState([]);
  const {collectionData} =  route.params || {}

  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    getAllWorkoutData();
  }, []);

  const getAllWorkoutData = async () => {
    try {
      const res = await getListAllWorkout();
      if (!res) throw 'CANNOT GET LIST WORKOUTS';
      if (collectionData){
        const listFilterByTag = filterListWorkoutByTag(convertObjectToArrayWithoutKey(res.val()), collectionData?.tag)
        setListWorkout(listFilterByTag)
      }
      else setListWorkout(convertObjectToArrayWithoutKey(res.val()));
    } catch (e) {
      console.log(e);
    }
  };

  const renderHeader = () => (
    <Animated.View
      style={[
        styles.header,
        {
          transform: [
            {
              scaleY: scrollY.interpolate({
                inputRange: [0, 200, SCREEN_HEIGHT, 9999],
                outputRange: [1, 1, 20, 20],
              }),
            },
          ],
        },
      ]}>
      <Animated.Image
        blurRadius={scrollY.interpolate({
          inputRange: [0, HEADER_HEIGHT, SCREEN_HEIGHT],
          outputRange: [0, 20, 20],
        })}
        style={[
          styles.headerImg,
          {
            transform: [
              {
                scaleY: scrollY.interpolate({
                  inputRange: [0, 400, 99999],
                  outputRange: [1, 1.95, 1.95],
                }),
              },
            ],
          },
        ]}
        source={{
          uri: collectionData?.image || 'https://oreni.vn/uploads/contents/workout-la-gi-3.jpg',
        }}
        resizeMode="cover"></Animated.Image>
      <Animated.View
        style={[
          styles.headerContentWrapper,
          {
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, HEADER_HEIGHT, 99999],
                  outputRange: [0, -HEADER_HEIGHT, HEADER_HEIGHT],
                }),
              },
            ],
          },
        ]}>
        <View style={styles.headerTxtWrapper}>
          <Text style={styles.headerTxt}>Thư viện bài tập</Text>
          <Text style={styles.headerTxt}>{collectionData?.name}</Text>
          <Text style={styles.infoTxt}>Số lượng: {listWorkout?.length}</Text>
        </View>
      </Animated.View>
    </Animated.View>
  );

  const renderListHeader = () => {
    return (
      <View
        style={{
          height: 30,
          alignItems: 'center',
          paddingHorizontal: 5,
          flexDirection: 'row',
        }}>
        <Icon
          name="dumbbell"
          type="font-awesome-5"
          size={13}
          color={COLOR.WHITE}
          style={{marginRight: 10}}
        />
        <Text style={{color: COLOR.WHITE, fontSize: 12}}>
          Số lượng: {listWorkout?.length}
        </Text>
      </View>
    );
  };

  const renderItem = item => (
    <View style={styles.itemWrapper}>
      <WorkoutRowItem
        onPress={() => navigation.navigate('WorkoutInfo', {workoutId: item?.id})}
        isliked={true}
        title={item?.name}
        image={{
          uri: item?.image,
        }}
        item={item}
      />
    </View>
  );

  return (
    <View style={{flex: 1, backgroundColor: COLOR.LIGHT_MATTE_BLACK}}>
      <StatusBar backgroundColor="transparent" translucent />
      {renderHeader()}
      <Animated.FlatList
        style={[
          styles.flatlist,
          {
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, HEADER_HEIGHT, 99999],
                  outputRange: [0, -LIST_EXTRA_SIZE, 0],
                }),
              },
            ],
          },
        ]}
        data={listWorkout}
        keyExtractor={(item, index) => index}
        ListHeaderComponent={renderListHeader}
        ListFooterComponent={()=>(<View style={{height:80}}/>)}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        renderItem={({item}) => renderItem(item)}></Animated.FlatList>
      <Animated.View style={[styles.screenHeader]}>
        <Animated.Text
          numberOfLines={1}
          style={[
            styles.commandTxt,
            {
              transform: [
                {
                  translateX: scrollY.interpolate({
                    inputRange: [
                      HEADER_HEIGHT - 80,
                      HEADER_HEIGHT - 70,
                      9999999,
                    ],
                    outputRange: [50, 0, 0],
                  }),
                },
              ],
            },
          ]}>
          Thư viện bài tập
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
    justifyContent: 'center',
    paddingTop: 20,
  },
  header: {
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: COLOR.BLACK,
    // marginTop: -10000,
    // paddingTop: 10000,
  },
  headerImg: {
    height: HEADER_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: COLOR.BLACK,
  },
  headerContentWrapper: {
    position: 'absolute',
    bottom: 0,
    paddingBottom: NOTCH_SIZE + 30,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
  },
  headerTxtWrapper: {
    marginLeft: 20,
  },
  headerTxt: {
    color: COLOR.WHITE,
    fontSize: 35,
    fontWeight: '600',
  },
  infoTxt: {
    color: COLOR.WHITE,
    fontSize: 15,
    fontWeight: '400',
  },
  flatlist: {
    flex: 1,
    backgroundColor: COLOR.MATTE_BLACK,
    borderRadius: 7,
    marginTop: -NOTCH_SIZE,
    marginBottom: -LIST_EXTRA_SIZE,
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  itemWrapper: {
    paddingVertical: 5,
    marginBottom: 10,
  },
  excersiseWrapper: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
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
    fontSize: 13,
    color: COLOR.GREY,
  },
  commandTxt: {
    fontSize: 20,
    color: COLOR.WHITE,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export default AllWorkoutScreen;
