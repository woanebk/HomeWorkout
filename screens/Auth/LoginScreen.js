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
import LinearGradient from 'react-native-linear-gradient';
import Video from 'react-native-video';
import CustomTextInput from '../../components/CustomTextInput';
import OTPVerifyModal from '../../components/OTPVerifyModal';
import {COLOR, SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constant';
import SingUpModal from '../../components/SignUpModal';
import auth, {firebase} from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import Toast from 'react-native-toast-message';
import { validateEmail } from '../../utilities/Utilities';

function LoginScreen({navigation}, route) {
  const [showOTP, setShowOTP] = useState(false);
  const [OTPCode, setOTPCode] = useState();
  const [text, onChangeText] = useState('');
  const [valueEmail, setValueEmail] = useState('');
  const [valuePassword, setValuePassword] = useState('');
  const [valuePasswordConfirm, setValuePasswordConfirm] = useState('');

  //#region Forgotpass
  const handleForgot = () => {
    console.debug('đăng kí');

    if (valueEmail == '' || !validateEmail(valueEmail)) {
      Alert.alert(
        '',
        //body
        'Vui lòng nhập địa chỉ email hợp lệ',
      );
    }
     else
      auth()
        .sendPasswordResetEmail(valueEmail)
        .then(onforgotSuccess())
        .catch(err => {
          Alert.alert(
            err.message,
            //body
            'Vui lòng nhập địa chỉ email',
          );
        });
  };
  const onforgotSuccess = () => {
    Alert.alert(
      '',
      //body
      'Vui lòng kiểm tra email của bạn',
    );
  };
  //#endregion
  //#region Login
  const handleLogin = () => {
    dosomething();
  };
  const dosomething = () => {
    if (valueEmail == '' || valuePassword == '') {
      Alert.alert(
        '',
        //body
        'Vui lòng nhập địa chỉ email và password',
      );
    } else if (!validateEmail(valueEmail)) {
      Alert.alert(
        '',
        //body
        'Địa chỉ email không hợp lệ',
      );
    } else
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
            console.debug(
              'The password is invalid or the user does not have a password.',
            );
            Alert.alert(
              '',
              //body
              'Địa chỉ email hoặc mật khẩu không xác thực',
            );
          }

          if (
            error.code ===
            'There is no user record corresponding to this identifier. The user may have been deleted.'
          ) {
            Alert.alert(
              '',
              //body
              'Vui lòng nhập địa chỉ Email xác thực',
            );
          }

          console.debug(error);
        });
  };
  //#endregion
  //#region FaceBook
  async function onFacebookButtonPress() {
    // Attempt login with permissions
    LoginManager.logOut();
    console.debug('đăng kí');
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
    console.debug('mở lên dc rồi');

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }
  //#endregion
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
  //#region Render
  const renderSignUp = () => {
    return (
      <View style={styles.signupWrapper}>
        <Text style={{color: COLOR.WHITE, fontSize: 13}}>
          Chưa có tài khoản ?{' '}
        </Text>
        <TouchableOpacity>
          <Text
            style={{color: COLOR.WHITE, fontSize: 13, fontWeight: 'bold'}}
            onPress={() => navigation.navigate('Survey')}>
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
        source={require('../../assets/video/Intro.mp4')}
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
          style={{alignSelf: 'center', marginTop: 30, width: '85%'}}
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
        <TouchableOpacity>
          <Text
            style={{
              color: COLOR.WHITE,
              alignSelf: 'center',
              textAlign: 'center',
              marginTop: 10,
              fontWeight: 'bold',
            }}
            onPress={() => handleForgot()}>
            Quên mật khẩu?
          </Text>
        </TouchableOpacity>
        <Text style={styles.orTxt}>- HOẶC -</Text>

        <TouchableOpacity
          style={styles.facebookBtn}
          onPress={() =>
            onFacebookButtonPress().then(() =>
              console.log('Signed in with Facebook!'),
            )
          }>
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
    </View>
  );
}
//#endregion
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
    marginTop: 20,
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
    bottom: 10,
    marginLeft: '23%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  orTxt: {
    color: COLOR.WHITE,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 5,
  },
  facebookBtn: {
    alignSelf: 'center',
    marginTop: 10,
  },
  facebook: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginTop: 0,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginTop: 200,
  },
});

export default LoginScreen;
