import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { GlobalColors } from '../assets/GlobalStyle';


export default function DropdownSelector( {description, pressHandler, listItems, iconName}){ // TODO: We don't use listItems here, should we? (sb)

  return(
    <TouchableOpacity activeOpacity={0.8} style={{flex: 1}} onPress={() => pressHandler()}>
      <View style={styles.dropDown}>
          <View style={styles.verticalCenter}>
              <Text style={styles.menuText}>
                  {description}
              </Text>
              <View>
                <Icon name={iconName} style={styles.rightArrow} />
              </View>
          </View>
      </View>
    </TouchableOpacity>
  )
}



const styles = StyleSheet.create({
    dropDown: {
      height: 40,
      backgroundColor: GlobalColors.dropdownBGColor
    },
    menuText: {
      color: GlobalColors.fontColor,
      marginLeft: 10
    },
    rightArrow: {
      marginRight: 10,
      alignSelf: 'flex-end',
      textAlign: 'center',
      color: GlobalColors.fontColor
    },
    verticalCenter: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
})
