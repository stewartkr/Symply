import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


export default function Dropdown( {description/*, pressHandler*/}){
    return(
      <View style={styles.dropDown}>
        { /*<TouchableOpacity onPress={() => pressHandler()}> */}
        <View style={styles.verticalCenter}>
            <Text style={styles.menuText}>
                {description}
            </Text>
            <View>
              <Icon name='ios-arrow-down' style={styles.rightArrow} />
            </View>
        </View>
        {/*</TouchableOpacity>*/}
      </View>
    )
}



const styles = StyleSheet.create({
    dropDown: {
      flexGrow: 1,
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
