import React, {forwardRef, useEffect, useRef, useState} from 'react';
import {Text, StyleSheet, View, Modal} from 'react-native';
import LottieView from 'lottie-react-native';
import { COLOR, SCREEN_HEIGHT } from '../constant';

function LoadingView(props) {
  

  return (
    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
      <LottieView
        style={styles.animation}
        source={require('../assets/lottie/loading.json')}
        autoPlay
        loop></LottieView>
    </View>
  );
}

const styles = StyleSheet.create({
    animation:{
        width:100,
        height:100,
        alignSelf:'center'
    },
});

export default LoadingView;
