import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Touchable,
} from 'react-native';
import {COLOR} from '../constant';
import {Icon} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

function CommandButton({icon = 'heart', title, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.menuButton}>
        <Icon name={icon} type="font-awesome-5" size={13} color={COLOR.WHITE} />
        <View style={{flex: 1, marginLeft: 12}}>
          <Text style={{color: COLOR.WHITE}}>{title}</Text>
        </View>
        <Ionicons
          name={'chevron-forward-outline'}
          type="font-awesome-5"
          size={13}
          color={COLOR.WHITE}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    marginBottom: 8,
    marginHorizontal: 12,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 6,
    paddingHorizontal: 24,
    color: COLOR.WHITE,
    backgroundColor: '#ffffff90',
    alignItems: 'center',
    paddingVertical: 12,
  },
});

export default CommandButton;
