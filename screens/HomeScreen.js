import React, { useState } from 'react';
import {
  Image,
  Text,
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import HomeSection from '../components/HomeSection';
import UserStatus from '../components/UserStatus';
import WorkoutItem from '../components/WorkoutItem';
import {COLOR, SCREEN_WIDTH} from '../constant'
function HomeScreen({navigation}) {

  const [suggestedWorkouts, setSuggestedWorkouts] = useState(['1','2','3'])

  const renderBanner = () => (
    <BackgroundImage style={styles.banner}
        source ={{uri:'https://www.cnet.com/a/img/mSdKK71X29nFhsLSencu7IwYlhQ=/1200x675/2019/11/12/e66cc0f3-c6b8-4f6e-9561-e23e08413ce1/gettyimages-1002863304.jpg'}}
        resizeMode='cover'
        >
          <View style={styles.todayWorkout}>
            <Text style={styles.todayWorkoutTxt}>Bài Tập Của Ngày</Text>
          </View>
          
          <View style={styles.bannerBlur}>
            <View style={{flex:4, marginRight:5}}>
              <View style={styles.bannerTag}>
                <Icon
                  name='tags'
                  type='font-awesome'
                  size={13}
                  color={COLOR.BLACK}/>
                <Text style={styles.bannerTagTxt}>Dành cho bạn</Text>
              </View>
              <Text numberOfLines={2} style={styles.bannerTxt}>Bài tập bụng giúp xây dựng sức bền</Text>
              <View style={{flexDirection:'row', alignItems:'center', position:'absolute', bottom:3, marginRight:10}}>
                <Icon
                name='certificate'
                type='font-awesome-5'
                size={15}
                color={COLOR.WHITE}/>
                <Text numberOfLines={1} style={styles.bannerdesTxt}>Nhóm Cơ: Vai, Tay trước, Lưng, Bụng, Xô</Text>
              </View>
            </View>

            <View style={styles.bannerBtn}>
              <TouchableOpacity onPress={()=>navigation.navigate('WorkoutInfo')}>
                <Icon
                  name='dumbbell'
                  type='font-awesome-5'
                  size={23}
                  color={COLOR.GOLD}/>
                  <Text style={{color:COLOR.WHITE, marginTop:5}}>Tập Ngay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BackgroundImage>
  )

  const renderUserInfo = () => (
    <View style={styles.userStatus}>
      <View style={styles.userTagWrapper}>
        <View style={[styles.userTag,{borderColor:COLOR.ORANGE}]}>
          <Icon
          name='account'
          type='material-community'
          size={14}
          color={COLOR.ORANGE}/>
          <Text style={[styles.userTagTxt,{color:COLOR.ORANGE}]}>Người mới tập</Text>
        </View>
        <View style={[styles.userTag,{borderColor:COLOR.LIGHT_BLUE_2}]}>
          <Icon
          name='account'
          type='material-community'
          size={14}
          color={COLOR.LIGHT_BLUE_2}/>
          <Text style={[styles.userTagTxt,{color:COLOR.LIGHT_BLUE_2}]}>Tăng cơ</Text>
        </View>
      </View>

      <View style={{flexDirection:'row', paddingVertical:5}}>
        <View style={{flex:5}}>
          <Text style={styles.numberTxt}>Đào Duy Nam</Text>
          <Text style={styles.silverTxt}>Chiều Cao: <Text style={styles.numberTxt}>173cm</Text> - Cân nặng:  <Text style={styles.numberTxt}>63.5 kg</Text></Text>
        </View>
        <View style={{flex:1, alignItems:'center', marginTop:-20}}>
          <Text style={{fontWeight:'bold', fontSize:20, color:COLOR.DARK_BROWN}}>BMI</Text>
          <Text style={{fontSize:20, fontWeight:'bold', color:COLOR.WHITE}}>2.5</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.userBtn} onPress={() => navigation.navigate('Category')}>
        <Icon
        name='chart-line'
        type='material-community'
        size={20}
        color={COLOR.WHITE}/>
        <Text style={[styles.userBtnTxt,{marginLeft:10}]}>Cập nhật chỉ số ngay</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <ScrollView style={{ flex: 1, backgroundColor:COLOR.MATTE_BLACK}}>
        <StatusBar barStyle='light-content' backgroundColor={'transparent'} translucent></StatusBar>
        {renderBanner()}
        {renderUserInfo()}
        <HomeSection
        title='Đề xuất cho bạn'
        onPress={()=>{}}
        />
        <FlatList
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalList}
        data={suggestedWorkouts}
        renderItem={(item)=>(
          <View style={{width:SCREEN_WIDTH}}>
            <WorkoutItem image={{uri:'https://ggstorage.oxii.vn/images/oxii-2021-3-2/728/tong-hop-22-bai-tap-workout-khong-ta-tai-nha-xin-nhat-2021-phan-1-1.jpg'}}/>
          </View>
        )}
        />
        <HomeSection
        title='Tham gia thử thách'
        onPress={()=>{}}
        />
        <FlatList
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalList}
        data={suggestedWorkouts}
        renderItem={(item)=>(
          <View style={{width:SCREEN_WIDTH}}>
            <WorkoutItem image={{uri:'https://ggstorage.oxii.vn/images/oxii-2021-3-2/728/tong-hop-22-bai-tap-workout-khong-ta-tai-nha-xin-nhat-2021-phan-1-1.jpg'}}/>
          </View>
        )}
        />
        {/* <TouchableOpacity style={{height:50, backgroundColor:'#123123'}} onPress={()=>navigation.navigate('WorkoutInfo')}/> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  banner:{
    height:250,
    justifyContent:'flex-end',
  },
  bannerBlur:{
    backgroundColor:'#000',
    opacity:0.8,
    marginHorizontal:5,
    marginBottom:5,
    borderRadius:10,
    paddingHorizontal:10,
    paddingTop:10,
    flexDirection:'row'
  },
  bannerImg:{
    width:70, 
    height:70,
    borderRadius:5,
    marginLeft:5
  },
  bannerTag:{
    backgroundColor:COLOR.GOLD,
    borderWidth:1,
    width:120,
    borderRadius:5,
    flexDirection:'row',
    paddingHorizontal:9,
    justifyContent:'space-between',
    alignItems:'center'
  },
  bannerTagTxt:{
    fontSize:13,
    color:COLOR.BLACK,
    fontWeight:'bold'
  },
  bannerTxt:{
    color:COLOR.WHITE,
    fontSize:20,
    fontWeight:'bold'
  },
  bannerdesTxt:{
    color:COLOR.WHITE,
    fontSize:13,
    fontWeight:'bold',
    marginLeft:5
  },
  bannerBtn:{
    flex:1, 
    borderLeftWidth:1, 
    borderLeftColor:COLOR.GREY, 
    marginVertical:20, 
    alignItems:'center', 
    paddingTop:10,
  },
  todayWorkout:{
    backgroundColor:COLOR.GOLD,
    width:170,
    height:25,
    position:'absolute',
    bottom:150,
    right:0,
    borderTopLeftRadius:10,
    borderBottomLeftRadius:10,
    justifyContent:'center',
    paddingLeft:10,
  },
  todayWorkoutTxt:{
    color:COLOR.MATTE_BLACK,
    fontSize:17,
    fontWeight:'bold'
  },
  userStatus:{
    width:'100%', 
    alignSelf:'center',
    paddingTop:5,
    marginBottom:20,
    paddingHorizontal:15,
  },
  horizontalList:{
  },
  userBtn:{
    width:'100%',
    height:40,
    backgroundColor:COLOR.LIGHT_BROWN,
    borderRadius:20,
    alignSelf:'center',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  userBtnTxt:{
    color:COLOR.WHITE,
    fontWeight:'bold',
    fontSize:16
  },
  numberTxt:{
    color:COLOR.WHITE,
    fontSize:15
  },
  silverTxt:{
    fontSize:13,
    color:'#aaa9ad'
  },
  userTag:{
    height:20,
    borderWidth:1,
    borderRadius:7,
    alignItems:'center',
    paddingHorizontal:5,
    flexDirection:'row',
    marginRight:10
  },
  userTagWrapper:{
    flexDirection:'row'
  },
  userTagTxt:{
    fontSize:11,
    fontWeight:'bold'
  },
});

export default HomeScreen;
