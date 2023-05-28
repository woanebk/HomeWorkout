import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Video from 'react-native-video';
import SuggestExercise from '../../components/SuggestExercise';
import {COLOR} from '../../constant';
import {getExerciseByIds} from '../../utilities/FirebaseDatabase';
import AnimatedText from '../../components/animatedText/AnimatedText';

function ExerciseInfoScreen({route, navigation}) {
  const {exercise} = route.params;
  const [suggestExercises, setSuggestExercises] = useState([]);
  const [isLoadingVideo, setIsLoadingVideo] = useState(false);

  useEffect(() => {
    getRelatedExercise();
  }, [exercise]);

  const getRelatedExercise = async () => {
    let list = [];
    for (let i = 0; i < exercise?.related_exercise?.length; i++) {
      const id = exercise?.related_exercise[i];
      const res = await getExerciseByIds(id);
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
          onLoadStart={() => {
            if (!isLoadingVideo) setIsLoadingVideo(true);
          }}
          onBuffer={() => {
            if (!isLoadingVideo) setIsLoadingVideo(true);
          }}
          onLoad={() => {
            if (isLoadingVideo) setIsLoadingVideo(false);
          }}
          style={styles.backgroundVideo}
          resizeMode="cover"
        />
        {isLoadingVideo && (
          <View style={styles.videoLoading}>
            <ActivityIndicator color={COLOR.WHITE} />
          </View>
        )}
      </View>
      <View style={styles.titleWrapper}>
        <AnimatedText ySlideStart={0} numberOfLines={2} style={styles.title}>
          {exercise?.name}
        </AnimatedText>
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
        <AnimatedText style={styles.desTxt} ySlideStart={0} timing={300}>
          {exercise?.description}
        </AnimatedText>
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

  videoLoading: {
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLOR.MATTE_BLACK,
  },
});

export default ExerciseInfoScreen;
