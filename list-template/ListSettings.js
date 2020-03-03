import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Dropdown} from 'react-native-material-dropdown';



/*
<Dropdown
  containerStyle={styles.dropDown}
  inputContainerStyle={{ borderBottomColor: 'transparent' }}
  label={description}
  labelPadding={0}
  labelHeight={5}
  data={['a, b, c']}
/>
*/




export default function ListSettings( {description, pressHandler, listItems}){


  /*const MyView = ({hide}) => {
    if (hide) {
      return null;
    }
    return (
      <View >
        <Text>{"here is some text"}</Text>
      </View>
    );
  };*/

  return(
    <TouchableOpacity activeOpacity={1} style={{flex: 1}} onPress={() => pressHandler()}>
      <View style={styles.dropDown}>
          <View style={styles.verticalCenter}>
              <Text style={styles.menuText}>
                  {description}
              </Text>
              <View>
                <Icon name='ios-arrow-down' style={styles.rightArrow} />
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
