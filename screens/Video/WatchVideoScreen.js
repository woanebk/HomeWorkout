import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {COLOR} from '../../constant';
import YoutubePlayer from 'react-native-youtube-iframe';
import moment from 'moment';
import {getVideoById} from '../../utilities/FirebaseDatabase';
import AnimatedText from '../../components/animatedText/AnimatedText';

function WatchVideoScreen({route}, props) {
  const {videoData} = route.params || {};

  const [video, setVideo] = useState({});
  useEffect(() => {
    getVideoDetail();
  }, []);

  const getVideoDetail = async () => {
    const res = await getVideoById(videoData?.id);
    setVideo(res.val());
  };
  // };

  function youtube_parser(url) {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  }

  return (
    <View style={styles.container}>
      <View style={{paddingHorizontal: 20, marginTop: 80}}>
        <AnimatedText ySlideStart={0} style={styles.titleTxt}>
          {video?.name}
        </AnimatedText>
        <Text style={styles.desTxt}>
          {moment(video?.createdAt).format('LL')}
        </Text>
      </View>

      <View style={{marginTop: 30}}>
        <YoutubePlayer
          height={250}
          play={true}
          videoId={youtube_parser(video?.video || '')}
        />
      </View>
      <ScrollView style={{paddingHorizontal: 20}}>
        <Text style={[styles.desTxt, {fontWeight: 'bold'}]}>Mô tả</Text>
        <AnimatedText
          xSlideStart={0}
          ySlideStart={0}
          timing={2000}
          style={styles.desTxt}>
          {video?.description}
        </AnimatedText>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.MATTE_BLACK,
  },
  titleTxt: {
    color: COLOR.WHITE,
    fontSize: 30,
  },
  desTxt: {
    color: COLOR.WHITE,
    fontSize: 17,
  },
});

export default WatchVideoScreen;
