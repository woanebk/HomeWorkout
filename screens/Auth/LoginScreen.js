import React, {useState, useRef} from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Text,
  TextInput,
  StatusBar,
  Animated,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {baseProps} from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';
import LinearGradient from 'react-native-linear-gradient';
import Video from 'react-native-video';
import CustomTextInput from '../../components/CustomTextInput';
import OTPVerifyModal from '../../components/OTPVerifyModal';
import {COLOR, SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constant';
import SingUpModal from '../../components/SignUpModal';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import auth, { firebase } from '@react-native-firebase/auth';
function LoginScreen({navigation}, route) {
  const [showOTP, setShowOTP] = useState(false);
  const [OTPCode, setOTPCode] = useState();
  const [text, onChangeText] = useState('');
  const [valueEmail, setValueEmail] = useState('');
  const [valuePassword, setValuePassword] = useState('');
  const [valuePasswordConfirm, setValuePasswordConfirm] = useState('');

  const handleSignUp= () => {
    console.debug('đăng kí')

    if (valuePassword != valuePasswordConfirm)
      Alert.alert(
        '',
        //body
        'Mật khẩu không giống',
      )
      else {
      console.debug('đăng kí')
      auth()
      .createUserWithEmailAndPassword(valueEmail, valuePasswordConfirm)
      .then(() => {
        Alert.alert(
          '',
          //body
          'Tạo tài khoản thành công và đăng nhập',
        );
        console.debug('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.debug('That email address is already in use!');
          Alert.alert(
            '',
            //body
            'Địa chỉ email này đã được sử dụng',
          );
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert(
            '',
            //body
            'Vui lòng nhập địa chỉ Email xác thực',
          );
        }

        console.debug(error);
      });}
  };
  const handleLogin = () => {
    dosomething();
  };
  const dosomething = () => {   
    auth()
    .signInWithEmailAndPassword(valueEmail, valuePassword)
    .then(() => {
      Alert.alert(
        '',
        //body
        'Đăng nhập thành công',
      );
      console.debug('User account created & signed in!');
    })
    .catch(error => {
      if (error.code === 'auth/user-not-found') {
        console.debug('The password is invalid or the user does not have a password.');
        Alert.alert(
          '',
          //body
          'Địa chỉ email hoặc mật khẩu không xác thực',
        );
      }

      if (error.code === 'There is no user record corresponding to this identifier. The user may have been deleted.') {
        Alert.alert(
          '',
          //body
          'Vui lòng nhập địa chỉ Email xác thực',
        );
      }

      console.debug(error);
    });
  };

  const onLoginSuccess = () => {
    this.setState({
      error: '',
      loading: false,
    });
  };
  const [visibleRegister, setVisibleRegister] = useState(false);

  const showDialog = () => {
    setVisibleRegister(true);
  };

  const renderSignUp = () => {
    return (
      <View style={styles.signupWrapper}>
        <Text style={{color: COLOR.WHITE, fontSize: 13}}>
          Chưa có tài khoản ?{' '}
        </Text>
        <TouchableOpacity>
          <Text
            style={{color: COLOR.WHITE, fontSize: 13, fontWeight: 'bold'}}
            onPress={() => setVisibleRegister(true)}>
            Đăng Kí Ngay
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"></StatusBar>
      <Video
        style={styles.video}
        muted
        repeat
        resizeMode="cover"
        source={require('../../assets/video/login_video.mp4')}
      />
      {/* <Image style={styles.logo} source={require('../../assets/dumbell.jpg')} /> */}
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 0.85}}
        colors={[COLOR.TRANSPARENT, COLOR.BLACK]}
        style={styles.linearGradient}>
          <CustomTextInput
          style={styles.textinput}
          value={valueEmail}
          onChangeText={setValueEmail}
          title="Email"
          icon="envelope"
          placeholder="Nhập Email để đăng nhập"
          keyboardType="numeric"
        />
        <CustomTextInput
          style={{alignSelf: 'center',
    marginTop: 30,
    width: '85%',}}
          value={valuePassword}
          onChangeText={setValuePassword}
          title="Mật khẩu"
          secureTextEntry={true}
          icon="circle"
          placeholder="Nhập mật khẩu"
        />
        <TouchableOpacity style={styles.commandBtn}>
          <Text style={styles.commandTxt} onPress={() => handleLogin()}>
            Đăng nhập
          </Text>
        </TouchableOpacity>
        <Text style={styles.orTxt}>- HOẶC -</Text>
        <TouchableOpacity
          style={styles.facebookBtn}
          onPress={() => navigation.navigate('Tab')}>
          <Image
            resizeMode="cover"
            style={styles.facebook}
            source={require('../../assets/facebook-icon.jpg')}
          />
        </TouchableOpacity>
      </LinearGradient>
      {renderSignUp()}
      <OTPVerifyModal
        code={OTPCode}
        visible={showOTP}
        onPressClose={() => setShowOTP(false)}
        onConfirm={() => {}}
      />
      <SingUpModal
        visible={visibleRegister}
        onPressClose={() => setVisibleRegister(false)}
        onPressSignUp={()=> {handleSignUp()}}
        valueEmail={valueEmail}
        setValueEmail={setValueEmail}

        valuePassword={valuePassword}
        setValuePassword={setValuePassword}

       valuePasswordConfirm={valuePasswordConfirm}
        setValuePasswordConfirm={setValuePasswordConfirm}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.MATTE_BLACK,
  },
  video: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    position: 'absolute',
    // backgroundColor:COLOR.BLACK,
    // opacity:0.9
  },
  linearGradient: {
    height: '80%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  textinput: {
    alignSelf: 'center',
    marginTop: 300,
    width: '85%',
  },
  commandBtn: {
    backgroundColor: '#ffcc00',
    marginTop: 30,
    height: 50,
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },
  commandTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
  },
  signupWrapper: {
    position: 'absolute',
    bottom: 5,
    marginLeft: '23%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  orTxt: {
    color: COLOR.WHITE,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 20,
  },
  facebookBtn: {
    alignSelf: 'center',
    marginTop: 30,
  },
  facebook: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginTop: 200,
  },
});

export default LoginScreen;
