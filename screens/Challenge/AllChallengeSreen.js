import {
    Image,
    SafeAreaView,
    StatusBar,
    Text,
    View,
    StyleSheet,
    useColorScheme,
    FlatList,TouchableOpacity
  } from 'react-native';
  import {COLOR} from '../../constant';
  import MasonryList from '@react-native-seoul/masonry-list';
  import React, {FC, ReactElement, useMemo, useState, useEffect} from 'react';
  
  function AllChallengeScreen({route,navigation}) {
    const { type,challenges} = route.params;

    const DATA = [{
      id: undefined,
      imgURL:
      undefined,
    },];
    var [allChallenges, setAllChallenges] = useState(challenges);
    useEffect(() => {
       console.log(challenges)
       console.log(type)

    });
    var FurnitureCard = function (_a) {
      var item = _a.item;
      var randomBool = (0, useMemo)(function () {
        return Math.random() < 0.5;
      }, []);
      return (
        <View key={item.id} style={{marginTop: 12,marginLeft:12, flex: 1,}}>
          <TouchableOpacity onPress={()=>{ navigation.navigate("ChallengeDetail",{item})}}>
          <Image
            source={{uri:item.imgURL} }
            style={{
              height: randomBool ? 240 : 280,
              alignSelf: 'stretch',
              borderRadius:20,
  
            }}
            resizeMode="cover"
          />
          <Text
            style={{
             color:COLOR.WHITE,marginTop:5
            }}>
            {item.title}
          </Text>
          </TouchableOpacity>
        </View>
      );
    };
    var renderItem =function (_a) {
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
          {type=="All"?"Tất cả thử thách":"Thử thách của tôi"}
        </Text>
       
      </View>
        <StatusBar backgroundColor="transparent" translucent style={{height:50}} />
        
          <MasonryList
            ListHeaderComponent={<View  style={{flex: 1,marginTop:0}} >
          
          </View>}
            contentContainerStyle={{
              marginLeft: 12,
              marginRight: 24,
              alignSelf: 'stretch',
            }}
            numColumns={2}
            data={allChallenges}
            renderItem={(item=>renderItem(item))}
            >
  
            </MasonryList>
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
  