/* eslint-disable prettier/prettier */
import { firebase } from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import moment from 'moment';

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

//#region Excercise
export const generateNewExcercise = () => {
  const dummyExcercise = {
    name: 'Tên tiếng việt',
    name_en: 'Tên tiếng anh',
    point: 3,
    muscle_group: ['Vai', 'Ngực', 'Tay sau'],
    level: 'Normal',
    description: 'Tay rộng bằng vai',
    related_excercise: ['someId', 'someId'],
    video: 'link Video',
    tag: ['Giảm mỡ', 'Giảm cân', 'Tăng cơ'],
    image: 'link image',
    createdAt: moment().toISOString()
  }
  const ref = addExcercise(dummyExcercise);
  const updateID = setTimeout(() => {
    updateExcercise(ref.key, {
      id: ref.key
    })
    clearTimeout(updateID)
  }, 2000);
}

export const getListAllExcercise = async () => {
  return await database.ref('Excercises').once('value')
}

// export const getExcerciseById = async (id) => {
//   return await database.ref('Excercises/').orderByChild('id').equalTo(id).once('value')
// }
//Hoac co the lay excercise theo path luon
export const getExcerciseById = async (id) => {
  return await database.ref('Excercises/' + id).once('value')
}

//#end region

//#region Challenges
export const addChallenge = (challenge) => {
  return database.ref('Challenges/AllChallenges').push(challenge);
}

export const updateChallenge = (id, data) => {
  return database.ref('Challenges/AllChallenges/' + id).update(data);
}

export const generateNewChallenge = () => {
  const dummyChallenge = {
    body: 'Hãy cố gắng vượt qua thử thách', endTime: '20/12/2021', startTime: '09/12/2021', title: 'Thử thách cá hồi hoang', topic: 'cahoihoang', imgURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqEPKbkJzSFv7q6hwo2S6dKkNRYnWRWWkYTQ&usqp=CAU'
  }
  const ref = addChallenge(dummyChallenge);
  updateChallenge(ref.key, {
    id: ref.key
  })
}
export const getListAllChallenge = async () => {
  return await database.ref('Challenges/AllChallenges').once('value')
}
export const getListMyAllChallenge = async (userId) => {
  console.log(userId)
  return await database.ref('User/' + userId + '/listChallenge').once('value')
}

export const addChallengeToMyList = async (challenge) => {
  userId = auth().currentUser.uid;
  console.log(challenge.id)
  await messaging().subscribeToTopic(challenge.topic);
  return await database.ref('User/' + userId + '/listChallenge' + '/' + challenge.id).update(challenge)
}
export const deleteChallengeOutToMyList = async (challenge) => {
  userId = auth().currentUser.uid;
  console.log(challenge.id)
  await messaging().unsubscribeFromTopic(challenge.topic);
  return await database.ref('User/' + userId + '/listChallenge' + '/' + challenge.id).update(null)
}
export const lookupChallengeInMyList = async (id) => {
  userId = auth().currentUser.uid;
  const res = await database.ref('User/' + userId + '/listChallenge' + '/' + id).once('value');
  return (res.val());
}
//#endregion

//#region Workouts===============================================================================================================

export const addWorkout = (workout) => {
  return database.ref('Workouts/').push(workout);
}

export const updateWorkout = (id, data) => {
  return database.ref('Workouts/' + id).update(data);
}

export const generateNewWorkout = () => {
  const listExcercises = [
    {
      id: '-MqOBkWKtBkwEK7V9K5-',
      reps: 10,
      time: 0,
      rest: 30,
    },
    {
      id: '-MqV3xEkUMewBe4zTXCU',
      reps: 0,
      time: 30,
      rest: 60,
    }
  ]

  const dummyWorkout = {
    name: 'Tên tiếng việt',
    name_en: 'Tên tiếng anh',
    point: 3,
    muscle_group: ['Vai', 'Ngực', 'Tay sau'],
    level: 'Normal',
    description: 'Mô tả',
    tag: ['Giảm mỡ', 'Giảm cân', 'Tăng cơ'],
    image: 'link image',
    estimate_time: 45,
    likes: 0,
    createdAt: moment().toISOString(),
    rounds: [
      {
        name: 'Khởi động',
        set: 1,
        order: 0,
        rest: 2,
        excercises: listExcercises
      },
      {
        name: 'Round 1',
        set: 2,
        order: 0,
        rest: 2,
        excercises: listExcercises
      },
    ]
  }

  const ref = addWorkout(dummyWorkout);
  const updateID = setTimeout(() => {
    updateWorkout(ref.key, {
      id: ref.key
    })
    clearTimeout(updateID)
  }, 2000);
}

export const getListAllWorkout = async () => {
  return await database.ref('Workouts').once('value')
}

export const getWorkoutById = async (id) => {
  return await database.ref('Workouts/' + id).once('value')
}
//#endregion
//#region UserInfo
export const getUserInfo = async () => {
  var currentdate = new Date();
  var text=(currentdate.toISOString()).toString()
  return await database.ref('User/' + auth().currentUser.uid ).once('value');
}
export const updateBMIInfo = async (heigh, weight) => {
  var currentdate = new Date();
  var text=(currentdate.toISOString()).toString()
  await database.ref('User/' + auth().currentUser.uid).update({heigh: heigh,weight:weight});
  console.log(Math.round(weight/heigh/heigh*1000000)/100)
  return await database.ref('User/' + auth().currentUser.uid + "/listBMI/" +  text.substring(0,10)).update({x: text.substring(0,10),y:Math.round(weight/heigh/heigh*1000000)/100});
}
//#endregion