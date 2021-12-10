import {BlurView} from '@react-native-community/blur';
import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, ScrollView, FlatList} from 'react-native';
import {Icon} from 'react-native-elements';
import {BackgroundImage} from 'react-native-elements/dist/config';
import LinearGradient from 'react-native-linear-gradient';
import CommandButton from '../../components/CommandButton';
import WorkoutByDayItem from '../../components/WorkoutByDayItem';
import {COLOR, SCREEN_HEIGHT} from '../../constant';
import {convertStringDDMMYYtoDate} from '../../utilities/Utilities';
import {
  addChallengeToMyList,
  deleteChallengeOutToMyList,
  lookupChallengeInMyList,
} from '../../utilities/FirebaseDatabase';
const LINEAR_GRADIENT_HEIGHT = 120;

function ChallengeDetailScreen({route, navigation}) {
  const {item,key} = route.params;
  const [isSubCribed, setIsSubCribed] = useState(false);
  const DATA = [{
    id: undefined,
    imgURL:
    undefined,
  },];
  const [workoutListByDay, setWorkOutListByDay] = useState(item.listWorkout);
  const [challengeDetail, setChallengeDetail] = useState(DATA);
  useEffect(async () => {
    if(key!=null)
    {   
       var res = await lookupChallengeInMyList(key);
       setChallengeDetail(res);
       setIsSubCribed(res.id != null);
    }
    else{    
         var res = await lookupChallengeInMyList(item.id);
      setChallengeDetail(item);    setIsSubCribed(res.id != null);
    }
  }, []);

  const handleSubcribe = async () => {
    if (isSubCribed) {
      setIsSubCribed(false);
      await deleteChallengeOutToMyList(challengeDetail);
    } else {
      setIsSubCribed(true);
      await addChallengeToMyList(challengeDetail);
    }
  };

  const renderWorkoutByDayItem = (item, index) => {
    return (
      <WorkoutByDayItem
        onPress={() => navigation.navigate('WorkoutInfo')}
        isDone={index == 0}
        style={{marginRight: 10}}
        title="Bài tập bụng"
        image={{
          uri: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
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
          uri: challengeDetail.imgURL,
        }}
        imageStyle={styles.img}
        style={[styles.img]}>
        <BlurView
          overlayColor={'#00000010'}
          style={styles.blur}
          blurType="light"
          blurAmount={5}
          reducedTransparencyFallbackColor="black"
        />
        <View style={styles.titleWrapper}>
          <Text style={styles.titleTxt}>{challengeDetail.title}</Text>
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
                Thời gian:
               
                {challengeDetail.endTime!=null?(convertStringDDMMYYtoDate(challengeDetail.endTime).getTime() -
                  convertStringDDMMYYtoDate(
                    challengeDetail.startTime,
                  ).getTime()) /
                  (1000 * 3600 * 24):7}{' '}
                ngày
              </Text>
              <Text style={styles.rowItemSubTxt}>
                {challengeDetail.spanTime != null
                  ? challengeDetail.spanTime
                  : '30'}{' '}
                phút mỗi ngày
              </Text>
              <Text style={styles.rowItemSubTxt}>
                Ngày bắt đầu:{challengeDetail.startTime}
              </Text>
              <Text style={styles.rowItemSubTxt}>
                Ngày kết thúc:{challengeDetail.endTime}
              </Text>
            </View>
          </View>
          <FlatList
            style={styles.workoutList}
            data={workoutListByDay}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => renderWorkoutByDayItem(item, index)}
          />
          <Text style={styles.aboutTxt}>Giới thiệu thử thách</Text>
          <ScrollView style={styles.detail}>
            <Text style={styles.aboutContentTxt}>{challengeDetail.body}</Text>
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
          onPress={handleSubcribe}
        />
      </BackgroundImage>
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
    height: 500,
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
    marginBottom: 70,
    height: 170,
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
