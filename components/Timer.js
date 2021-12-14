import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {COLOR} from '../constant';
import { handleFormatSecond } from '../utilities/Utilities';

function Timer(props, ref) {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(props?.isActive);

  useImperativeHandle(ref, () => ({
    // each key is connected to `ref` as a method name
    // they can execute code directly, or call a local method
    toggle: () => { toggle() },
    reset: () => { reset() },
    stop: () => { stop() },
    currentTime : seconds
  }))

  const toggle = () => {
    setIsActive(!isActive);
  };

  function reset() {
    setSeconds(0);
    setIsActive(true);
  }

  function stop() {
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  if (props.isMinuteAndSecondFormat)
    return (
      <View style={[props.style]}>
        <Text style={[styles.txt, props.textStyle]}>{handleFormatSecond(seconds)}</Text>
      </View>
    );

  if(props.warningTime) return (
    <View style={[props.style]}>
      <Text
        style={[
          styles.txt,
          seconds > props.warningTime
            ? {color: COLOR.RED}
            : {color: COLOR.BLUE},
          props.textStyle,
        ]}>
        {seconds}
      </Text>
    </View>
  );
  return <></>
}

const styles = StyleSheet.create({
  txt: {
    fontSize: 30,
    //fontWeight:'bold'
  },
});

export default forwardRef(Timer);
