import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import MainStackNavigator from './navigation/MainStackNavigator';
import AuthStackNavigator from './navigation/AuthStackNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import LoginScreen from './screens/Auth/LoginScreen';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [id, setId] = useState("");

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
      if (user.id=="655GM4Re42RsxluLlFwIX8YlQIF2")
        setId(user.id)
      PushNotification.configure({
        onNotification: function (notification) {
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
        id: remoteMessage.messageId,
        priority: 'high',
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
  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <NavigationContainer>
        <AuthStackNavigator />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
  const navigation = useNavigation();
}

const styles = StyleSheet.create({});

export default App;
