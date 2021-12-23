import React, {useState, useEffect, useRef} from 'react';
import {
  Image,
  Text,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {COLOR, LEVEL_MAP, SCREEN_WIDTH} from '../../constant';
import PagerView from 'react-native-pager-view';
import LottieView from 'lottie-react-native';
import CommandButton from '../../components/CommandButton';
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import {generateNumberRangeArray, validateEmail} from '../../utilities/Utilities';
import {Icon} from 'react-native-elements';
import CustomTextInput from '../../components/CustomTextInput';
import auth, {firebase} from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import { updateUserInfo } from '../../utilities/FirebaseDatabase';

const HEIGHT_RANGE = generateNumberRangeArray(1, 300);
const WEIGHT_RANGE = generateNumberRangeArray(1, 500);


function SurveyScreen({navigation, route}) {
  const [selectedGender, setSelectedGender] = useState('Nam');
  const [selectedHeight, setSelectedHeight] = useState(160);
  const [selectedWeight, setSelectedWeight] = useState(50);
  const [selectedLevel, setSelectedLevel] = useState(LEVEL_MAP[0].name);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const [valueEmail, setValueEmail] = useState('');
  const [valuePassword, setValuePassword] = useState('');
  const [valuePasswordConfirm, setValuePasswordConfirm] = useState('');
  const [valueName, setValueName] = useState('');

  const pagerViewRef = useRef();

  const handleSignUp = () => {
      console.log(valueEmail)
      console.log(valuePassword)
      console.log(valuePasswordConfirm)

    if (valueEmail === '' || valuePassword === '' || valueName === '') {
      alert(
        'Vui lòng nhập đầy đủ thông tin',
      );
    } else if (valuePassword != valuePasswordConfirm)
      alert(
        'Mật khẩu không giống',
      );
      else if (!validateEmail(valueEmail))
      alert(
        'Email không hợp lệ',
      );
      else if (valuePassword?.length < 6)
      alert(
        'Mật khẩu phải chứa ít nhất 6 kí tự',
      );
    else {
      console.debug('đăng kí');
      auth()
        .createUserWithEmailAndPassword(valueEmail, valuePasswordConfirm)
        .then((userCredential) => {
            updateInfo(userCredential.user.uid)
            console.log(userCredential)
            console.log(userCredential.user.uid)
            Toast.show({
                type: 'info',
                text1: 'Thông báo',
                text2: 'Tạo tài khoản thành công',
              });
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.debug('That email address is already in use!');
            Toast.show({
                type: 'error',
                text1: 'Thông báo',
                text2: 'Địa chỉ email này đã được sử dụng',
              });
          }

          if (error.code === 'auth/invalid-email') {
            alert(
              'Vui lòng nhập địa chỉ Email xác thực',
            );
          }

          console.debug(error);
        });
    }
  };

  const updateInfo = async (id) => {
    const data = {
        height: selectedHeight,
        weight: selectedWeight,
        level: selectedLevel,
        gender: selectedGender,
        name: valueName
    }
    await updateUserInfo(id, data)
  }

  const renderWelcome = () => {
    return (
      <View style={{flex: 1}} key="1">
        <LottieView
          style={styles.animation}
          source={require('../../assets/lottie/workout-survey.json')}
          autoPlay
          loop></LottieView>
        <View style={styles.contentWrapper}>
          <Text style={styles.title}>Khảo sát</Text>
          <Text style={styles.subTitle}>
            Hãy trả lời một số câu hỏi để chúng tớ có thể đem lại cho bạn một
            trải nghiệm tốt nhất nhé
          </Text>
        </View>
        <View style={{alignSelf: 'center', position: 'absolute', bottom: 40}}>
          <CommandButton
            title="Tiến hành khảo sát"
            hasRightIcon
            style={styles.commandBtn}
            backgroundColor={COLOR.GOLD}
            onPress={() => {
              pagerViewRef?.current?.setPage(1);
            }}
          />
        </View>
      </View>
    );
  };

  const renderGenderItem = value => {
    const isSelected = value === selectedGender;
    return (
      <TouchableOpacity onPress={() => setSelectedGender(value || '')}>
        <View
          style={[
            {
              width: 140,
              height: 200,
              backgroundColor: COLOR.GREY,
              borderRadius: 7,
              alignItems: 'center',
            },
            isSelected && {borderColor: COLOR.GOLD, borderWidth: 6},
          ]}>
          {value === 'Nam' ? (
            <LottieView
              style={{width: 140}}
              source={require('../../assets/lottie/male.json')}
              autoPlay
              loop></LottieView>
          ) : (
            <LottieView
              style={{width: 140}}
              source={require('../../assets/lottie/female.json')}
              autoPlay
              loop></LottieView>
          )}
          <Text style={[styles.title]}>{value || ''}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderGender = () => {
    return (
      <View key="2">
        <View style={styles.contentWrapper}>
          <Text style={styles.title}>Giới tính của bạn </Text>
        </View>
        <View style={styles.contentWrapperHorizontal}>
          {renderGenderItem('Nam')}
          {renderGenderItem('Nữ')}
        </View>
        <View style={{alignSelf: 'center', position: 'absolute', bottom: 40}}>
          <CommandButton
            title="Tiếp theo"
            hasRightIcon
            style={styles.commandBtn}
            backgroundColor={COLOR.GOLD}
            onPress={() => {
              pagerViewRef?.current?.setPage(2);
            }}
          />
        </View>
      </View>
    );
  };

  const renderHeightWeight = () => {
    return (
      <View key="3">
        <View style={styles.contentWrapper}>
          <Text style={styles.title}>Thể trạng hiện tại </Text>
        </View>
        <View style={styles.contentWrapperHorizontal}>
          <View>
            <Text style={[styles.subTitle, {fontWeight: 'bold'}]}>
              Chiều cao (Cm)
            </Text>
            <ScrollView>
              <ScrollPicker
                dataSource={HEIGHT_RANGE}
                selectedIndex={selectedHeight - 1}
                renderItem={(data, index) => {
                  return (
                    <Text style={{fontWeight: 'bold', color: COLOR.WHITE}}>
                      {data}
                    </Text>
                  );
                }}
                onValueChange={(data, selectedIndex) => {
                  setSelectedHeight(data);
                }}
                //wrapperHeight={170}
                wrapperWidth={150}
                wrapperColor={COLOR.TRANSPARENT}
                itemHeight={60}
                highlightColor="#d8d8d8"
                highlightBorderWidth={2}
                activeItemTextStyle={{color: COLOR.BLUE}}
              />
            </ScrollView>
          </View>

          <View>
            <Text style={[styles.subTitle, {fontWeight: 'bold'}]}>
              Cân nặng (Kg)
            </Text>
            <ScrollView>
              <ScrollPicker
                dataSource={WEIGHT_RANGE}
                selectedIndex={selectedWeight - 1}
                renderItem={(data, index) => {
                  return (
                    <Text style={{fontWeight: 'bold', color: COLOR.WHITE}}>
                      {data}
                    </Text>
                  );
                }}
                onValueChange={(data, selectedIndex) => {
                  setSelectedWeight(data);
                }}
                //wrapperHeight={180}
                wrapperWidth={150}
                wrapperColor={COLOR.TRANSPARENT}
                itemHeight={60}
                highlightColor={COLOR.WHITE}
                highlightBorderWidth={2}
                activeItemTextStyle={{color: COLOR.RED}}
              />
            </ScrollView>
          </View>
        </View>
        <View style={{alignSelf: 'center', position: 'absolute', bottom: 40}}>
          <CommandButton
            title="Tiếp theo"
            hasRightIcon
            style={styles.commandBtn}
            backgroundColor={COLOR.GOLD}
            onPress={() => {
              pagerViewRef?.current?.setPage(3);
            }}
          />
        </View>
      </View>
    );
  };

  const renderLevelItem = item => {
    const isSelected = item?.name === selectedLevel;
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedLevel(item?.name);
        }}>
        <View
          style={{
            width: '90%',
            height: 100,
            borderRadius: 7,
            padding: 10,
            borderWidth: 3,
            flexDirection: 'row',
            borderColor: isSelected ? COLOR.GOLD : COLOR.LIGHT_GREY,
            marginBottom: 15,
          }}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.levelName}>{item?.name}</Text>
            <Text style={styles.levelDesTxt}>{item?.description}</Text>
          </View>
          <View
            style={{width: 50, justifyContent: 'center', alignItems: 'center'}}>
            {isSelected && (
              <Icon
                name="check"
                type="material-community"
                size={25}
                color={COLOR.GOLD}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderLevel = () => {
    return (
      <View key="4">
        <View style={[styles.contentWrapper, {paddingHorizontal: 20}]}>
          <Text style={styles.title}>
            Bạn đã có kinh nghiệm luyện tập chưa ?{' '}
          </Text>
        </View>
        <View style={styles.contentWrapperVertical}>
          {LEVEL_MAP?.map(item => renderLevelItem(item))}
        </View>
        <View style={{alignSelf: 'center', position: 'absolute', bottom: 40}}>
          <CommandButton
            title="Tiếp theo"
            hasRightIcon
            style={styles.commandBtn}
            backgroundColor={COLOR.GOLD}
            onPress={() => {
              pagerViewRef?.current?.setPage(4);
            }}
          />
        </View>
      </View>
    );
  };
  const renderTag = () => {
    return (
      <View key="5">
        <View style={[styles.contentWrapper, {paddingHorizontal: 20}]}>
          <Text style={styles.title}>
            Lựa chọn những mục tiêu của bạn{' '}
          </Text>
        </View>
        <View style={styles.contentWrapperVertical}>

        </View>
        <View style={{alignSelf: 'center', position: 'absolute', bottom: 40}}>
          <CommandButton
            title="Tiếp theo"
            hasRightIcon
            style={styles.commandBtn}
            backgroundColor={COLOR.GOLD}
            onPress={() => {
                pagerViewRef?.current?.setPage(5);
            }}
          />
        </View>
      </View>
    );
  };

  const renderSignUp = () => {
    return (
      <View key="6">
        <View style={[styles.contentWrapper, {paddingHorizontal: 20}]}>
          <Text style={styles.title}>
            Nhập thông tin tài khoản{' '}
          </Text>
        </View>
        <View style={[styles.contentWrapperVertical,{marginTop:0}]}>
        <CustomTextInput
          style={styles.textinput}
          value={valueName}
          onChangeText={setValueName}
          marginTop="20"
          title="Tên của bạn"
          icon="circle"
          placeholder="Nhập tên của bạn"
        />
        <CustomTextInput
          style={styles.textinput}
          value={valueEmail}
          onChangeText={setValueEmail}
          title="Email"
          icon="envelope"
          placeholder="Nhập Email để đăng kí"
        />
        <CustomTextInput
          style={styles.textinput}
          value={valuePassword}
          onChangeText={setValuePassword}
          title="Mật khẩu"
          secureTextEntry={true}
          icon="circle"
          placeholder="Nhập mật khẩu"
        />
        <CustomTextInput
          style={styles.textinput}
          value={valuePasswordConfirm}
          onChangeText={setValuePasswordConfirm}
          marginTop="20"
          secureTextEntry={true}
          title="Xác nhận mật khẩu"
          icon="circle"
          placeholder="Nhập Lại mật khẩu"
        />
        </View>
        <View style={{alignSelf: 'center', position: 'absolute', bottom: 40}}>
          <CommandButton
            title="Hoàn tất đăng kí"
            hasRightIcon
            style={styles.commandBtn}
            backgroundColor={COLOR.GOLD}
            rightIcon='check-circle'
            onPress={() => {
              handleSignUp()
            }}
          />
        </View>
      </View>
    );
  };

  const renderProgressBar = () => {
      const LIST = generateNumberRangeArray(0,5)
    return (
      <View >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 20,
            justifyContent: 'space-between',
            paddingHorizontal: 16,
          }}>
          {LIST.map((item, index) => {
            return (
              <View
                style={{
                  height: 4,
                  borderRadius: 3,
                  backgroundColor:
                    currentIndex >= index
                      ? COLOR.WHITE
                      : COLOR.GREY,
                  width: 95 / LIST?.length + '%',
                }}></View>
            );
          })}
        </View>
      </View>
    );
  };
  return (
    <ImageBackground
      blurRadius={5}
      style={{flex: 1}}
      source={{
        uri: 'https://media.istockphoto.com/photos/blood-sport-picture-id535030483?k=20&m=535030483&s=612x612&w=0&h=R6tL4syr1pA5MJDpu5VG54B3sqVMRygcoN6Eu3505wo=',
      }}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"></StatusBar>
      <View
        style={{
          height: 150,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {renderProgressBar()}
      </View>
      <PagerView
        ref={pagerViewRef}
        style={styles.container}
        initialPage={0}
        transitionStyle="scroll"
        onPageSelected={e => {setCurrentIndex(e.nativeEvent.position)}}
        showPageIndicator>
        {renderWelcome()}
        {renderGender()}
        {renderHeightWeight()}
        {renderLevel()}
        {renderTag()}
        {renderSignUp()}
      </PagerView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: COLOR.LIGHT_MATTE_BLACK,
  },
  animation: {
    width: 250,
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 50,
  },
  title: {
    color: COLOR.WHITE,
    fontSize: 30,
    fontWeight: 'bold',
  },
  contentWrapper: {
    alignItems: 'center',
    marginTop: 0,
    paddingHorizontal: 70,
  },
  subTitle: {
    color: COLOR.WHITE,
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
    lineHeight: 30,
  },
  commandBtn: {
    height: 50,
    color: COLOR.GOLD,
    width: SCREEN_WIDTH * 0.8,
  },
  contentWrapperHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 50,
  },
  contentWrapperVertical: {
    marginTop: 50,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  levelName: {
    color: COLOR.WHITE,
    fontSize: 18,
    fontWeight: 'bold',
  },
  levelDesTxt: {
    color: COLOR.LIGHT_GREY,
    fontSize: 14,
    marginTop: 5,
  },
  textinput: {
    alignSelf: 'center',
    marginTop: 50,
    width: '85%',
  },
});

export default SurveyScreen;
