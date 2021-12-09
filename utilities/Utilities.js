export const handleFormatSecond = (seconds) => {
    let min = parseInt(seconds / 60);
    let sec = parseInt(seconds % 60);
    let displayMin = min < 10 ? '0' + min : min;
    let displaySec = sec < 10 ? '0' + sec : sec;
    return displayMin + ':' + displaySec;
  };

export const convertObjectToArrayWithoutKey = (obj) => {
  let arr =[]
  for (let [key, value] of Object.entries(obj)) {
    arr.push(value)
  }
  return arr
}
export const convertObjectToArray = (obj) => {
  let arr =[]
  for (let [key, value] of Object.values(obj)) {
    arr.push(key,value)
  }
  return arr
}
export const convertStringDDMMYYtoDate= (stringDate) => {
  let d = stringDate.split("/");
  let dat = new Date(d[2] + '/' + d[1] + '/' + d[0]);
  return dat;  
console.log(dateObject);
  return Date.parse(+(stringDate.split("/"))[2], (stringDate.split("/"))[1] - 1, +(stringDate.split("/"))[0])}