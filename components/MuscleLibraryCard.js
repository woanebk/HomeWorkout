import React, {useEffect, useRef} from 'react';
import {Animated, Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {BackgroundImage} from 'react-native-elements/dist/config';
import {COLOR} from '../constant';

function MuscleLibraryCard({navigation}) {
  const scaleAnim = useRef(new Animated.Value(1.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.5,
          duration: 7000,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1.3,
          duration: 7000,
        }),
      ]),
      {},
    ).start();
  }, []);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Category');
      }}>
      <View style={[styles.container]}>
        <Animated.Image
          resizeMode={'cover'}
          source={require('../assets/images/muscle_group_banner.jpg')}
          style={[
            styles.img,
            {
              transform: [{scale: scaleAnim}],
            },
          ]}
        />
        <Text style={styles.title}>Xác định nhóm cơ</Text>
        <Text style={styles.subTitle}>
          Lựa chọn bài tập phù hợp để phát triển hiệu quả cơ bắp bạn mong muốn
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 15,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 15,
    height: 120,
  },
  title: {
    fontSize: 25,
    color: COLOR.WHITE,
    fontWeight: 'bold',
  },
  img: {
    flex: 1,
    borderRadius: 15,
    position: 'absolute',
    width: '100%',
    height: undefined,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000000',
    opacity: 0.8,
  },
  subTitle: {
    fontSize: 13,
    color: COLOR.WHITE,
    fontWeight: 'bold',
  },
});

export default MuscleLibraryCard;
