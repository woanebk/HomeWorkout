import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, StatusBar, Alert, ScrollView,Modal} from 'react-native';
import {Icon} from 'react-native-elements';

import auth, {firebase} from '@react-native-firebase/auth';
import RoundButton from '../components/RoundButton';
import {COLOR} from '../constant';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  generateNewExercise,
  generateNewWorkout,
} from '../utilities/FirebaseDatabase';
import PureChart from 'react-native-pure-chart';
const data = [{value: 50}, {value: 80}, {value: 90}, {value: 70}];
import CustomTextInput from '../components/CustomTextInput';
import CommandButton from '../components/CommandButton';
import {updateBMIInfo, getUserInfo} from '../utilities/FirebaseDatabase';
import {
  convertObjectToArrayWithoutKey,
  convertObjectToArrayWithoutKeySort,
} from '../utilities/Utilities';
import UserStatus from '../components/UserStatus';

const onPressSignOut = () => {
  auth()
    .signOut()
    .then(() =>
      Alert.alert(
        '',
        //body
        'Đăng xuất thành công',
      ),
    );
};

function ProfileScreen() {
  const sampleData = [
    {x: '2018-01-01', y: 18},
    {x: '2018-01-02', y: 20},
    {x: '2018-01-03', y: 17},
    {x: '2018-01-04', y: 29},
    {x: '2018-01-05', y: 15},
  ];
  const [valueHeigh, setValueHeigh] = useState('');
  const [valueWeight, setValueWeight] = useState('');
  const [user, setUser] = useState({abc: 'abc'});
  const [listBMI, setListBMI] = useState(sampleData);
  const [visible, setVisible] = useState(false);
  const [valueName, setValueName] = useState('');

  useEffect(async () => {
    await initUser();
    await initBMI();
  }, []);

  const initUser = async () => {
    var res = await getUserInfo();
    console.log(res);
    setUser(res.val());
    setValueHeigh(res.val().heigh.toString());
    setValueWeight(res.val().weight.toString());
    setValueName(res.val().name.toString());

    
    console.log(convertObjectToArrayWithoutKey(res.val().listBMI));
    setListBMI(convertObjectToArrayWithoutKeySort(res.val().listBMI));
  };
  const initBMI = async () => {
    // getUserInfo()
  };
  const handleUpdateBMI = async () => {
    if (valueHeigh == '' || valueWeight == '')
      Alert.alert(
        '',
        //body
        'Vui lòng nhập lại cân nặng và chiều cao',
      );
    else if (!parseInt(valueHeigh) || !parseInt(valueWeight))
      Alert.alert(
        '',
        //body
        'Vui lòng nhập lại cân nặng và chiều cao',
      );
    else {
      console.log('update');
      await updateBMIInfo(parseInt(valueHeigh), parseInt(valueWeight))
        .then(async () => {
          Alert.alert(
            '',
            //body
            'Cập nhật thành công',
          );
          await initUser();
        })
        .catch(er => {
          Alert.alert(
            '',
            //body
            'Vui lòng thử lại',
          );
        });
    }
  };
  const renderAdminButton = () => {
    return (
      <View>
        <Text style={{color: COLOR.WHITE}}>Đừng nhấn lung tung nha</Text>
        <TouchableOpacity
          style={{
            height: 50,
            backgroundColor: COLOR.WHITE,
            justifyContent: 'center',
            padding: 10,
            marginTop: 20,
          }}
          onPress={() => {
            generateNewExercise();
          }}>
          <Text>Generate Exercise</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 50,
            backgroundColor: COLOR.WHITE,
            justifyContent: 'center',
            padding: 10,
            marginTop: 20,
          }}
          onPress={() => {
            generateNewWorkout();
          }}>
          <Text>Generate Workout</Text>
        </TouchableOpacity>
      </View>
    );
  };
  //#region  render
  return (
    <ScrollView style={{flex: 1, backgroundColor: COLOR.MATTE_BLACK}}>
      {/* {renderAdminButton()} */}
      <StatusBar
        backgroundColor="transparent"
        translucent
        style={{height: 50}}
      />
      <View style={{marginTop: 100}}>
        <Text
          style={{
            position: 'absolute',
            color: COLOR.MATTE_BLACK,
            fontSize: 20,
            marginLeft: 0,
            marginBottom: 10,
            width: 200,
            borderBottomRightRadius: 20,
            borderTopRightRadius: 20,
            paddingLeft: 10,
            backgroundColor: COLOR.GOLD,
          }}>
          Chỉ Số Của Bạn
        </Text>
      </View>
      <UserStatus height={user.heigh} weight={user.weight} name={user.name} bmi={user.weight && user.heigh
              ? Math.round((user.weight / user.heigh / user.heigh) * 1000000) /
                100
              : '---'} onPress={()=>setVisible(true)}/>
      <View style={{flex: 1, marginTop: 10}}>
        <PureChart
          data={listBMI}
          type="line"
          style={{flex: 1}}
          backgroundColor={COLOR.LIGHT_BLUE}
          width={'100%'}
          height={200}
          numberOfYAxisGuideLine={5}
          Alert="you sh"
        />
      </View>
      <View
        style={{
          flex: 1,
          marginTop: 30,
          backgroundColor: COLOR.MATTE_BLACK,
          bottom: 20,
        }}>
        <Text
          style={{
            position: 'absolute',

            color: COLOR.MATTE_BLACK,
            fontSize: 20,
            marginLeft: 0,
            marginBottom: 10,
            marginTop: 0,
            width: 250,
            borderBottomRightRadius: 20,
            borderTopRightRadius: 20,
            paddingLeft: 10,
            backgroundColor: COLOR.GOLD,
          }}>
          Cập Nhật Chỉ Số Ngay
        </Text>
        <CustomTextInput
          style={{alignSelf: 'center', width: '85%', marginTop: 50}}
          value={valueWeight}
          onChangeText={setValueWeight}
          title="Cân Nặng"
          secureTextEntry={false}
          icon="user"
          keyboardType="numeric"
          placeholder="Nhập cân nặng hiện tại (kg)"
        />
        <CustomTextInput
          style={{alignSelf: 'center', width: '85%', marginTop: 30}}
          value={valueHeigh}
          onChangeText={setValueHeigh}
          title="Chiều Cao"
          secureTextEntry={false}
          icon="user"
          keyboardType="numeric"
          placeholder="Nhập chiều cao hiện tại (cm)"
        />
        <View
          style={{
            height: 50,
            marginTop: 20,
            paddingHorizontal: 60,
          }}>
          <CommandButton
            height={20}
            icon="upload"
            title="Cập nhật"
            backgroundColor={COLOR.GOLD}
            onPress={() => handleUpdateBMI()}
          />
        </View>
      </View> 
      <RoundButton
        icon="user-times"
        buttonWidth={40}
        buttonHeight={40}
        iconSize={20}
        style={styles.closeBtnWrapper}
        backgroundColor={COLOR.GOLD}
        onPress={() => onPressSignOut()}
      />
        <Modal
      animationType="slide"
      transparent
      statusBarTranslucent
      visible={visible}
      >
      <View style={styles.content}>
      <CustomTextInput
          style={{alignSelf: 'center', width: '85%', marginTop: 50}}
          value={valueName}
          onChangeText={setValueName}
          title="Họ Tên"
          secureTextEntry={false}
          icon="user"
          placeholder="Nhập họ tên của bạn"
        />
        <TouchableOpacity style={styles.commandBtn}>
          <Text onPress={()=>{}}>
            Đăng Kí
          </Text>
        </TouchableOpacity>
      
        <RoundButton
          icon="close"
          buttonWidth={25}
          buttonHeight={25}
          size={10}
          style={styles.closeBtnWrapper2}
          onPress={()=>{setVisible(false)}}
        />
      </View>
    </Modal>
    </ScrollView>
  );
  //#endregion
}

