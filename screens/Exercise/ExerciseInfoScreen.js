import React, {useState} from 'react';
import {Text, StyleSheet, View, StatusBar} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import Video from 'react-native-video';
import SuggestExcercise from '../../components/SuggestExcercise';
import {COLOR} from '../../constant';

function ExcerciseInfoScreen() {
  const [muscleTag, setMuscleTag] = useState([
    'Vai',
    'Cầu vai',
    'Tay trước',
    'Tay sau',
    'Tay sau',
  ]);
  const [suggestExcercises, setSuggestExcercises] = useState([
    {name:'Hít đất Diamond', id:1, img:'https://dungcutheduc.vn/images/luu-y-khi-tap-diamond-push-up.jpg'},
    {name:'Hít đất rộng vai', id:2, img:'http://s3.amazonaws.com/prod.skimble/assets/1751645/image_iphone.jpg'},
    {name:'Hít đất Incline', id:3, img:'https://dungcutheduc.vn/images/luu-y-khi-tap-diamond-push-up.jpg'},
    {name:'Dip', id:4, img:'https://dungcutheduc.vn/images/luu-y-khi-tap-diamond-push-up.jpg'},
  ]);

  const [description, setDescription] = useState('- 2 tay giang rộng ngang vai \n - Khi xuống hít vào, khi đẩy lên thở ra \n - Khuỷu tay sát vào người')

  return (
    <ScrollView style={{flex: 1}}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <View style={styles.backgroundVideo}>
        <Video
          source={require('../../assets/5svideo.mp4')}
          repeat
          style={styles.backgroundVideo}
          resizeMode="cover"
        />
      </View>
      <View style={styles.titleWrapper}>
        <Text numberOfLines={2} style={styles.title}>
          Hít Đất
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nhóm cơ tác động:</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}
        style={styles.tagScroll}>
          {muscleTag &&
            muscleTag.map((item, index) => (
              <View
                style={[styles.tag, index == 0 ? {marginLeft: 20} : {}]}
                key={index}>
                <Text style={styles.tagTxt}>{item}</Text>
              </View>
            ))}
        </ScrollView>
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Những lưu ý khi tập:</Text>
            <Text style={styles.desTxt}>{description}</Text>
        </View>
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Những bài tập liên quan:</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginBottom:20}}>
          {suggestExcercises &&
            suggestExcercises.map((item, index) => (
              <View
                style={[{marginRight: 15}, index == 0 ? {marginLeft: 20} : {}]}
                key={index}>
                <SuggestExcercise style={styles.suggestItem} image={{uri: item.img}} title={item.name}/>
              </View>
            ))}
        </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  backgroundVideo: {
    width: '100%',
    height: 300,
    backgroundColor: COLOR.BLACK,
  },
  titleWrapper: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  section: {
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical:5
  },
  sectionTitle: {
    fontSize: 18,
    color: COLOR.GREY,
    fontWeight:'bold'
  },
  tagScroll: {
    maxHeight: 50,
  },
  tag: {
    height: 30,
    backgroundColor: COLOR.BLACK,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginRight: 10,
  },
  tagTxt: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    color:COLOR.WHITE
  },
  desTxt:{
    lineHeight:20,
  },
  suggestItem:{
    height:200,
    width:150
  }
});

export default ExcerciseInfoScreen;
