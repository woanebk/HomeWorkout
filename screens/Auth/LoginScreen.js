import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  Modal,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Video from 'react-native-video';
import CustomTextInput from '../../components/CustomTextInput';
import OTPVerifyModal from '../../components/OTPVerifyModal';
import {COLOR, SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constant';
import auth, {firebase} from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import {validateEmail} from '../../utilities/Utilities';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import CommandButton from '../../components/CommandButton';
import RoundButton from '../../components/RoundButton';

function LoginScreen({navigation}, route) {
  // Controls:
  const [showOTP, setShowOTP] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // Values:
  const [OTPCode, setOTPCode] = useState();
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');

  const handleLogin = () => {
    if (emailValue === '' || passwordValue === '') {
      Toast.show({
        visibilityTime: 2000,
        type: 'info',
        text1: 'Thông báo',
        text2: 'Vui lòng nhập địa chỉ email và password',
      });
    } else if (!validateEmail(emailValue)) {
      Toast.show({
        visibilityTime: 2000,
        type: 'info',
        text1: 'Thông báo',
        text2: 'Địa chỉ email không hợp lệ',
      });
    } else {
      setIsLoading(true);
      auth()
        .signInWithEmailAndPassword(emailValue, passwordValue)
        .then(() => {
          setIsLoading(false);
          navigation.navigate('Tab');
        })
        .catch(error => {
          if (error.code === 'auth/user-not-found') {
            Toast.show({
              visibilityTime: 2000,
              type: 'info',
              text1: 'Thông báo',
              text2: 'Địa chỉ email hoặc mật khẩu không xác thực',
            });
          }

          if (
            error.code ===
            'There is no user record corresponding to this identifier. The user may have been deleted.'
          ) {
            Toast.show({
              visibilityTime: 2000,
              type: 'info',
              text1: 'Thông báo',
              text2: 'Vui lòng nhập địa chỉ Email xác thực',
            });
          }

          console.debug(error);
          setIsLoading(false);
        });
    }
  };

  const onGoogleLoginPressed = async () => {
    try {
      setIsLoading(true);
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      await auth().signInWithCredential(googleCredential);

      navigation.navigate('Tab');
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const renderSignUp = () => {
    return (
      <View style={styles.signupWrapper}>
        <Text style={{color: COLOR.WHITE, fontSize: 13}}>
          Chưa có tài khoản ?{'  '}
        </Text>
        <TouchableOpacity>
          <Text
            style={{color: COLOR.WHITE, fontSize: 13, fontWeight: 'bold'}}
            onPress={async () => {
              await navigation.navigate('Survey');
            }}>
            Đăng Kí Ngay
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderForgotPasswordModal = () => {
    const [warning, setWarning] = useState('');

    const handleForgot = () => {
      if (forgotPasswordEmail === '' || !validateEmail(forgotPasswordEmail)) {
        setWarning('Vui lòng nhập địa chỉ email hợp lệ');
      } else {
        auth()
          .sendPasswordResetEmail(forgotPasswordEmail)
          .then(onForgotPasswordSucceed())
          .catch(err => {
            Toast.show({
              visibilityTime: 2000,
              type: 'info',
              text1: 'Thông báo',
              text2: 'Email chưa được đăng kí',
            });
            setShowForgotPasswordModal(false);
          });
      }
    };
    const onForgotPasswordSucceed = () => {
      setShowForgotPasswordModal(false);

      Toast.show({
        visibilityTime: 2000,
        type: 'info',
        text1: 'Thông báo',
        text2: 'Vui lòng kiểm tra email của bạn',
      });
    };
    return (
      <Modal
        onDismiss={() => {
          setForgotPasswordEmail('');
        }}
        animationType="slide"
        transparent
        statusBarTranslucent
        visible={showForgotPasswordModal}>
        <View style={{flex: 1, backgroundColor: COLOR.BLACK}}>
          <View
            style={{
              marginTop: 100,
              flex: 1,
              width: '85%',
              alignSelf: 'center',
            }}>
            <Text style={styles.titleTxt} color={COLOR.LIGHT_GREY}>
              Nhập email của bạn để lấy lại mật khẩu
            </Text>

            <CustomTextInput
              style={{alignSelf: 'center', marginTop: 40, width: '100%'}}
              value={forgotPasswordEmail}
              onChangeText={value => {
                setForgotPasswordEmail(value);
                setWarning('');
              }}
              title="Email"
              secureTextEntry={false}
              icon="envelope"
              placeholder="Nhập email"
              backgroundColor="#292D3E"
            />
            <View style={{paddingTop: 12, marginBottom: 16}}>
              <Text style={{color: '#ff0020'}}>{warning}</Text>
            </View>
            <CommandButton
              style={{width: '80%', height: 50, alignSelf: 'center'}}
              title="Xác nhận"
              onPress={() => {
                handleForgot();
              }}
            />
          </View>

          <RoundButton
            icon="close"
            buttonWidth={25}
            buttonHeight={25}
            size={10}
            style={{position: 'absolute', right: 40, top: 50}}
            onPress={() => {
              setShowForgotPasswordModal(false);
            }}
          />
        </View>
      </Modal>
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
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
      {/*<Image style={styles.logo} source={require('../../assets/dumbell.jpg')} />*/}
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 0.85}}
        colors={[COLOR.TRANSPARENT, COLOR.BLACK]}
        style={styles.linearGradient}>
        <CustomTextInput
          style={styles.textinput}
          value={emailValue}
          onChangeText={setEmailValue}
          title="Email"
          icon="envelope"
          placeholder="Nhập Email để đăng nhập"
        />
        <CustomTextInput
          isPassword
          style={{alignSelf: 'center', marginTop: 30, width: '85%'}}
          value={passwordValue}
          onChangeText={setPasswordValue}
          title="Mật khẩu"
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
              marginTop: 30,
              fontWeight: 'bold',
            }}
            onPress={() => {
              setShowForgotPasswordModal(true);
            }}>
            Quên mật khẩu?
          </Text>
        </TouchableOpacity>
        <Text style={styles.orTxt}>- HOẶC -</Text>

        <TouchableOpacity
          style={styles.facebookBtn}
          onPress={onGoogleLoginPressed}>
          <Image
            resizeMode="cover"
            style={styles.google}
            source={require('../../assets/images/google_icon.png')}
          />
        </TouchableOpacity>
      </LinearGradient>
      {renderSignUp()}
      {renderForgotPasswordModal()}
      <OTPVerifyModal
        code={OTPCode}
        visible={showOTP}
        onPressClose={() => setShowOTP(false)}
        onConfirm={() => {}}
      />
      {isLoading && (
        <View style={styles.loading}>
          <ActivityIndicator size={100} color={COLOR.WHITE} />
        </View>
      )}
    </KeyboardAvoidingView>
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
    height: '85%',
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
  google: {
    width: 34,
    height: 34,
    borderRadius: 40,
    marginTop: 0,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginTop: 200,
  },
  loading: {
    position: 'absolute',
    backgroundColor: '#18151090',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleTxt: {
    color: COLOR.WHITE,
  },
});

export default LoginScreen;