const styles = StyleSheet.create({
  closeBtnWrapper: {
    position: 'absolute',
    top: 50,
    right: 15,
  },
  userStatus: {
    width: '100%',
    alignSelf: 'center',
    paddingTop: 20,
    marginBottom: 20,
    paddingHorizontal: 15,
    height: 110,
    backgroundColor: COLOR.BLACK,
    borderRadius: 0,
  },
  userTagWrapper: {
    flexDirection: 'row',
  },
  userTag: {
    height: 20,
    borderWidth: 1,
    borderRadius: 7,
    alignItems: 'center',
    paddingHorizontal: 5,
    flexDirection: 'row',
    marginRight: 10,
    justifyContent: 'space-between',
  },

  userTagTxt: {
    fontSize: 11,
    marginLeft: 3,
  },
  userBtn: {
    width: '100%',
    height: 40,
    backgroundColor: COLOR.LIGHT_BROWN,
    borderRadius: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  userBtnTxt: {
    color: COLOR.WHITE,
    fontWeight: 'bold',
    fontSize: 16,
  },
  numberTxt: {
    color: COLOR.WHITE,
    fontSize: 15,
  },
  silverTxt: {
    fontSize: 13,
    color: '#aaa9ad',
  },
  content: {
    backgroundColor: COLOR.LIGHT_MATTE_BLACK,
    height: '100%',
    marginTop: 160,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginHorizontal: 15,
    paddingTop: 50, 
    
    
  },commandBtn: {
    backgroundColor: '#ffcc00',
    marginTop: 50,
    height: 50,
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },closeBtnWrapper2: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
});

export default ProfileScreen;
