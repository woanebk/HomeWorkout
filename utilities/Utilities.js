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