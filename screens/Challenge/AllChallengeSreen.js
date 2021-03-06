import {
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  View,
  StyleSheet,
  useColorScheme,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {COLOR} from '../../constant';
import MasonryList from '@react-native-seoul/masonry-list';
import React, {FC, ReactElement, useMemo, useState, useEffect} from 'react';
import { generateNewChallenge,getListAllChallenge,getListMyAllChallenge } from '../../utilities/FirebaseDatabase';
import auth from '@react-native-firebase/auth';
import { convertObjectToArrayWithoutKey,convertObjectToArray } from '../../utilities/Utilities';

function AllChallengeScreen({route, navigation}) {
  const {type, challenges} = route.params;

  const DATA = [
    {
      id: undefined,
      imgURL: undefined,
    },
  ];
  var [allChallenges, setAllChallenges] = useState(challenges);
  useEffect(async () => {
    await doInit;
  }, []);
  const doInit = async () => {
    if (type == 'All') await initAllChallenge();
    else await initAllChallengeForCurrent();
  };
  const initAllChallenge = async () => {
    const res = await getListAllChallenge();
    var list = convertObjectToArrayWithoutKey(res.val());
    setAllChallenges(list != null ? list : [{imgURL: undefined}]);
  };
  const initAllChallengeForCurrent = async () => {
    console.debug('initmy');
    const res = await getListMyAllChallenge(auth().currentUser.uid);
    if (res.val == null) setAllChallenges([{imgURL: undefined}]);
    else setAllChallenges(convertObjectToArrayWithoutKey(res.val()));
  };

  var FurnitureCard = function (_a) {
    var item = _a.item;
    var randomBool = (0, useMemo)(function () {
      return Math.random() < 0.5;
    }, []);
    return (
      <View key={item?.id} style={{marginTop: 12, marginLeft: 12, flex: 1}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ChallengeDetail', {key: item?.id});
          }}>
          <Image
            source={{uri: item.imgURL}}
            style={{
              height: randomBool ? 240 : 280,
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
        </TouchableOpacity>
      </View>
    );
  };
  var renderItem = function (_a) {
    var item = _a.item;
    return <FurnitureCard item={item} />;
  };
  return (
    <View style={{flex: 1, backgroundColor: COLOR.MATTE_BLACK}}>
      <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            marginTop: 60,
            color: COLOR.MATTE_BLACK,
            fontSize: 20,
            marginLeft: 0,
            marginBottom: 10,
            width: 200,
            borderBottomRightRadius: 20,
            borderTopRightRadius: 20,

            paddingLeft: 10,
            backgroundColor: COLOR.GOLD,
          }}>
          {type == 'All' ? 'T???t c??? th??? th??ch' : 'Th??? th??ch c???a t??i'}
        </Text>
      </View>
      <StatusBar
        backgroundColor="transparent"
        translucent
        style={{height: 50}}
      />

      <MasonryList
      onRefresh={doInit}
      key={(item, index) => index.toString()}

        ListHeaderComponent={<View style={{flex: 1, marginTop: 0}}></View>}
        contentContainerStyle={{
          marginLeft: 12,
          marginRight: 24,
          alignSelf: 'stretch',
        }}
        numColumns={2}
        data={allChallenges}
        renderItem={item => renderItem(item)}></MasonryList>
    </View>
  );
}

const styles = StyleSheet.create({
  closeBtnWrapper: {
    position: 'absolute',
    top: 50,
    right: 15,
  },
});

export default AllChallengeScreen;
