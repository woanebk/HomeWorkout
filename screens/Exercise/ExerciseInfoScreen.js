import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, StatusBar} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import Video from 'react-native-video';
import SuggestExercise from '../../components/SuggestExercise';
import {COLOR} from '../../constant';
import {getExerciseById} from '../../utilities/FirebaseDatabase';

function ExerciseInfoScreen({route, navigation}) {
  const {exercise} = route.params;

  const [suggestExercises, setSuggestExercises] = useState([]);

  useEffect(() => {
    getRelatedExercise();
  }, []);

  const getRelatedExercise = async () => {
    let list = [];
    for (let i = 0; i < exercise?.related_exercise?.length; i++) {
      const id = exercise?.related_exercise[i];
      const res = await getExerciseById(id);
      res.val() && list.push(res.val());
    }
    setSuggestExercises(list);
  };

  const renderSuggestedExercises = () => {
    return (
      <>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Những bài tập liên quan:</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{marginBottom: 20}}>
          {suggestExercises.map((item, index) => (
            <View
              style={[{marginRight: 15}, index == 0 ? {marginLeft: 20} : {}]}
              key={index}>
              <SuggestExercise
                onPress={() => {
                  navigation.navigate('ExerciseInfo', {exercise: item});
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
          source={{uri: exercise?.video}}
          repeat
          style={styles.backgroundVideo}
          resizeMode="cover"
        />
      </View>
      <View style={styles.titleWrapper}>
        <Text numberOfLines={2} style={styles.title}>
          {exercise?.name}
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nhóm cơ tác động:</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tagScroll}>
        {exercise?.muscle_group &&
          exercise?.muscle_group?.map((item, index) => (
            <View
              style={[styles.tag, index == 0 ? {marginLeft: 20} : {}]}
              key={index}>
              <Text style={styles.tagTxt}>{item}</Text>
            </View>
          ))}
      </ScrollView>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Những lưu ý khi tập:</Text>
        <Text style={styles.desTxt}>{exercise?.description}</Text>
      </View>
      {suggestExercises?.length > 0 && renderSuggestedExercises()}
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

export default ExerciseInfoScreen;
