import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import {
    Text,
    StyleSheet,
    View,
    Modal,
  } from 'react-native';
import {COLOR} from '../constant'
import LottieView from 'lottie-react-native';

function ModalIconDone(props, ref) {

    useImperativeHandle(ref, () => ({
        // each key is connected to `ref` as a method name
        // they can execute code directly, or call a local method
        start: () => { start() },
      }))

    const [isShow, setIsShow] = useState(false)

    const animation = useRef(null)

    useEffect(()=>{
        animation?.current?.play(0, 60)
    },[])

    const start = () => {
        setIsShow(true);
        const display = setTimeout(()=>{
            setIsShow(false)
            clearTimeout(display);
            props?.onHide()
        },props?.timeOut || 1000)
    }

    return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={isShow}
        onRequestClose={() => {
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <LottieView
                 style={styles.icon} 
                 ref={animation}
                 source={require('../assets/lottie/done_animation.json')} 
                 autoPlay={true} loop={false} />
          </View>
        </View>
      </Modal>
    );
  }
  
  const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        //backgroundColor:COLOR.BLACK
      },
      modalView: {
        //backgroundColor: "white",
        borderRadius: 20,
        alignItems: "center",
      },
      icon:{
          width:120,
          height:120,
          marginTop:-70
      },
  });
  
  export default forwardRef(ModalIconDone);