import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, StatusBar} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import Video from 'react-native-video';
import SuggestExcercise from '../../components/SuggestExcercise';
import {COLOR} from '../../constant';
import {getExcerciseById} from '../../utilities/FirebaseDatabase';

function ExcerciseInfoScreen({route, navigation}) {
  const {excersise} = route.params;

  const [suggestExcercises, setSuggestExcercises] = useState([]);

  useEffect(() => {
    getRelatedExcercise();
  }, []);

  const getRelatedExcercise = async () => {
    let list = [];
    for (let i = 0; i < excersise?.related_excercise?.length; i++) {
      const id = excersise?.related_excercise[i];
      const res = await getExcerciseById(id);
      res.val() && list.push(res.val());
    }
    setSuggestExcercises(list);
  };

  const renderSuggestedExcercises = () => {
    return (
      <>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Những bài tập liên quan:</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{marginBottom: 20}}>
          {suggestExcercises.map((item, index) => (
            <View
              style={[{marginRight: 15}, index == 0 ? {marginLeft: 20} : {}]}
              key={index}>
              <SuggestExcercise
                onPress={() => {
                  navigation.navigate('ExcerciseInfo', {excersise: item});
                }}
                style={styles.suggestItem}
                image={{uri: item?.image}}
                title={item?.name}
              />
            </View>
          ))}
        </ScrollView>
      </>
    );
  };

  return (
    <ScrollView style={{flex: 1}}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <View style={styles.backgroundVideo}>
        <Video
          source={{uri: excersise?.video}}
          repeat
          style={styles.backgroundVideo}
          resizeMode="cover"
        />
      </View>
      <View style={styles.titleWrapper}>
        <Text numberOfLines={2} style={styles.title}>
          {excersise?.name}
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nhóm cơ tác động:</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tagScroll}>
        {excersise?.muscle_group &&
          excersise?.muscle_group?.map((item, index) => (
            <View
              style={[styles.tag, index == 0 ? {marginLeft: 20} : {}]}
              key={index}>
              <Text style={styles.tagTxt}>{item}</Text>
            </View>
          ))}
      </ScrollView>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Những lưu ý khi tập:</Text>
        <Text style={styles.desTxt}>{excersise?.description}</Text>
      </View>
      {suggestExcercises?.length > 0 && renderSuggestedExcercises()}
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
    paddingVertical: 5,
  },
  sectionTitle: {
    fontSize: 18,
    color: COLOR.GREY,
    fontWeight: 'bold',
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
    color: COLOR.WHITE,
  },
  desTxt: {
    lineHeight: 20,
  },
  suggestItem: {
    height: 200,
    width: 150,
  },
});

export default ExcerciseInfoScreen;
