import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  ImageBackground,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLOR } from '../../constant';
import HeartButton from '../../components/HeartButton';
import StartButton from '../../components/StartButton';
function WorkoutInfoScreen({navigation, route}) {

  const { workoutData } = route.params;

  const [liked, setLiked] = useState(false)

  const renderHeader = ()=>(
    <View style= {styles.banner}>
        <ImageBackground
        source={{uri: workoutData?.image}}
        resizeMode='cover'
        style={{flex:1, justifyContent:'space-between'}}>
          <LinearGradient 
            start={{x:0, y:0}}
            end={{x:0, y:1}}
            colors={[COLOR.BLACK, COLOR.TRANSPARENT]} 
            style={styles.topLinearGradient}>
              <HeartButton style={styles.likeBtn} isliked={liked} onButtonPress={()=>{liked?setLiked(false):setLiked(true)}}/>
            </LinearGradient>
            <LinearGradient 
            start={{x:0, y:0}}
            end={{x:0, y:1}}
            colors={[COLOR.TRANSPARENT, COLOR.BLACK]} 
            style={styles.linearGradient}>
                <Text style={styles.levelTxt} numberOfLines={1}>Level: {workoutData?.level}</Text>
                <Text style={styles.title} numberOfLines={2}>{workoutData?.name}</Text>
                <ScrollView horizontal style={styles.tagScroll}>
                  {workoutData?.muscle_group &&
                    workoutData?.muscle_group?.map((item, index)=>(
                      <View style={[styles.tag, index==0?{marginLeft:20}:{}]} key={index}>
                        <Text style={styles.tagTxt}>{item}</Text>
                      </View>
                    ))
                  }
                </ScrollView>
                <Text style={styles.levelTxt}>Thời gian ước tính : {workoutData?.estimate_time} phút</Text>
                <Text style={styles.levelTxt}>Số Round : x{workoutData?.rounds?.length}</Text>
            </LinearGradient>
        </ImageBackground>
    </View>
)

  return (
    <View style={{ flex: 1, backgroundColor:COLOR.BLACK}}>
        <StatusBar barStyle='light-content' translucent backgroundColor='transparent'></StatusBar>
        {renderHeader()}
        <View style={styles.btnWrapper}>
          <StartButton title='Bắt Đầu' onButtonPress={()=>navigation.navigate('WorkoutDetail', {workoutData: workoutData}) }></StartButton>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner:{
    height:'80%',
  },
  topLinearGradient:{
    height:120
  },
  linearGradient: {
    height:300,
    justifyContent:'flex-end',
  },
  levelTxt:{
    fontSize:15,
    color:COLOR.WHITE,
    width:'80%',
    paddingHorizontal:20,
    lineHeight:25
  },
  title:{
    fontSize:40,
    color:COLOR.WHITE,
    fontWeight:'bold',
    width:'100%',
    paddingHorizontal:20
  },
  btnWrapper:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    paddingBottom:60
    //backgroundColor:'#fff'
  },
  btn:{
    width:120,
    height:120,
    backgroundColor:'#fff',
    borderRadius:70,
    alignItems:'center',
    justifyContent:'center'
  }, 
  btnTxt:{
    textAlign:'center',
    fontWeight:'bold',
    fontSize:20
  },
  tagScroll:{
    maxHeight:50,
  },
  tag:{
    height:30,
    backgroundColor:COLOR.WHITE,
    alignSelf:'center',
    justifyContent:'center',
    borderRadius:7,
    marginRight:10,
  },
  tagTxt:{
    fontSize:15,
    fontWeight:'bold',
    paddingHorizontal:15
  },
  likeBtn:{
    position:'absolute',
    right:20,
    top:30
  }
});

export default WorkoutInfoScreen;
