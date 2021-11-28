import React, { createRef, useRef, useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  Image,
  Animated,
  Dimensions
} from 'react-native';
import { FlatList, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { COLOR } from '../../constant';
const { width, height } = Dimensions.get('screen');

const data = [
    {
        name: 'Cơ Vai',
        img: 'https://cdn.shopify.com/s/files/1/0866/7664/articles/image2_f2c3ca07-e2b8-402e-b67b-8824e6ce1a4d_2048x.jpg?v=1607671623',
        total: 5
    },
    {
        name: 'Cơ Ngực',
        img: 'https://onnitacademy.imgix.net/wp-content/uploads/2020/06/sizzlchestBIG-1333x1000.jpg',
        total: 5
    },
    {
        name: 'Tay Trước',
        img: 'https://manofmany.com/wp-content/uploads/2020/06/best-bicep-exercises.jpg',
        total: 5
    },
    {
        name: 'Tay Sau',
        img: 'https://s35247.pcdn.co/wp-content/uploads/2019/07/tw5.jpg.optimal.jpg',
        total: 5
    },
    {
        name: 'Cơ Chân',
        img: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/bring-it-all-the-way-up-here-royalty-free-image-1625750638.jpg?crop=0.601xw:0.946xh;0.397xw,0.0103xh&resize=640:*',
        total: 5
    },
    {
        name: 'Cơ Lưng Xô',
        img: 'https://www.bodybuilding.com/images/2017/december/your-blueprint-for-building-a-bigger-back-tall-v2-MUSCLETECH.jpg',
        total: 5
    },
    {
        name: 'Cơ Bụng',
        img: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/bodybuilders-abdominal-muscles-royalty-free-image-1608761464.?crop=0.668xw:1.00xh;0.332xw,0&resize=640:*',
        total: 5
    },
];

const imageW = width * 0.9;
const imageH = imageW * 1.54;

const textWrapperHeight = 50;

function CategoryScreen({navigation}) {

const scrollX = useRef(new Animated.Value(0)).current

  return (
    <View style={{flex:1, backgroundColor:COLOR.BLACK}}>
      <StatusBar backgroundColor='transparent' translucent />
      <View style={StyleSheet.absoluteFillObject}>
          {data.map((item, index) => {
            const inputRange = [
                (index - 1) * width,
                index * width,
                (index + 1) * width
            ]
            const opacity = scrollX.interpolate({
                inputRange,
                outputRange:[0, 1, 0]
            })
            return (
                <>
                <Animated.Image key={index}
                key={'image-' + index}
                style={[StyleSheet.absoluteFillObject, {opacity}]}
                key={index}
                source={{uri:item.img}}
                blurRadius={50}/>
                </>
              )
            })}
            <View style={styles.tileWrapper}>
                {data.map((item, index) => {
                    const inputRange = [
                        (index - 1) * width,
                        index * width,
                        (index + 1) * width
                    ]
                    return (
                        <Animated.Text  key={index}
                        key={index}
                        style={[styles.catName, {transform:[
                            {
                                translateY: scrollX.interpolate({
                                    inputRange:
                                    [
                                        (index - 1) * width,
                                        index * width,
                                        (index + 1) * width
                                    ],
                                    outputRange:[
                                        (index - 1) * -textWrapperHeight,
                                        index * -textWrapperHeight,
                                        (index + 1) * -textWrapperHeight
                                    ]
                                })
                            }
                        ]}
                    ]}>{item.name}</Animated.Text>
                    )
                })}
            </View>
            
      </View>

      <Animated.FlatList
      data={data}
      horizontal
      pagingEnabled
      keyExtractor = {(item, index) => index.toString()}
      renderItem = {({item, index}) => {
        const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width
        ]
        const animateTransalteX = scrollX.interpolate({
            inputRange,
            outputRange:[0, 1, 0]
        })
        return (
          <View style={[styles.imgWrapper]} key={index}>
              <TouchableWithoutFeedback >
                <Image source={{uri:item.img}} style={styles.img}/>
              </TouchableWithoutFeedback>
          </View>
      )}}
      onScroll={Animated.event([
          {nativeEvent: {contentOffset: {x: scrollX}}}
      ], {useNativeDriver: true})}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  img:{
      width:imageW,
      height:imageH,
      resizeMode:'cover',
      borderRadius:16,
      marginTop:'20%',
  },
  imgWrapper:{
      width,
      justifyContent:'center',
      alignItems:'center',
      shadowColor:COLOR.BLACK,
      shadowOpacity:1,
      shadowOffset:{
          width:0,
          height:0,
      },
      shadowRadius:20,
  },
  catName:{
      fontSize:35,
      color:COLOR.WHITE,
      width,
      textAlign:'center',
      fontWeight:'bold',
      //marginLeft:'20%',
      lineHeight:textWrapperHeight
  },
  tileWrapper:{
      //backgroundColor:'#ffffff50',
      height:textWrapperHeight,
      marginTop:'20%',
      alignItems:'center',
      overflow:'hidden',
  },
});

export default CategoryScreen;
