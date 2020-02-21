import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


export default function TopBar( {pageName/*, pressHandler*/}){
    return(
      <View style={styles.topBar}>
        { /*<TouchableOpacity onPress={() => pressHandler()}> */}

        <Icon name='md-arrow-back' style={styles.leftArrow} />
        <Text style={styles.titleText}>
            {pageName}
        </Text>
      </View>
    )
}



const styles = StyleSheet.create({
    topBar: {
      height: 40,
      backgroundColor: '#cfd8dc',
      flexDirection: 'row',
      alignItems: 'center',
    },
    leftArrow: {
      color: '#888888',
      marginLeft: 10,
      fontSize: 25,
    },
    titleText: {
      color: '#888888',
      marginLeft: 10,
      fontSize: 20
    }
})
