import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,Image
} from 'react-native';
import auth, { firebase } from '@react-native-firebase/auth';
import RoundButton from '../../components/RoundButton';
import { COLOR } from '../../constant';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
function NotificationDetailScreen({navigation}) {
  const [notification, setNotification] = useState({
    title: undefined,
    body: undefined,
    image: undefined,
  });
  const getToken = async () => {
    const token = await messaging().getToken();
    console.log('.........................: ', token);
  };
  useEffect(() => {
    getToken();
    messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      PushNotification.configure({
                onNotification: function(notification) {
         console.log('LOCAL NOTIFICATION ==>', notification);
         navigation.navigate('Notification');
        },
        popInitialNotification: true,
        requestPermissions: true,
       });
      PushNotification.localNotification({
        message: remoteMessage.notification.body,
        title: remoteMessage.notification.title,
        bigPictureUrl: remoteMessage.notification.android.imageUrl,
        smallIcon: remoteMessage.notification.android.imageUrl,
        priority:'high',
      });
      setNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        image: remoteMessage.notification.android.imageUrl,
      });
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('onNotificationOpenedApp: ', JSON.stringify(remoteMessage));
      navigation.navigate('Notification');
      setNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        image: remoteMessage.notification.android.imageUrl,
      });
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            JSON.stringify(remoteMessage),
          );
      
          setNotification({
            title: remoteMessage.notification.title,
            body: remoteMessage.notification.body,
            image: remoteMessage.notification.android.imageUrl,
          });
        }
      });
  }, []);
  return (
    <View>
      <Text>Firebase Messaging</Text>
      <Text>Firebase Messaging</Text>
      <Text>Firebase Messaging</Text>
      <Text>Firebase Messaging</Text>
      <Text>{`title: ${notification?.title}`}</Text>
      <Text>{`title: ${notification?.body}`}</Text>
      <Image source={{uri: notification?.image}} width={500} height={500} />
    </View>
  );
}

const styles = StyleSheet.create({
  closeBtnWrapper: {
    position: 'absolute',
    top: 50,
    right: 15,
  },
});

export default NotificationDetailScreen;
