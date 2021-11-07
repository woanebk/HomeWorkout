import { firebase } from '@react-native-firebase/database';

const database = firebase
  .app()
  .database('https://homeworkout-73750-default-rtdb.asia-southeast1.firebasedatabase.app/');

  export const Test = async () => {
    return await database.ref('test').once('value')
  }