import {LEVEL} from '../constant';

export const handleFormatSecond = seconds => {
  let min = parseInt(seconds / 60);
  let sec = parseInt(seconds % 60);
  let displayMin = min < 10 ? '0' + min : min;
  let displaySec = sec < 10 ? '0' + sec : sec;
  return displayMin + ':' + displaySec;
};

export const convertObjectToArrayWithoutKey = obj => {
  let arr = [];
  for (let [key, value] of Object.entries(obj || {})) {
    arr.push(value);
  }
  return arr;
};
export const convertObjectToArrayWithoutKeySort = obj => {
  let arr = [];
  for (let [key, value] of Object.entries(obj).sort()) {
    arr.push(value);
  }
  return arr;
};
export const convertObjectToArray = obj => {
  let arr = [];
  for (let [key, value] of Object.values(obj || {})) {
    arr.push(key, value);
  }
  return arr;
};

export const convertStringDDMMYYtoDate = stringDate => {
  let d = stringDate.split('/');
  let dat = new Date(d[2] + '/' + d[1] + '/' + d[0]);
  return dat;
  console.log(dateObject);
  return Date.parse(
    +stringDate.split('/')[2],
    stringDate.split('/')[1] - 1,
    +stringDate.split('/')[0],
  );
};

export const shuffle = array => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

export const handleArrayToString = array => {
  let str = '';
  array?.map((item, index) => {
    return index === array?.length - 1 ? (str += item) : (str += item + ', ');
  });
  return str;
};

export const cloneArrayOrObject = arr => {
  return JSON.parse(JSON.stringify(arr));
};

export const filterListWorkoutByTag = (arr, tag) => {
  return convertObjectToArrayWithoutKey(
    arr?.filter(item => {
      return item?.tag?.includes(tag);
    }),
  );
};

export const generateArrayFromArrayKey = (arr, key) => {
  if (arr?.length <= 0) return [];
  let res = [];
  arr?.map(item => {
    item[key] && res.push(item[key]);
  });
  return res;
};

export function isNumber(val) {
  return !isNaN(val);
}

export const generateNumberRangeArray = (fromNumber, toNumber) => {
  var list = [];
  for (var i = fromNumber; i <= toNumber; i++) {
    list.push(i);
  }
  return list;
};

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};