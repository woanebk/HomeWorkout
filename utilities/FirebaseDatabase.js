/* eslint-disable prettier/prettier */
import {firebase} from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import moment from 'moment';
import {cloneArrayOrObject, convertObjectToArrayWithoutKey} from './Utilities';

const database = firebase
  .app()
  .database(
    'https://homeworkout-73750-default-rtdb.asia-southeast1.firebasedatabase.app/',
  );

export const Test = async () => {
  return await database.ref('test').once('value');
};
export const addExercise = exercise => {
  return database.ref('Exercises').push(exercise);
};

export const updateExercise = (id, data) => {
  return database.ref('Exercises/' + id).update(data);
};

//#region Exercise
export const generateNewExercise = () => {
  const dummyExercise = {
    name: 'Tên tiếng việt',
    name_en: 'Tên tiếng anh',
    point: 3,
    muscle_group: ['Vai', 'Ngực', 'Tay sau'],
    level: 'Normal',
    description: 'Tay rộng bằng vai',
    related_exercise: ['someId', 'someId'],
    video: 'link Video',
    tag: ['Giảm mỡ', 'Giảm cân', 'Tăng cơ'],
    image: 'link image',
    createdAt: moment().toISOString(),
  };
  const ref = addExercise(dummyExercise);
  const updateID = setTimeout(() => {
    updateExercise(ref.key, {
      id: ref.key,
    });
    clearTimeout(updateID);
  }, 2000);
};

export const getListAllExercise = async () => {
  return await database.ref('Exercises').once('value');
};

// export const getExerciseById = async (id) => {
//   return await database.ref('Exercises/').orderByChild('id').equalTo(id).once('value')
// }
//Hoac co the lay exercise theo path luon
export const getExerciseByIds = async id => {
  return await database.ref('Exercises/' + id).once('value');
};

//#end region

//#region Challenges
export const addChallenge = challenge => {
  return database.ref('Challenges/AllChallenges').push(challenge);
};

export const updateChallenge = (id, data) => {
  return database.ref('Challenges/AllChallenges/' + id).update(data);
};

export const generateNewChallenge = () => {
  const dummyChallenge = {
    body: 'Hãy cố gắng vượt qua thử thách',
    endTime: '01/06/2022',
    startTime: '10/06/2022',
    title: 'Thử thách cá hồi hoang',
    topic: 'cahoihoang',
    imgURL:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqEPKbkJzSFv7q6hwo2S6dKkNRYnWRWWkYTQ&usqp=CAU',
  };
  const ref = addChallenge(dummyChallenge);
  updateChallenge(ref.key, {
    id: ref.key,
  });
};
export const getListAllChallenge = async () => {
  return await database.ref('Challenges/AllChallenges').once('value');
};
export const getListMyAllChallenge = async userId => {
  return await database.ref('User/' + userId + '/listChallenge').once('value');
};

export const addChallengeToMyList = async challenge => {
  userId = auth().currentUser.uid;
  await messaging().subscribeToTopic(challenge.topic);
  return await database
    .ref('User/' + userId + '/listChallenge' + '/' + challenge.id)
    .update(challenge);
};
export const deleteChallengeOutOfMyList = async challenge => {
  userId = auth().currentUser.uid;
  await messaging().unsubscribeFromTopic(challenge.topic);
  return await database
    .ref('User/' + userId + '/listChallenge' + '/' + challenge.id)
    .remove();
};
export const lookupChallengeInMyList = async id => {
  userId = auth().currentUser.uid;
  const res = await database
    .ref('User/' + userId + '/listChallenge' + '/' + id)
    .once('value');
  return res.val();
};

export const getChallengeById = async id => {
  return await database.ref('Challenges/AllChallenges/' + id).once('value');
};

export const getUserChallengeById = async id => {
  const subcribedChallengeByUser = await lookupChallengeInMyList(id);
  if (subcribedChallengeByUser) {
    return subcribedChallengeByUser;
  } else {
    const res = await getChallengeById(id);
    return res.val();
  }
};

export const submitWorkoutInChallenge = async (
  userId,
  workoutId,
  workoutTime,
  percentage = 0,
  workoutData = {},
  challengeId,
  dayIndex,
) => {
  const submitData = {
    time: workoutTime,
    percentage: percentage,
    workoutData: cloneArrayOrObject(workoutData),
    updatedTime: moment().toISOString(),
    isDone: true,
  };
  const ref = await database
    .ref('User/' + userId + '/listChallenge/' + challengeId + '/listWorkout/' + dayIndex)
    .update(submitData);
  return ref;
};
//#endregion

