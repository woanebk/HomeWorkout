import { firebase } from '@react-native-firebase/database';

const database = firebase
  .app()
  .database('https://homeworkout-73750-default-rtdb.asia-southeast1.firebasedatabase.app/');

  export const Test = async () => {
    return await database.ref('test').once('value')
  }
  export const addExcercise = (excercise) => {
    return database.ref('Excercises').push(excercise);
  }

  export const updateExcercise = (id, data) => {
    return database.ref('Excercises/' + id).update(data);
  }

  export const generateNewExcercise = () => {
    const dummyExcercise ={
      name: 'Tên tiếng việt',
      name_en: 'Tên tiếng anh',
      point: 3,
      muscle_group: ['Vai', 'Ngực', 'Tay Sau'],
      level: 'normal',
      descriptopn: 'Tay rộng bằng vai',
      related_excercise : ['someId', 'someId'],
      video: 'link Video',
      tag: ['Giảm mỡ', 'Giảm cân', 'Tăng cơ'],
      image:'link image'
    }
    const ref = addExcercise(dummyExcercise);
    updateExcercise(ref.key, {
      id: ref.key
    })
  }

  export const getListAllExcercise = async () => {
    return await database.ref('Excercises/').once('value')
  }