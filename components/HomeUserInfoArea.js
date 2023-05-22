import {StyleSheet, Text, View} from 'react-native';
import React, {Fragment} from 'react';
import {COLOR} from '../constant';
import {Icon} from 'react-native-elements';
import {Skeleton} from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native-gesture-handler';

function HomeUserInfoArea({user}) {
  return (
    <View style={styles.userStatus}>
      <View style={styles.userTagWrapper}>
        {user?.level ? (
          <Fragment>
            <View style={[styles.userTag, {borderColor: COLOR.WHITE}]}>
              <Icon
                name="account"
                type="material-community"
                size={14}
                color={COLOR.WHITE}
              />
              <Text style={[styles.userTagTxt, {color: COLOR.WHITE}]}>
                {user?.level}
              </Text>
            </View>
            <View style={[styles.userTag, {borderColor: COLOR.WHITE}]}>
              <Icon
                name="account"
                type="material-community"
                size={14}
                color={COLOR.WHITE}
              />
              <Text style={[styles.userTagTxt, {color: COLOR.WHITE}]}>
                Tăng cơ
              </Text>
            </View>
          </Fragment>
        ) : (
          <Fragment>
            <Skeleton
              LinearGradientComponent={LinearGradient}
              animation="pulse"
              width={'30%'}
              height={15}
              skeletonStyle={[styles.skeleton]}
            />
            <View style={{width: 10}} />

            <Skeleton
              LinearGradientComponent={LinearGradient}
              animation="pulse"
              width={'20%'}
              height={15}
              skeletonStyle={styles.skeleton}
            />
          </Fragment>
        )}
      </View>

      <View style={{flexDirection: 'row', paddingVertical: 5}}>
        <View style={{flex: 5}}>
          {user?.name ? (
            <Text style={styles.numberTxt}>
              {user?.name ? user?.name : 'Người dùng mới'}
            </Text>
          ) : (
            <Skeleton
              LinearGradientComponent={LinearGradient}
              animation="pulse"
              width={'45%'}
              height={15}
              skeletonStyle={styles.skeleton}
            />
          )}
          {user?.height && user?.weight ? (
            <Text style={styles.silverTxt}>
              Chiều Cao:{' '}
              <Text style={styles.numberTxt}>
                {user?.height ? user?.height : '--- '}cm
              </Text>{' '}
              - Cân nặng:{' '}
              <Text style={styles.numberTxt}>
                {user?.weight ? user?.weight : '---'} kg
              </Text>
            </Text>
          ) : (
            <View style={{marginTop: 6}}>
              <Skeleton
                LinearGradientComponent={LinearGradient}
                animation="pulse"
                width={'70%'}
                height={15}
                skeletonStyle={styles.skeleton}
              />
            </View>
          )}
        </View>
        <View style={{flex: 1, alignItems: 'center', marginTop: -20}}>
          <Text
            style={{fontWeight: 'bold', fontSize: 20, color: COLOR.DARK_BROWN}}>
            BMI
          </Text>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: COLOR.WHITE}}>
            {user?.weight && user?.height
              ? Math.round(
                  (user?.weight / user?.height / user?.height) * 1000000,
                ) / 100
              : '---'}{' '}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.userBtn}
        onPress={() => navigation.navigate('Profile')}>
        <Icon
          name="chart-line"
          type="material-community"
          size={20}
          color={COLOR.WHITE}
        />
        <Text style={[styles.userBtnTxt, {marginLeft: 10}]}>
          Cập nhật chỉ số ngay
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  userBtn: {
    width: '100%',
    height: 40,
    backgroundColor: COLOR.LIGHT_BROWN,
    borderRadius: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  userBtnTxt: {
    color: COLOR.WHITE,
    fontWeight: 'bold',
    fontSize: 16,
  },
  numberTxt: {
    color: COLOR.WHITE,
    fontSize: 15,
  },
  silverTxt: {
    fontSize: 13,
    color: '#aaa9ad',
  },
  userTag: {
    height: 20,
    borderWidth: 1,
    borderRadius: 7,
    alignItems: 'center',
    paddingHorizontal: 5,
    flexDirection: 'row',
    marginRight: 10,
    justifyContent: 'space-between',
  },
  userTagWrapper: {
    flexDirection: 'row',
  },
  userTagTxt: {
    fontSize: 11,
    marginLeft: 3,
  },
  skeleton: {
    backgroundColor: COLOR.LIGHT_MATTE_BLACK,
  },
});

export default HomeUserInfoArea;
