import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import {COLOR} from '../constant';
import {Icon} from 'react-native-elements';

function CommandButton(props) {
  return (
    <TouchableOpacity onPress={props?.onPress}>
      <View style={styles.commandBtn}>
        <Text style={styles.txt}>{props?.title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  commandBtn: {
    backgroundColor: COLOR.GREY,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  rightIconWrapper: {
    width: 30,
    height: 30,
    marginLeft: 15,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    color: COLOR.WHITE,
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default CommandButton;
