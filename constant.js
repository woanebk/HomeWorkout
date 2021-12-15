import {Dimensions} from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const COLOR = {
  TRANSPARENT: '#00000000',
  BLACK: '#181510',
  MATTE_BLACK: '#222222',
  LIGHT_MATTE_BLACK: '#333333',
  DARK_BROWN: '#785F37',
  LIGHT_BROWN: '#A08C5B',
  GOLD: '#CBB682',
  LIGHT_GOLD: '#e9dbbd',
  WHITE: '#fff',
  GREY: '#777777',
  LIGHT_GREY: '#dddddd',
  LIGHT_BLUE: '#b5d3e7',
  LIGHT_BLUE_2: '#1261a0',
  RED: '#ff0000',
  DARK_RED: '#8b0000',
  SILVER: '#bec2cb',
  YELLOW: '#ffff00',
  ORANGE: '#ff5e13',
  DARK_BLUE: '#09143c',
  BLUE_BLACK: '#040720',
  KELLY_GREEN: '#4cbb17',
  BLUE: '#187bcd',
  LIGHT_BLACK: '#484848',
};

export const MUSCLE_GROUP = {
  TAY_SAU: 'Tay sau',
  NGUC: 'Ngực',
  VAI: 'Vai',
  CHAN: 'Chân',
  BUNG: 'Bụng',
  DUI: 'Đùi',
  MONG: 'Mông',
  TAY_TRUOC: 'Tay trước',
  LIEN_SUON: 'Liên sườn',
  LUNG: 'Lưng',
  XO: 'Xô',
  CANG_TAY: 'Cẳng tay',
};

export const LEVEL = {
  EASY: {
    name: 'Easy',
    en: 'Easy',
    vi: 'Dễ',
    userLevel: {
      en: 'Beginner',
      vi: 'Người mới tập',
    },
  },
  NORMAL: {
    name: 'Normal',
    en: 'Normal',
    vi: 'Trung bình',
    userLevel: {
      en: 'Intermediate',
      vi: 'Người tập lâu',
    },
  },
  HARD: {
    name: 'Hard',
    en: 'Hard',
    vi: 'Khó',
    userLevel: {
      en: 'Pro',
      vi: 'Pro',
    },
  },
};

export const WORKOUT_TAG_COLLECTION = [
  {
    name: 'Giảm cân',
    image:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/701/p-1-cardio-workout-1516282523.jpg',
    tag: 'Giảm cân',
    description: 'Thu gọn cơ thể của bạn'
  },
  {
    name: 'Tăng cơ',
    image:
      'https://30dayfitness.app/static/d1721fef7d0c45531411fb6c0cc7622c/a1eb1/cardio-workouts-for-men-at-home.jpg',
    tag: 'Tăng cơ',
    description: 'Xây dựng cơ bắp trong mơ'
  },
  {
    name: 'Giảm mỡ',
    image:
      'https://manofmany.com/wp-content/uploads/2020/05/7-minute-workout.jpg',
    tag: 'Giảm mỡ',
    description: 'Tập luyện cơ thể săn chắc'
  },
];

export const HORIZONTAL_LIST_HEIGHT = 200; //left view 130
