import React, { useEffect, useRef, useState } from 'react';
import {
    StyleSheet,
    View,
  } from 'react-native';
import LottieView from 'lottie-react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

function HeartButton(props) {

    const animation = useRef(null)

    useEffect(()=>{
        if(props.isliked){
            animation.current.play(0, 45)
        }
        else{
            animation.current.play(75, 75)
        }
    })

    return (
      <View style={[styles.body, props.style]}>
            <TouchableWithoutFeedback onPress={props.onButtonPress}
            >
                <LottieView
                 style={[props?.heartStyle || styles.btn]} 
                 ref={animation}
                 source={require('../assets/lottie/4837-heart.json')} 
                 autoPlay={false} loop={false} />
            </TouchableWithoutFeedback>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    body:{
        width:50,
        height:50,
        alignItems:'center',
        //backgroundColor:'#ffffff',
        justifyContent:'center'
    },
    btn:{
        width:100,
        height:100
    }
  });
  
  export default HeartButton;