import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { GlobalColors } from '../assets/GlobalStyle';


export default function TopBar( {pageName/*, pressHandler*/}){
    return(
      <View style={styles.topBar}>
        <Text style={styles.titleText}>
            {pageName}
        </Text>
      </View>
    )
}



const styles = StyleSheet.create({
    topBar: {
      height: 40,
      backgroundColor: GlobalColors.headerColor,
      flexDirection: 'row',
      alignItems: 'center',
    },
    titleText: {
      color: GlobalColors.fontColor,
      marginLeft: 10,
      fontSize: 20
    }
})
