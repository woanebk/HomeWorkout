import React, {useState} from 'react';
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
import {COLOR, SCREEN_WIDTH} from '../constant';
import ProgramItem from '../components/ProgramItem';
import HomeCategoryItem from '../components/HomeCategoryItem';
import CommandButton from '../components/CommandButton';
import { Test } from '../utilities/FirebaseDatabase';

const HOME_BANNER_HEIGHT = 300;
function HomeScreen({navigation}) {
  const [suggestedWorkouts, setSuggestedWorkouts] = useState(['1', '2', '3']);

  const renderBanner = () => (
    <BackgroundImage
      style={styles.banner}
      source={{
        uri: 'https://www.cnet.com/a/img/mSdKK71X29nFhsLSencu7IwYlhQ=/1200x675/2019/11/12/e66cc0f3-c6b8-4f6e-9561-e23e08413ce1/gettyimages-1002863304.jpg',
      }}
      resizeMode="cover">
      <View style={styles.todayWorkout}>
        <Text style={styles.todayWorkoutTxt}>Bài Tập Của Ngày</Text>
      </View>

      <LinearGradient
        style={styles.bannerLinearGradient}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 0.9}}
        colors={[COLOR.TRANSPARENT, COLOR.MATTE_BLACK]}></LinearGradient>

      <View style={styles.bannerLeft}>
        <Text style={styles.bannerTxt}>Bài tập bụng giúp xây dựng sức bền</Text>
        <View style={styles.bannerBtnWrapper}>
          <TouchableOpacity
            style={styles.bannerBtn}
            onPress={() => navigation.navigate('WorkoutInfo')}>
            <Icon
              name="dumbbell"
              type="font-awesome-5"
              size={13}
              color={COLOR.WHITE}
            />
            <Text style={styles.bannerBtnTxt}>Tập Ngay</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bannerRight}>
        <View style={styles.bannerRightInsider}>
          <Text style={styles.bannerRightTxt}>3</Text>
          <Text style={styles.bannerRightSmallTxt}>Số set</Text>
          <Text style={styles.bannerRightTxt}>30m</Text>
          <Text style={styles.bannerRightSmallTxt}>Thời gian</Text>
          <Text style={[styles.bannerRightTxt, {fontSize: 15}]}>Medium</Text>
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
            Người mới tập
          </Text>
        </View>
        <View style={[styles.userTag, {borderColor: COLOR.WHITE}]}>
          <Icon
            name="account"
            type="material-community"
            size={14}
            color={COLOR.WHITE}
          />
          <Text style={[styles.userTagTxt, {color: COLOR.WHITE}]}>Tăng cơ</Text>
        </View>
      </View>

      <View style={{flexDirection: 'row', paddingVertical: 5}}>
        <View style={{flex: 5}}>
          <Text style={styles.numberTxt}>Đào Duy Nam</Text>
          <Text style={styles.silverTxt}>
            Chiều Cao: <Text style={styles.numberTxt}>173cm</Text> - Cân nặng:{' '}
            <Text style={styles.numberTxt}>63.5 kg</Text>
          </Text>
        </View>
        <View style={{flex: 1, alignItems: 'center', marginTop: -20}}>
          <Text
            style={{fontWeight: 'bold', fontSize: 20, color: COLOR.DARK_BROWN}}>
            BMI
          </Text>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: COLOR.WHITE}}>
            2.5
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.userBtn}
        onPress={() => navigation.navigate('Category')}>
        <Icon
          name="chart-line"
          type="material-community"
          size={20}
          color={COLOR.WHITE}
        />
        <Text style={[styles.userBtnTxt, {marginLeft: 10}]}>
          Cập nhật chỉ số ngay
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
      <HomeSection title="Tham gia thử thách" onPress={() => {}} />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalList}
        data={suggestedWorkouts}
        renderItem={({item, index}) => (
          <View style={{paddingRight: 15}} key={index}>
            <ProgramItem
              onPress={() => {navigation.navigate('ChallengeDetail')}} 
              style={{height: 200, width: 160}}
              title="Thử thách thay đổi bản thân 7 ngày"
              image={{
                uri: 'https://ggstorage.oxii.vn/images/oxii-2021-3-2/728/tong-hop-22-bai-tap-workout-khong-ta-tai-nha-xin-nhat-2021-phan-1-1.jpg',
              }}
            />
          </View>
        )}
      />
      <HomeSection title="Đề xuất cho bạn" onPress={() => {}} />
      <FlatList
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalList}
        data={suggestedWorkouts}
        renderItem={({item}) => (
          <View style={{width: SCREEN_WIDTH, paddingRight: 30}}>
            <WorkoutItem
              onPress={() => navigation.navigate('WorkoutInfo')}
              image={{
                uri: 'https://ggstorage.oxii.vn/images/oxii-2021-3-2/728/tong-hop-22-bai-tap-workout-khong-ta-tai-nha-xin-nhat-2021-phan-1-1.jpg',
              }}
            />
          </View>
        )}
      />
      <HomeSection title="Lựa chọn cách tập của riêng bạn" onPress={() => {}} />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalList}
        data={suggestedWorkouts}
        renderItem={({item, index}) => (
          <View style={{paddingRight: 15}} key={index}>
            <HomeCategoryItem
            onPress={()=>navigation.navigate('AllWorkout')}
              style={{height: 110, width: 250}}
              title="Giảm Mỡ"
              subTitle="bao gồm 20 bài tập"
              image={{
                uri: 'https://ggstorage.oxii.vn/images/oxii-2021-3-2/728/tong-hop-22-bai-tap-workout-khong-ta-tai-nha-xin-nhat-2021-phan-1-1.jpg',
              }}
            />
          </View>
        )}
      />
      <View style={styles.libraryBtnWrapper}>
        <CommandButton
          icon="tag"
          title="Đi đến thư viện kỹ thuật"
          backgroundColor={COLOR.GOLD}
          onPress={() => {
            navigation.navigate('ExcerciseLibrary')
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
