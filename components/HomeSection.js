import React, { useEffect, useRef, useState } from 'react';
import {
    Text,
    Image,
    StyleSheet,
    View,
  } from 'react-native';
import {COLOR} from '../constant'
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';

function HomeSection(props) {

    return (
        <View style={styles.section}>
            <Text style={styles.sectionTxt}>{props.title}</Text>
            {!props?.hideButton && (
              <TouchableOpacity onPress={props.onPress?props.onPress:()=>{}} style={{flexDirection:'row'}}>
              <Text style={{color:COLOR.LIGHT_GOLD}}>Xem Thêm</Text>
              <Icon
              name='chevron-forward-outline'
              type='ionicon'
              size={18}
              color={COLOR.LIGHT_GOLD}/>
              </TouchableOpacity>
            )}
        </View>
    );
  }
  
  const styles = StyleSheet.create({
    section:{
        height:25,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:10,
        justifyContent:'space-between',
    },
    sectionTxt:{
        fontSize:18,
        fontWeight:'bold',
        color:COLOR.WHITE
    },
  });
  
  export default HomeSection;