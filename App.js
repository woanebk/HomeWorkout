import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {StyleSheet, UIManager, Platform} from 'react-native';
import MainStackNavigator from './navigation/MainStackNavigator';
import AuthStackNavigator from './navigation/AuthStackNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import React, {useState, useEffect} from 'react';
import {View, Text, LogBox} from 'react-native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import Toast from 'react-native-toast-message';
import Tts from 'react-native-tts';
import CustomModal from './components/CustomModal';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
Tts.setDefaultLanguage('vi-VN');

GoogleSignin.configure({
  webClientId:
    '441584493982-eg6pb0mrq60j3qmdq7hf9bbphj9mon2e.apps.googleusercontent.com',
});

function App({navigation}) {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [id, setId] = useState('');

  const [showModalInstall, setShowModalInstall] = useState(false);
  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    checkSoundService();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const checkSoundService = async () => {
    Tts.getInitStatus().then(
      () => {
        // ...
      },
      err => {
        if (err.code === 'no_engine') {
          setShowModalInstall(true);
        }
      },
    );
  };

  if (initializing) return null;

  if (!user) {
    return (
      <NavigationContainer>
        <AuthStackNavigator navigation={navigation} />
        <Toast />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <MainStackNavigator />
      <Toast />
      <CustomModal
        visible={showModalInstall}
        title="Ứng dụng cần tải thêm dịch vụ âm thanh và khởi động lại để có thể hoạt động tốt nhất, tải ngay ?"
        onConfirm={async () => {
          setShowModalInstall(false);
          Tts.requestInstallEngine();
        }}
        onCancel={() => setShowModalInstall(false)}
      />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

export default App;
