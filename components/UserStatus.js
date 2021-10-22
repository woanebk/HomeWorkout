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

function UserStatus(props) {

    const defaultPfp='https://media.istockphoto.com/vectors/user-profile-icon-vector-avatar-portrait-symbol-flat-shape-person-vector-id1270368615?k=20&m=1270368615&s=170667a&w=0&h=qpvA8Z6L164ZcKfIyOl-E8fKnfmRZ09Tks7WEoiLawA='

    return (
      <View style={[styles.container,props.style?props.style:{}]}>
          <LinearGradient
          style={styles.linearGradient}
          start={{x:0.0, y:0.0}}
          end={{x:0.4, y:0.8}}
          colors={[COLOR.LIGHT_BROWN, COLOR.GOLD, COLOR.DARK_BROWN, COLOR.BLACK]}
          locations={[0.1, 0.2, 0.4, 0.5]}
          >
              <View style={{flexDirection:'row', paddingLeft:10, paddingTop:5}}>
                <Image 
                style={styles.pfp}
                resizeMode='cover'
                source={props.image?props.image:{uri:defaultPfp}}
                ></Image>
                <View style={{marginLeft:20}}>
                    <Text style={[styles.nameTxt,{fontSize:13}]}>Đào Duy Nam</Text>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Icon
                        name='heart'
                        type='ionicon'
                        size={18}
                        color={COLOR.WHITE}/>
                        <Text style={[styles.nameTxt, {fontSize:12}]}> BMI: 2.0</Text>
                    </View>
                </View>
              </View>

              <View style={{marginLeft:60, marginTop:-8}}>
                  <Text style={styles.desTxt}>CÂN NẶNG HIỆN TẠI: 63 KG</Text>
                  <Text style={styles.desTxt}>CHIỀU CAO HIỆN TẠI: 173 CM</Text>
              </View>

              <View style={styles.btnWrapper}>
                <TouchableOpacity style={styles.btn} onPress={props.onPress?props.onPress:()=>{}}>
                    <Icon
                    name='analytics-outline'
                    type='ionicon'
                    size={27}
                    color={COLOR.LIGHT_BLUE_2}/>
                    <Text style={[styles.btnTxt,{marginLeft:5}]}>Cập nhật thông số ngay</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container:{
        height:135,
        backgroundColor:COLOR.MATTE_BLACK,
        borderRadius:10,
        elevation:5
    },
    linearGradient:{
        flex:1,
        width:'100%',
        borderRadius:10,
    },
    pfp:{
        width:50,
        height:50,
        borderRadius:70
    },
    nameTxt:{
        color:COLOR.WHITE,
        fontWeight:'bold'
    },
    desTxt:{
        color:COLOR.WHITE,
        fontSize:13
    },
    btnWrapper:{
        height:40,
        backgroundColor:COLOR.WHITE,
        borderRadius:5,
        width:'95%',
        alignSelf:'center',
        position:'absolute',
        bottom:8,
        backgroundColor:'#b5d3e7',
    },
    btn:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        paddingTop:5
    },
    btnTxt:{
        color:COLOR.LIGHT_BLUE_2,
        fontSize:17,
        fontWeight:'bold',
        textAlign:'center'
    },
  });
  
  export default UserStatus;