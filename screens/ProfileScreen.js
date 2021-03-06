import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Alert,
  ScrollView,
  Modal,
  Image,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {Icon} from 'react-native-elements';
import auth, {firebase} from '@react-native-firebase/auth';
import RoundButton from '../components/RoundButton';
import {COLOR, SCREEN_HEIGHT, SCREEN_WIDTH} from '../constant';
import CustomModal from '../components/CustomModal';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  generateNewExercise,
  generateNewVideo,
  generateNewWorkout,
} from '../utilities/FirebaseDatabase';
import CustomTextInput from '../components/CustomTextInput';
import CommandButton from '../components/CommandButton';
import {
  updateBMIInfo,
  getUserInfo,
  updateUserInfo,
} from '../utilities/FirebaseDatabase';
import {
  convertObjectToArrayWithoutKeySort,
  generateArrayFromArrayKey,
  isNumber,
} from '../utilities/Utilities';
import DropDownPicker from 'react-native-dropdown-picker';
import Toast from 'react-native-toast-message';
import LinearGradient from 'react-native-linear-gradient';
import {LineChart} from 'react-native-chart-kit';
import MenuButton from '../components/MenuButton';
import LoadingView from '../components/LoadingView';
const PFP_WIDTH = 80;
const PFP_HEIGHT = 80;

