import {
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  View,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {COLOR} from '../constant';
import MasonryList from '@react-native-seoul/masonry-list';
// eslint-disable-next-line @typescript-eslint/no-use-before-define
import React, {FC, ReactElement, useMemo, useState, useEffect} from 'react';
import auth, {firebase} from '@react-native-firebase/auth';
import RoundButton from '../components/RoundButton';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import Icon from 'react-native-ionicons';
import database from '@react-native-firebase/database';
import { generateNewChallenge,getListAllChallenge,getListMyAllChallenge } from '../utilities/FirebaseDatabase';
import { convertObjectToArrayWithoutKey,convertObjectToArray } from '../utilities/Utilities';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
function ChallengesCategoryScreen({navigation}) {
  const DATA = [{
    id: undefined,
    imgURL:
    undefined,
  },];
  var [allChallenges, setAllChallenges] = useState(DATA);
  var [allChallengesForUser, setAllChallengesForUser] = useState(DATA);
  useEffect(async()=>{
   await initAllChallenge()
   await initAllChallengeForCurrent()
  },[]);
  const initAllChallenge =async () => {
      const res = await getListAllChallenge();      
      var list=convertObjectToArrayWithoutKey(res.val());   
      setAllChallenges(list != null?list:[{imgURL:undefined}] )
      console.log(list);

  }
  const initAllChallengeForCurrent =async () => {
    console.debug("initmy")
    const res = await getListMyAllChallenge(auth().currentUser.uid);    
    if (res.val==null)setAllChallengesForUser( [{imgURL:undefined}] ) 
    else setAllChallengesForUser(convertObjectToArrayWithoutKey(res.val())); 
  }    
  //#region  message    
  // const [notification, setNotification] = useState({
  //   title: undefined,
  //   body: undefined,
  //   image: undefined,
  // });
  // const getToken = async () => {
  //   const token = await messaging().getToken();
  //   console.log('.........................: ', token);
  // };
   
  // useEffect(() => {
  //  // const navigation = useNavigation();

  //   getToken();
  //   messaging().onMessage(async remoteMessage => {
  //     console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));

  //     PushNotification.configure({
  //       onNotification: function (notification) {
  //         console.log('LOCAL NOTIFICATION ==>', notification);
  //         navigation.navigate("ChallengeDetail",{key:remoteMessage.data.key}); 
  //       },
  //       popInitialNotification: true,
  //       requestPermissions: true,
  //     });
  //     PushNotification.localNotification({
  //       message: remoteMessage.notification.body,
  //       title: remoteMessage.notification.title,
  //       bigPictureUrl: remoteMessage.notification.android.imageUrl,
  //       smallIcon: remoteMessage.notification.android.imageUrl,
  //       // chanelId: remoteMessage.messageId,
  //       priority: 'high',
  //     });
  //     setNotification({
  //       title: remoteMessage.notification.title,
  //       body: remoteMessage.notification.body,
  //       image: remoteMessage.notification.android.imageUrl,
  //     });
  //   });

  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log('onNotificationOpenedApp: ', JSON.stringify(remoteMessage));
  //     navigation.navigate("ChallengeDetail",{key:remoteMessage.data.key}); 
  //     setNotification({
  //       title: remoteMessage.notification.title,
  //       body: remoteMessage.notification.body,
  //       image: remoteMessage.notification.android.imageUrl,
  //     });
  //   });

  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           JSON.stringify(remoteMessage),
  //         );

  //         setNotification({
  //           title: remoteMessage.notification.title,
  //           body: remoteMessage.notification.body,
  //           image: remoteMessage.notification.android.imageUrl,
  //         });
  //       }
  //     });
  // }, []);
//#endregion
  var FurnitureCard = function (_a) {
    var item = _a.item;
    var randomBool = (0, useMemo)(function () {
      return Math.random() < 0.5;
    }, []);
    return (
      <View key={item.id} style={{marginBottom: 12, marginLeft: 12, flex: 1,backgroundColor:COLOR.backgroundColor}}>
        <TouchableOpacity onPress={()=>{ navigation.navigate("ChallengeDetail",{item})}}>
          <Image
            source={{uri: item.imgURL}}
            style={{
              height: randomBool ? 80 : 100,
              alignSelf: 'stretch',
              borderRadius: 10,
            }}
            resizeMode="cover"
          />
          <Text
            style={{
              color: COLOR.WHITE,
              marginTop: 5,
            }}>
            {item.title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  var renderItem = function (_a) {
    var item = _a.item;
    return <FurnitureCard item={item} key={item.key} />;
  };
  return (
    <View style={{flex: 1, backgroundColor: COLOR.MATTE_BLACK}}>
      <StatusBar
        backgroundColor="transparent"
        translucent
        style={{height: 50}}
      />
      <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            marginTop: 60,
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
          Tất cả thử thách
        </Text>
        <TouchableOpacity
          style={{marginTop: 65, position: 'absolute', right: 30, flex: 1}} onPress={()=>{ navigation.navigate("AllChallenge",  { type:"All",challenges:allChallenges})}}>
        {/* async() =>{console.debug('click');await generateNewChallenge().then(() => console.log('Data updated.'));}}> */}
          <Text style={{color: COLOR.GOLD}}> Xem tất cả</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.todayWorkout}>
        <Text style={styles.todayWorkoutTxt}>Bài Tập Của Ngày</Text>
      </View> */}
      <View style={{flex: 1, borderRadius: 20, height: 350}}>
        <MasonryList
          style={{flex: 1, marginTop: 10, borderRadius: 20}}
          // ListHeaderComponent={<View style={{flex: 1, marginTop: 0}}></View>}
          contentContainerStyle={{
            marginLeft: 12,
            marginRight: 24,
            alignSelf: 'stretch',
          }}
          key={(item, index) => index.toString()}
          numColumns={3}
          data={allChallenges}
          renderItem={(item,index) => renderItem(item,index)} onRefresh={initAllChallenge}></MasonryList>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            marginTop: 10,
            color: COLOR.MATTE_BLACK,
            fontSize: 20,
            marginLeft: 0,
            marginBottom: 10,
            width: 250,
            borderBottomRightRadius: 20,
            borderTopRightRadius: 20,

            paddingLeft: 10,
            backgroundColor: COLOR.GOLD,
          }}>
          Thử thách bạn tham gia
        </Text>
        <TouchableOpacity
          style={{marginTop: 15, position: 'absolute', right: 30, flex: 1}} onPress={()=>{  navigation.navigate("AllChallenge",  { type:"My",challenges:allChallengesForUser})}}>
          <Text style={{color: COLOR.GOLD}}> Xem tất cả </Text>
        </TouchableOpacity>
      </View>
      {/* <Text
        style={{
          marginTop: 10,
          color: COLOR.WHITE,
          fontSize: 20,
          color: COLOR.WHITE,
          marginLeft: 12,
          marginBottom: 10,
        }}>
      </Text> */}

      <View style={{flex: 1, borderRadius: 20, height: 350, marginBottom: 10}}>
        <MasonryList
          style={{flex: 1, marginTop: 10, borderRadius: 20}}
          ListHeaderComponent={<View style={{flex: 1, marginTop: 0}}></View>}
          contentContainerStyle={{
            marginLeft: 12,
            marginRight: 24,
            alignSelf: 'stretch',
          }}
          key={(item, index) => index.toString()}
          numColumns={3}
          onRefresh={initAllChallengeForCurrent}
          data={allChallengesForUser}
          renderItem={item => renderItem(item)}></MasonryList>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  closeBtnWrapper: {
    position: 'absolute',
    top: 50,
    right: 15,
  },
  todayWorkout: {
    backgroundColor: COLOR.GOLD,
    width: 170,
    height: 25,
    position: 'absolute',
    top: 50,
    right: 0,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  todayWorkoutTxt: {
    color: COLOR.MATTE_BLACK,
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default ChallengesCategoryScreen;
