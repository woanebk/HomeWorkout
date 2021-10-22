import React, { useEffect, useRef, useState } from 'react';
import {
    Text,
    StyleSheet,
    View,
  } from 'react-native';
import {COLOR} from '../constant'
import LottieView from 'lottie-react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

function StartButton(props) {

    return (
      <View style={[styles.body, props.style]}>
            <TouchableWithoutFeedback style={styles.btn} onPress={props.onButtonPress}
            >
                <LottieView 
                 style={styles.animation} 
                 source={require('../assets/lottie/start-btn.json')} 
                 autoPlay loop>
                 </LottieView>
                 <Text style={styles.txt}>{props.title}</Text>
            </TouchableWithoutFeedback>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    body:{
        alignItems:'center',
        //backgroundColor:'#000',
        justifyContent:'center'
    },
    animation:{ //width height max: 250
        width:220,
        height:220,
    },
    btn:{
        justifyContent:'center'
    },
    txt:{
        fontSize:20,
        fontWeight:'bold',
        position:'absolute',
        color:COLOR.WHITE,
        textAlign:'center',
        alignSelf:'center'
    },
  });
  
  export default StartButton;