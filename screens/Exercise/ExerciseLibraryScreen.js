import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  Image,
  Animated,
  RefreshControl,
  LayoutAnimation,
} from 'react-native';
import {COLOR, SCREEN_HEIGHT} from '../../constant';
import {Icon} from 'react-native-elements';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {Searchbar} from 'react-native-paper';
import {
  generateNewExercise,
  getListAllExercise,
} from '../../utilities/FirebaseDatabase';
import {convertObjectToArrayWithoutKey} from '../../utilities/Utilities';
import LoadingView from '../../components/LoadingView';

const HEADER_HEIGHT = 170; // height of the image
const SCREEN_HEADER_HEIGHT = 140; // height of the header contain back button

function ExerciseLibraryScreen({navigation}) {
  const [listExercise, setListExercise] = useState([]);
  const [displayListExercise, setDisplayListExercise] = useState([]);
  const [textInput, setTextInput] = useState('');

  const [refreshing, setRefreshing] = React.useState(false);

  const scrollY = useRef(new Animated.Value(0)).current;

  const CustomLayoutSpring = {
    duration: 500,
    create: {
      type: LayoutAnimation.Types.easeIn,
      property: LayoutAnimation.Properties.scaleY,
      springDamping: 1,
    },
    update: {
      type: LayoutAnimation.Types.spring,
      property: LayoutAnimation.Properties.opacity,
      springDamping: 0.7,
    },
    delete: {
      type: LayoutAnimation.Types.spring,
      property: LayoutAnimation.Properties.opacity,
      springDamping: 2,
    },
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    searchExercise(textInput);
  }, [textInput]);

  const getData = async () => {
    const res = await getListAllExercise();
    setListExercise(convertObjectToArrayWithoutKey(res.val()));
    LayoutAnimation.configureNext(CustomLayoutSpring);
    setDisplayListExercise(convertObjectToArrayWithoutKey(res.val()));
  };

  const searchExercise = input => {
    let displayList = listExercise?.filter(item => {
      return (
        item?.name?.toLowerCase().includes(input.toLowerCase()) ||
        item?.name_en?.toLowerCase().includes(input.toLowerCase())
      );
    });
    LayoutAnimation.configureNext(CustomLayoutSpring);
    setDisplayListExercise(displayList);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTextInput('');
    getData();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

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
        source={{
          uri: 'https://thumbor.forbes.com/thumbor/fit-in/1200x0/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fdam%2Fimageserve%2F1130300334%2F0x0.jpg%3Ffit%3Dscale',
        }}
        resizeMode="cover"></Animated.Image>
      <Animated.View style={styles.headerContentWrapper}>
        <View style={styles.headerTxtWrapper}>
          <Text style={styles.infoTxt}>
            S??? l?????ng: {displayListExercise?.length}
          </Text>
          <Text style={styles.headerTxt}>Th?? vi???n k??? thu???t</Text>
        </View>
        <LinearGradient
          style={styles.linearGradient}
          start={{x: 0.0, y: 0.8}}
          end={{x: 0.0, y: 0.0}}
          colors={[COLOR.LIGHT_MATTE_BLACK, 'transparent']}></LinearGradient>
      </Animated.View>
    </View>
  );

  const renderItem = item => (
    <Animated.View style={styles.itemWrapper}>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate('ExerciseInfo', {exercise: item})}>
        <View style={styles.excersiseWrapper}>
          <Image
            resizeMode="cover"
            style={styles.itemImg}
            source={{
              uri: item?.image,
            }}></Image>
          <View style={styles.txtWrapper}>
            <Text style={styles.excersiseName}>{item?.name}</Text>
            <Text style={styles.excersiseInfo}>Level: {item?.level}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );

  const renderSortButton = () => {
    return (
      <View
        style={[
          {
            position: 'absolute',
            bottom: 10,
            right: 20,
            backgroundColor: COLOR.WHITE,
            borderRadius: 50,
            elevation: 5,
            shadowColor: '#fff',
            shadowOffset: {width: 10, height: 2},
            shadowOpacity: 0.2,
            width: 120,
            height: 50,
            overflow: 'hidden',
          },
        ]}>
        <TouchableOpacity
          onPress={() => {
            generateNewExercise();
          }}
          style={{
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon
            name={'tag'}
            type="font-awesome"
            size={20}
            color={COLOR.BLACK}
          />
          <Text style={{marginLeft: 15, fontSize: 16, fontWeight: 'bold'}}>
            B??? L???c
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor="transparent" translucent />
      <Animated.FlatList
        style={styles.flatlist}
        data={displayListExercise}
        keyExtractor={(item, index) => index}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        ListHeaderComponent={renderHeader()}
        renderItem={({item}) => renderItem(item)}
        ListFooterComponent={() => <View style={{height: 50}} />}
        ListEmptyComponent={() => {
          return !listExercise?.length > 0 ? (
            <View style={{height: SCREEN_HEIGHT - HEADER_HEIGHT - 50}}>
              <LoadingView />
            </View>
          ) : (
            <></>
          );
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }></Animated.FlatList>
      <Animated.View
        style={[
          styles.screenHeader,
          {
            opacity: scrollY.interpolate({
              inputRange: [0 + 10, HEADER_HEIGHT - SCREEN_HEADER_HEIGHT],
              outputRange: [0, 1],
            }),
          },
        ]}>
        <Animated.Text
          numberOfLines={1}
          style={[
            styles.titleTxt,
            {
              transform: [
                {
                  translateX: scrollY.interpolate({
                    inputRange: [10, 70, 9999],
                    outputRange: [100, 0, 0],
                  }),
                },
              ],
            },
          ]}>
          Th?? vi???n b??i t???p
        </Animated.Text>
      </Animated.View>
      <Animated.View
        style={[
          styles.searchWrapper,
          {
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, 40, 99999],
                  outputRange: [
                    0,
                    -(HEADER_HEIGHT - SCREEN_HEADER_HEIGHT + 50),
                    -(HEADER_HEIGHT - SCREEN_HEADER_HEIGHT - 60),
                  ],
                }),
              },
            ],
          },
        ]}>
        <Searchbar
          style={{height: 40}}
          placeholder="T??m ki???m ?????ng t??c"
          value={textInput}
          onChangeText={t => setTextInput(t)}
        />
      </Animated.View>
      {/* {renderSortButton()} */}
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
    paddingTop: 45,
  },
  header: {
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: COLOR.MATTE_BLACK,
    marginTop: -10000,
    paddingTop: 10000,
    marginBottom: 50,
  },
  headerContentWrapper: {
    position: 'absolute',
    bottom: 0,
    //backgroundColor:'#fff',
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
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
    backgroundColor: COLOR.LIGHT_MATTE_BLACK,
  },
  itemWrapper: {
    backgroundColor: COLOR.LIGHT_MATTE_BLACK,
    paddingVertical: 5,
  },
  excersiseWrapper: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    //backgroundColor: COLOR.WHITE,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
  },
  itemImg: {
    width: 120,
    height: 60,
    borderRadius: 7,
  },
  txtWrapper: {
    paddingHorizontal: 10,
  },
  excersiseName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: COLOR.WHITE,
  },
  excersiseInfo: {
    fontSize: 13,
    color: COLOR.LIGHT_GREY,
  },
  headerImg: {
    height: HEADER_HEIGHT,
    width: '200%',
    opacity: 0.5,
  },
  linearGradient: {
    height: HEADER_HEIGHT / 4,
    width: '100%',
  },
  titleTxt: {
    color: COLOR.WHITE,
    fontSize: 20,
    alignSelf: 'center',
  },
  searchWrapper: {
    position: 'absolute',
    width: '100%',
    top: HEADER_HEIGHT,
    paddingHorizontal: 10,
  },
  divider: {
    backgroundColor: COLOR.WHITE,
    height: 1,
    marginHorizontal: 20,
  },
  sortBtn: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export default ExerciseLibraryScreen;
