import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


export default function DropdownSelector( {description, pressHandler, listItems, iconName}){

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
      backgroundColor: '#cfd8dc'
    },
    menuText: {
      color: '#888888',
      marginLeft: 10
    },
    rightArrow: {
      marginRight: 10,
      alignSelf: 'flex-end',
      textAlign: 'center',
      color: '#888888'
    },
    verticalCenter: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
})