const chartConfig = {
  backgroundGradientFrom: COLOR.LIGHT_MATTE_BLACK,
  backgroundGradientTo: COLOR.LIGHT_MATTE_BLACK,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  fillShadowGradient: COLOR.LIGHT_BLUE, //
  fillShadowGradientOpacity: 0.5,
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

function ProfileScreen({navigation}) {
  const [valueHeigh, setValueHeigh] = useState('');
  const [valueWeight, setValueWeight] = useState('');
  const [user, setUser] = useState({abc: 'abc'});
  const [listBMI, setListBMI] = useState([]);
  const [showModalUpdateInfo, setShowModalUpdateInfo] = useState(false);
  const [valueName, setValueName] = useState('');

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('Ng?????i m???i t???p');
  const [items, setItems] = useState([
    {label: 'Ng?????i m???i t???p', value: 'Ng?????i m???i t???p'},
    {label: 'Ng?????i c?? kinh nghi???m', value: 'Ng?????i c?? kinh nghi???m'},
    {label: 'Ng?????i t???p chuy??n nghi???p', value: 'Ng?????i t???p chuy??n nghi???p'},
  ]);
  
  const [isLoading, setIsLoadng] = useState(false);
  const [showModalUpdateStat, setShowModalUpdateStat] = useState(false);
  const [chartLoading, setChartLoading] = useState(true);
  const [showWeightChart, setShowWeightChart] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  useEffect(async () => {
    await initUser();
  }, []);

  const initUser = async () => {
    setChartLoading(true);
    var res = await getUserInfo();
    setUser(res.val());
    setValueHeigh(res.val()?.height?.toString());
    setValueWeight(res.val()?.weight?.toString());
    setValueName(res.val()?.name?.toString());
    setValue(res.val()?.level?.toString())

    setListBMI(convertObjectToArrayWithoutKeySort(res.val().listBMI));
    setChartLoading(false);
  };

  const handleUpdateBMI = async () => {
    if (valueHeigh == '' || valueWeight == '')
      Alert.alert(
        '',
        //body
        'Vui l??ng nh???p l???i c??n n???ng v?? chi???u cao',
      );
    else if (!isNumber(valueHeigh) || !isNumber(valueWeight))
      Alert.alert(
        '',
        //body
        'Vui l??ng nh???p l???i c??n n???ng v?? chi???u cao',
      );
    else {
      setShowModalUpdateStat(false);
      await updateBMIInfo(parseInt(valueHeigh), parseInt(valueWeight))
        .then(async () => {
          Toast.show({
            type: 'info',
            text1: 'Th??ng b??o',
            text2: 'C???p nh???t th??nh c??ng',
          });
          await initUser();
        })
        .catch(er => {
          Toast.show({
            type: 'info',
            text1: 'Th??ng b??o',
            text2: 'Vui l??ng th??? l???i',
          });
        });
    }
  };

  const handleUpdateInfo = async () => {
    if (valueName == '')
    Toast.show({
      type: 'info',
      text1: 'Th??ng b??o',
      text2: 'Vui l??ng nh???p l???i t??n',
    });
    else {
      const data = {
        name: valueName,
        level: value
      }
      const res = await getUserInfo()
      console.log(res.val().id)
      
      await updateUserInfo(res.val().id, data)
        .then(async () => {
          Toast.show({
            type: 'info',
            text1: 'Th??ng b??o',
            text2: 'C???p nh???t th??nh c??ng',
          });
          await initUser();
        })
        .catch(er => {
          Toast.show({
            type: 'error',
            text1: 'Th??ng b??o',
            text2: 'Vui l??ng th??? l???i sau',
          });
        });
    }
  };

  const onPressSignOut = () => {
    try{
      setIsLoadng(true)
      auth()
      .signOut()
      .then(() =>
        Alert.alert(
          '',
          //body
          '????ng xu???t th??nh c??ng',
        ),
      );
    } catch (e){
    }finally{
      setIsLoadng(false)
    }
  };
  const renderAdminButton = () => {
    return (
      <View>
        <Text style={{color: COLOR.WHITE}}>?????ng nh???n lung tung nha</Text>
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
        <TouchableOpacity
          style={{
            height: 50,
            backgroundColor: COLOR.WHITE,
            justifyContent: 'center',
            padding: 10,
            marginTop: 20,
          }}
          onPress={() => {
            generateNewVideo();
          }}>
          <Text>Generate Video</Text>
        </TouchableOpacity>
      </View>
    );
  };
  //#region  render

  const renderWeightChart = () => {
    const cols = 4;
    const DATA = generateArrayFromArrayKey(listBMI || [], 'weight')?.slice(
      -cols,
    );
    if (chartLoading)
      return (
        //loading
        <View
          style={{
            width: SCREEN_WIDTH - 20,
            height: 220,
            justifyContent: 'center',
          }}>
          <ActivityIndicator
            animating={chartLoading}
            color="white"
            hidesWhenStopped></ActivityIndicator>
        </View>
      );

    return (
      <>
        <LineChart
          style={styles.chart}
          data={{
            labels: generateArrayFromArrayKey(listBMI || [], 'x')?.slice(-cols),
            legend: ['C??n n???ng'],
            datasets: [
              {
                data: DATA,
                color: (opacity = 1) => COLOR.GOLD, // optional
                strokeWidth: 2, // optional
              },
            ],
          }}
          width={SCREEN_WIDTH - 20}
          height={250}
          chartConfig={chartConfig}
          renderDotContent={({x, y, index, data}) => (
            <View style={{position: 'absolute', top: y + 17, left: x + 15}}>
              <Text style={{color: COLOR.WHITE}}>{DATA[index]}</Text>
            </View>
          )}
          bezier
        />
      </>
    );
  };

  const renderBMIChart = () => {
    const cols = 4;
    const DATA = generateArrayFromArrayKey(listBMI || [], 'y')?.slice(-cols);
    if (chartLoading)
      return (
        //loading
        <View
          style={{
            width: SCREEN_WIDTH - 20,
            height: 220,
            justifyContent: 'center',
          }}>
          <ActivityIndicator
            animating={chartLoading}
            color="white"
            hidesWhenStopped></ActivityIndicator>
        </View>
      );

    return (
      <>
        <LineChart
          style={styles.chart}
          data={{
            labels: generateArrayFromArrayKey(listBMI || [], 'x')?.slice(-cols),
            legend: ['BMI'],
            datasets: [
              {
                data: DATA,
                color: (opacity = 1) => COLOR.GOLD, // optional
                strokeWidth: 2, // optional
              },
            ],
          }}
          width={SCREEN_WIDTH - 20}
          height={250}
          chartConfig={chartConfig}
          renderDotContent={({x, y, index, data}) => (
            <View style={{position: 'absolute', top: y + 17, left: x + 15}}>
              <Text style={{color: COLOR.WHITE}}>{DATA[index]}</Text>
            </View>
          )}
          bezier
        />
      </>
    );
  };

  const renderUserBMI = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <View style={styles.infoWrapper}>
          <TouchableOpacity
            onPress={() => {
              !showWeightChart && setShowWeightChart(true);
            }}>
            <View style={styles.infoBlock}>
              <Text style={styles.smallNumberTxt}>{user?.weight || 0}kg</Text>
              <Text style={styles.infoTitleTxt}>C??n n???ng</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.divider} />

          <View style={styles.infoBlock}>
            <Text style={styles.smallNumberTxt}>{user?.height || 0}cm</Text>
            <Text style={styles.infoTitleTxt}>Chi???u cao</Text>
          </View>

          <View style={styles.divider} />

          <TouchableOpacity
            onPress={() => {
              showWeightChart && setShowWeightChart(false);
            }}>
            <View style={styles.infoBlock}>
              <Text style={styles.smallNumberTxt}>
                {user?.weight && user?.height
                  ? Math.round(
                      (user?.weight / user?.height / user?.height) * 1000000,
                    ) / 100
                  : '---'}
              </Text>
              <Text style={styles.infoTitleTxt}>BMI</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderUserInfo = () => {
    return (
      <View style={{alignItems: 'center', marginVertical: 10}}>
        <View style={styles.infoWrapper}>
          <TouchableOpacity>
          <View style={styles.bodyInfoBlock}>
            <Text style={[styles.numberTxt]}>
              {Object.keys(user?.completedWorkouts || {})?.length || 0}{' '}
              <Text style={[styles.infoTitleTxt]}>B??i t???p ???? ho??n th??nh</Text>
            </Text>
          </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>navigation.navigate('Challenges')}>
          <View style={styles.bodyInfoBlock}>
            <Text style={styles.numberTxt}>
              {Object.keys(user?.listChallenge || {})?.length || 0}{' '}
              <Text style={styles.infoTitleTxt}>Th??? th??ch ???? tham gia</Text>
            </Text>
          </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderModalUpdateUserInfo = () => {
    return (
      <Modal
        animationType="slide"
        transparent
        statusBarTranslucent
        visible={showModalUpdateInfo}>
        <View style={{flex: 1, backgroundColor: COLOR.BLACK}}>
          <View
            style={{
              marginTop: 100,
              flex: 1,
              width: '85%',
              alignSelf: 'center',
            }}>
            <Text style={styles.titleTxt} color={COLOR.LIGHT_GREY}>
              Ch???nh s???a th??ng tin c?? nh??n
            </Text>

            <CustomTextInput
              style={{alignSelf: 'center', marginTop: 40}}
              value={valueName}
              onChangeText={setValueName}
              title="H??? T??n"
              secureTextEntry={false}
              icon="user"
              placeholder="Nh???p h??? t??n c???a b???n"
              backgroundColor="#292D3E"
            />

            <View style={{marginTop: 20}}>
              <Text
                style={[styles.titleTxt, {marginBottom: 5}]}
                color={COLOR.LIGHT_GREY}>
                Ch???n Level
              </Text>
            </View>

            <DropDownPicker
              style={{marginTop: 5, alignSelf: 'center'}}
              backgroundColor={COLOR.GREY}
              searchPlaceholderTextColor={COLOR.GOLD}
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder="Ch???n lo???i ng?????i t???p"
              theme="DARK"
            />
            <View style={{marginTop: 30}}>
              <CommandButton
                style={{width: '80%', height: 50, alignSelf: 'center'}}
                title="C???p nh???t"
                onPress={()=>{handleUpdateInfo(); setShowModalUpdateInfo(false)}}
              />
            </View>
          </View>

          <RoundButton
            icon="close"
            buttonWidth={25}
            buttonHeight={25}
            size={10}
            style={{position: 'absolute', right: 40, top: 50}}
            onPress={() => {
              setShowModalUpdateInfo(false);
            }}
          />
        </View>
      </Modal>
    );
  };

  const renderModalUpdateStat = () => {
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={showModalUpdateStat}
        onRequestClose={() => {}}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{height: 60, padding: 10}}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: COLOR.WHITE,
                }}>
                C???p nh???t ch??? s???
              </Text>
            </View>
            <View>
              <CustomTextInput
                style={{alignSelf: 'center', width: '96%', marginTop: 10}}
                value={valueWeight}
                onChangeText={t => setValueWeight(t)}
                title="C??n N???ng"
                secureTextEntry={false}
                icon="user"
                keyboardType="numeric"
                placeholder="Nh???p c??n n???ng hi???n t???i (kg)"
                hideButton
              />
              <CustomTextInput
                style={{alignSelf: 'center', width: '96%', marginTop: 30}}
                value={valueHeigh}
                onChangeText={setValueHeigh}
                title="Chi???u Cao"
                secureTextEntry={false}
                icon="user"
                keyboardType="numeric"
                placeholder="Nh???p chi???u cao hi???n t???i (cm)"
                hideButton
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                flex: 1,
                width: '100%',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <CommandButton
                height={20}
                style={{width: '40%'}}
                icon="upload"
                title="C???p nh???t"
                backgroundColor={COLOR.GOLD}
                onPress={() => handleUpdateBMI()}
              />
              <CommandButton
                height={20}
                style={{width: '40%'}}
                icon="times-circle"
                title="Hu???"
                backgroundColor={COLOR.GOLD}
                onPress={() => setShowModalUpdateStat(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <ScrollView style={{flex: 1}}>
      <ImageBackground
        style={{
          height: 200,
          backgroundColor: COLOR.WHITE,
          justifyContent: 'flex-end',
        }}
        source={{
          uri: 'https://oreni.vn/uploads/contents/workout-la-gi-2.jpg',
        }}
        blurRadius={0}>
        <LinearGradient
          style={styles.linearGradient}
          start={{x: 0, y: 0.1}}
          end={{x: 0, y: 0.7}}
          colors={[COLOR.TRANSPARENT, COLOR.BLACK]}>
          <Text style={styles.nameTxt}>{user?.name}</Text>
        </LinearGradient>
      </ImageBackground>
      <View style={styles.titleWrapper}>
        <Text style={styles.titleTxt}>Th??ng tin c?? nh??n</Text>
      </View>

      <View style={styles.contentWrapper}>
        <View style={styles.pfpWrapper}>
          <Image
            resizeMode="cover"
            style={styles.pfp}
            source={{
              uri: 'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80',
            }}></Image>
        </View>
        <View style={styles.userTagWrapper}>
          <View style={[styles.userTag, {borderColor: COLOR.WHITE}]}>
            <Icon
              name="account"
              type="material-community"
              size={14}
              color={COLOR.WHITE}
            />
            <Text style={[styles.userTagTxt, {color: COLOR.WHITE}]}>
              {user?.level || 'Ng?????i m???i t???p'}
            </Text>
          </View>
          <View style={[styles.userTag, {borderColor: COLOR.WHITE}]}>
            <Icon
              name="account"
              type="material-community"
              size={14}
              color={COLOR.WHITE}
            />
            <Text style={[styles.userTagTxt, {color: COLOR.WHITE}]}>
              T??ng c??
            </Text>
          </View>
        </View>
        {renderUserInfo()}
        {/* {renderAdminButton()} */}
        <View
          style={{
            flex: 1,
            marginVertical: 10,
            paddingHorizontal: 10,
            borderRadius: 10,
            padding: 10,
            backgroundColor: COLOR.LIGHT_BLACK,
            marginHorizontal: 5,
            borderRadius: 5,
          }}>
          <View
            style={{
              marginBottom: 10,
              marginLeft: 5,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={styles.infoTitleTxt}>
              {showWeightChart ? 'L???ch s??? c??n n???ng' : 'L???ch s??? BMI'}
            </Text>
          </View>
          {showWeightChart ? renderWeightChart() : renderBMIChart()}
          {renderUserBMI()}
          <TouchableOpacity
            style={styles.userBtn}
            onPress={() => {setShowModalUpdateStat(true)}}>
            <Icon
              name="chart-line"
              type="material-community"
              size={20}
              color={COLOR.WHITE}
            />
            <Text style={[styles.userBtnTxt, {marginLeft: 10}]}>
              C???p nh???t ch??? s??? ngay
            </Text>
          </TouchableOpacity>
        </View>
        <MenuButton
          title="B??i t???p y??u th??ch"
          onPress={() => {navigation.navigate('AllFavoriteWorkout')}}
        />
        <MenuButton
          title="C???p nh???t th??ng tin c?? nh??n"
          onPress={() => setShowModalUpdateInfo(true)}
        />
        <MenuButton
          title="????ng xu???t"
          onPress={() => setShowModalConfirm(true)}
        />
      </View>
      {renderModalUpdateStat()}
      {renderModalUpdateUserInfo()}
      <CustomModal
        visible={showModalConfirm}
        title="B???n c?? ch???c mu???n ????ng xu???t ?"
        onConfirm={async () => {
          setShowModalConfirm(false);
          onPressSignOut();
        }}
        onCancel={() => setShowModalConfirm(false)}
      />
      {isLoading && (
        <View
          style={{
            position: 'absolute',
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
            backgroundColor: COLOR.MATTE_BLACK,
            opacity: 0.95,
          }}>
          <LoadingView />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {
    backgroundColor: COLOR.LIGHT_MATTE_BLACK,
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 0,
    marginTop: -30,
    paddingTop: 10,
  },
  titleWrapper: {
    position: 'absolute',
    left: 20,
    top: 40,
  },
  titleTxt: {
    fontSize: 30,
    color: COLOR.WHITE,
    fontWeight: 'bold',
    elevation: 20,
  },
  pfp: {
    width: PFP_WIDTH,
    height: PFP_HEIGHT,
    borderRadius: 100,
  },
  pfpWrapper: {
    position: 'absolute',
    top: -PFP_HEIGHT / 2 - 10,
    left: 30,
    elevation: 20,
    borderWidth: 2,
    borderRadius: 100,
    shadowColor: COLOR.WHITE,
  },
  linearGradient: {
    height: 150,
    width: SCREEN_WIDTH,
    justifyContent: 'flex-end',
    paddingBottom: 33,
    paddingLeft: PFP_WIDTH + 50,
  },
  nameTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLOR.WHITE,
  },
  infoWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  numberTxt: {
    fontSize: 25,
    color: COLOR.LIGHT_GOLD,
  },
  smallNumberTxt: {
    fontSize: 20,
    color: COLOR.LIGHT_GOLD,
  },
  infoTitleTxt: {
    color: COLOR.LIGHT_GREY,
    fontSize: 12,
    fontWeight: 'bold',
  },
  divider: {
    height: '60%',
    width: 1,
    backgroundColor: COLOR.GOLD,
    alignSelf: 'center',
  },
  infoBlock: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 30,
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
  userTagWrapper: {
    flexDirection: 'row',
    marginLeft: PFP_WIDTH + 40,
  },
  userTagTxt: {
    fontSize: 11,
    marginLeft: 3,
  },
  bodyInfoBlock: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginHorizontal: 20,
  },
  userBtn: {
    width: '80%',
    height: 40,
    backgroundColor: COLOR.ORANGE,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor:COLOR.BLACK
  },
  modalView: {
    backgroundColor: COLOR.LIGHT_MATTE_BLACK,
    width: '90%',
    height: 250,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 100,
  },
  icon: {
    width: 120,
    height: 120,
  },
  commandBtn: {
    height: 45,
    width: 130,
    position: 'absolute',
    top: 70,
    right: 20,
  },
  chart: {
    marginRight: 10,
    borderRadius: 5,
  },
});

export default ProfileScreen;