//#region Workouts===============================================================================================================

export const addWorkout = workout => {
  return database.ref('Workouts/').push(workout);
};

export const updateWorkout = (id, data) => {
  return database.ref('Workouts/' + id).update(data);
};

export const generateNewWorkout = () => {
  const listExercises = [
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
    },
  ];

  const dummyWorkout = {
    name: 'Tên tiếng việt',
    name_en: 'Tên tiếng anh',
    point: 3,
    muscle_group: ['Vai', 'Ngực', 'Tay sau'],
    level: 'normal',
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
        exercises: listExercises,
      },
      {
        name: 'Round 1',
        set: 2,
        order: 0,
        rest: 2,
        exercises: listExercises,
      },
    ],
  };

  const ref = addWorkout(dummyWorkout);
  const updateID = setTimeout(() => {
    updateWorkout(ref.key, {
      id: ref.key,
    });
    clearTimeout(updateID);
  }, 2000);
};

export const getListAllWorkout = async () => {
  return await database.ref('Workouts').once('value');
};

export const getWorkoutById = async id => {
  return await database.ref('Workouts/' + id).once('value');
};

export const submitWorkout = async (
  userId,
  workoutId,
  workoutTime,
  percentage = 0,
  workoutData = {},
) => {
  const submitData = {
    id: workoutId,
    time: workoutTime,
    percentage: percentage,
    workoutData: cloneArrayOrObject(workoutData),
    updatedTime: moment().toISOString(),
    isDone: true,
  };
  const ref = await database
    .ref('User/' + userId + '/completedWorkouts/' + workoutId)
    .set(submitData);
  return ref;
};
//#endregion

//#region UserInfo
export const getUserInfo = async () => {
  await database
    .ref('User/' + auth().currentUser.uid )
    .update({id:auth().currentUser.uid})
  return await database.ref('User/' + auth().currentUser.uid).once('value');
};
export const updateBMIInfo = async (height, weight) => {
  var currentdate = new Date();
  var text = currentdate.toISOString().toString();
  await database
    .ref('User/' + auth().currentUser.uid)
    .update({height: height, weight: weight});
  console.log(Math.round((weight / height / height) * 1000000) / 100);
  return await database
    .ref('User/' + auth().currentUser.uid + '/listBMI/' + text.substring(0, 10))
    .update({
      x: text.substring(0, 10),
      y: Math.round((weight / height / height) * 1000000) / 100,
      height: height,
      weight: weight
    });
};

export const updateUserInfo = async (userId, data) => {
  var currentdate = new Date();
  var text = currentdate.toISOString().toString();
  await database
    .ref('User/' + userId)
    .update(data);
   if (!data?.height || !data?.weight) return
  console.log(Math.round((data?.weight / data?.height / data?.height) * 1000000) / 100);
  await database
    .ref('User/' + userId + '/listBMI/' + text.substring(0, 10))
    .update({
      x: text.substring(0, 10),
      y: Math.round((data?.weight / data?.height / data?.height) * 1000000) / 100,
      height: data?.height,
      weight: data?.weight
    });
};

export const addWorkoutToListFavorite = async (workoutId) => {
  await database
    .ref('User/' + auth().currentUser.uid + '/favoriteWorkouts/'+ workoutId)
    .update({id: workoutId});
}

export const removeWorkoutFromListFavorite = async (workoutId) => {
  await database
    .ref('User/' + auth().currentUser.uid + '/favoriteWorkouts/'+ workoutId)
    .remove();
}

//#endregion

//#region Video

export const addVideo = video => {
  return database.ref('Videos').push(video);
};

export const updateVideo = (id, data) => {
  return database.ref('Videos/' + id).update(data);
};

export const generateNewVideo = () => {
  const tempVideo = {
    name: 'Tên tiếng việt',
    description: 'Tay rộng bằng vai',
    video: 'link Video',
    image: 'link image',
    createdAt: moment().toISOString(),
  };
  const ref = addVideo(tempVideo);
  const updateID = setTimeout(() => {
    updateVideo(ref.key, {
      id: ref.key,
    });
    clearTimeout(updateID);
  }, 2000);
};

export const getListAllVideo = async () => {
  return await database.ref('Videos').once('value');
};

export const getVideoById = async id => {
  return await database.ref('Videos/' + id).once('value');
};
//#endregion