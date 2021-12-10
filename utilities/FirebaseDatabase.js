import { firebase } from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';

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
    return await database.ref('Excercises').once('value')
  }

//#region Challenges
    export const addChallenge = (challenge ) => {
    return database.ref('Challenges/AllChallenges').push(challenge);
  }

  export const updateChallenge = (id, data) => {
    return database.ref('Challenges/AllChallenges/' + id).update(data);
  }

  export const generateNewChallenge= () => {
    const dummyChallenge ={
      body: 'Hãy cố gắng vượt qua thử thách',endTime: '20/12/2021',startTime:'09/12/2021',title:'Thử thách cá hồi hoang',topic:'cahoihoang',imgURL:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqEPKbkJzSFv7q6hwo2S6dKkNRYnWRWWkYTQ&usqp=CAU'
    }
    const ref = addChallenge(dummyChallenge);
    updateChallenge(ref.key, {
      id: ref.key
    })
  }
  export const getListAllChallenge = async  ()=> {
    return await database.ref('Challenges/AllChallenges').once('value')
  }
  export const getListMyAllChallenge = async  (userId)=> {
    console.log(userId)
    return await database.ref('Challenges/User/'+userId).once('value')
  }

  export const addChallengeToMyList = async  (challenge)=> {
    userId= auth().currentUser.uid;
    console.log(challenge.id)
    await messaging().subscribeToTopic(challenge.topic);
    return await database.ref('Challenges/User/'+userId+'/'+challenge.id).update(challenge)
  }
  export const deleteChallengeOutToMyList = async  (challenge)=> {
    userId= auth().currentUser.uid;
    console.log(challenge.id)
    await messaging().unsubscribeFromTopic(challenge.topic);
    return await database.ref('Challenges/User/'+userId+'/'+challenge.id).update(null)
  }
  export const lookupChallengeInMyList = async  (id)=> {
    userId= auth().currentUser.uid;
    const res= await database.ref('Challenges/User/'+userId+'/'+id).once('value');
    return (res.val()) ;
  }
//#endregion
