import {BlurView} from '@react-native-community/blur';
import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, ScrollView, FlatList} from 'react-native';
import {Icon} from 'react-native-elements';
import {BackgroundImage} from 'react-native-elements/dist/config';
import LinearGradient from 'react-native-linear-gradient';
import CommandButton from '../../components/CommandButton';
import WorkoutByDayItem from '../../components/WorkoutByDayItem';
import {COLOR, SCREEN_HEIGHT} from '../../constant';

const LINEAR_GRADIENT_HEIGHT = 120;

function ChallengeDetailScreen({navigation}) {
  const [workoutListByDay, setWorkOutListByDay] = useState([1, 2, 3, 4]);

  useEffect(() => {}, []);

  const handleSubcribe = () => {

  }

  const renderWorkoutByDayItem = (item, index) => {
    return (
      <WorkoutByDayItem 
      onPress={()=>navigation.navigate('WorkoutInfo')}
        isDone={index === 0}
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
          uri: 'http://kettlebellcentral.com/wp-content/uploads/2016/09/Fotolia_80557951_Subscription_Monthly_M.jpg',
        }}
        imageStyle={styles.img}
        style={[styles.img]}>
        <BlurView
          overlayColor={'#00000010'}
          style={styles.blur}
          blurType="light"
          blurAmount={20}
          reducedTransparencyFallbackColor="black"
        />
        <View style={styles.titleWrapper}>
          <Text style={styles.titleTxt}>
            Thử thách 7 ngày thay đổi bản thân
          </Text>
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
              <Text style={styles.rowItemTitleTxt}>Thời gian: 7 ngày</Text>
              <Text style={styles.rowItemSubTxt}>30 phút mỗi ngày</Text>
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
            <Text style={styles.aboutContentTxt}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's standard
              dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book. It
              has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum
            </Text>
          </ScrollView>
        </View>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 0.9}}
          colors={[COLOR.TRANSPARENT, COLOR.MATTE_BLACK]}
          style={styles.linearGradient}></LinearGradient>
        <CommandButton
          style={styles.commandBtn}
          hasRightIcon
          title="Tham gia ngay"
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
