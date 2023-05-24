import {
  Image,
  StatusBar,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {COLOR} from '../../constant';
import MasonryList from '@react-native-seoul/masonry-list';
import React, {FC, ReactElement, useMemo, useState, useEffect} from 'react';
import {
  getListAllChallenge,
  getListMyAllChallenge,
} from '../../utilities/FirebaseDatabase';
import auth from '@react-native-firebase/auth';
import {convertObjectToArrayWithoutKey} from '../../utilities/Utilities';

function AllChallengeScreen({route, navigation}) {
  const {type, challenges} = route.params;

  const [allChallenges, setAllChallenges] = useState(challenges);
  const [subcribedChallenges, setSubcribedChallenges] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      initData();
    });
    return unsubscribe;
  }, []);

  const initData = async () => {
    if (type == 'All') {
      await initAllChallenge();
    } else await initAllChallengeForCurrent();
  };
  const initAllChallenge = async () => {
    const res = await getListAllChallenge();
    var list = convertObjectToArrayWithoutKey(res.val());
    setAllChallenges(list != null ? list : [{imgURL: undefined}]);

    const getListSubscribedRes = await getListMyAllChallenge(
      auth().currentUser.uid,
    );
    if (getListSubscribedRes.val()) {
      setSubcribedChallenges(
        convertObjectToArrayWithoutKey(getListSubscribedRes.val()),
      );
    } else {
      setSubcribedChallenges([]);
    }
  };
  const initAllChallengeForCurrent = async () => {
    const res = await getListMyAllChallenge(auth().currentUser.uid);
    if (res.val == null) setAllChallenges([{imgURL: undefined}]);
    else setAllChallenges(convertObjectToArrayWithoutKey(res.val()));
  };

  var FurnitureCard = function (_a) {
    var item = _a.item;
    var randomBool = (0, useMemo)(function () {
      return Math.random() < 0.5;
    }, []);

    const isSubscribed = subcribedChallenges.find(
      value => value.id === item.id,
    );

    return (
      <View key={item?.id} style={{marginTop: 12, marginLeft: 12, flex: 1}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ChallengeDetail', {key: item?.id});
          }}>
          <Image
            source={{uri: item.imgURL}}
            style={{
              height: 240,
              alignSelf: 'stretch',
              borderRadius: 20,
            }}
            resizeMode="cover"
          />
          <Text
            style={{
              color: COLOR.WHITE,
              marginTop: 5,
            }}>
            {item.title}
          </Text>
          {isSubscribed && (
            <View style={styles.tag}>
              <Text style={styles.tagText}>Đã tham gia</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = function (_a) {
    const item = _a.item;
    return <FurnitureCard key={item.id} item={item} />;
  };

  return (
    <View style={{flex: 1, backgroundColor: COLOR.MATTE_BLACK}}>
      <StatusBar
        backgroundColor="transparent"
        translucent
        style={{height: 50}}
      />

      <MasonryList
        onRefresh={initData}
        key={(item, index) => index.toString()}
        ListHeaderComponent={<View style={{flex: 1, marginTop: 0}}></View>}
        contentContainerStyle={{
          marginTop: 70,
          marginLeft: 12,
          marginRight: 24,
          alignSelf: 'stretch',
        }}
        numColumns={2}
        data={allChallenges}
        renderItem={renderItem}></MasonryList>
      <View style={{position: 'absolute', top: -20, right: 0}}>
        <Text
          style={{
            marginTop: 60,
            color: COLOR.MATTE_BLACK,
            fontSize: 18,
            fontWeight: 'bold',
            marginLeft: 0,
            marginBottom: 10,
            borderBottomLeftRadius: 20,
            borderTopLeftRadius: 20,
            paddingVertical: 2,
            paddingRight: 10,
            paddingLeft: 10,
            backgroundColor: COLOR.GOLD,
          }}>
          {type == 'All' ? 'Tất cả thử thách' : 'Thử thách của tôi'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  closeBtnWrapper: {
    position: 'absolute',
    top: 50,
    right: 15,
  },
  tag: {
    position: 'absolute',
    backgroundColor: COLOR.WHITE,
    right: 0,
    top: 10,
    paddingLeft: 8,
    paddingRight: 4,
    paddingVertical: 1,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    elevation: 5,
  },
  tagText: {
    fontWeight: '600',
    fontSize: 13,
  },
});

export default AllChallengeScreen;
