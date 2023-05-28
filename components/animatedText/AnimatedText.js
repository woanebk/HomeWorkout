import React, {useEffect, useRef} from 'react';
import {Animated, Text} from 'react-native';

const AnimatedText = ({
  children,
  style,
  timing = 600,
  xSlideStart = 30,
  ySlideStart = 30,
  fadeIn = true,
  props,
}) => {
  const verticalSlideAnim = useRef(new Animated.Value(ySlideStart)).current;
  const horizontalSlideAnim = useRef(new Animated.Value(xSlideStart)).current;

  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // reset :
    verticalSlideAnim.setValue(ySlideStart);
    horizontalSlideAnim.setValue(xSlideStart);
    opacityAnim.setValue(0);
    //
    Animated.timing(verticalSlideAnim, {
      toValue: 0,
      duration: timing, // Adjust the duration as per your preference
      useNativeDriver: true,
    }).start();

    Animated.timing(horizontalSlideAnim, {
      toValue: 0,
      duration: timing, // Adjust the duration as per your preference
      useNativeDriver: true,
    }).start();

    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: timing, // Adjust the duration as per your preference
      useNativeDriver: true,
    }).start();
  }, [children]);

  return (
    <Animated.View
      style={{
        opacity: fadeIn ? opacityAnim : 1,
        transform: [
          {translateY: verticalSlideAnim},
          {translateX: horizontalSlideAnim},
        ],
      }}>
      <Text {...props} style={style}>
        {children}
      </Text>
    </Animated.View>
  );
};

export default AnimatedText;
