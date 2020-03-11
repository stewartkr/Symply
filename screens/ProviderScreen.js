import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { GlobalColors } from '../assets/GlobalStyle';

export default function Provider(){
    return(
      <View>
        <View style={[styles.roundedBox, styles.horizontalCenter, styles.largerTopMargin]}>
          <Text style={styles.largeWhiteText}>John Smith</Text>
          <Text style={styles.smallerWhiteText}>LMHC</Text>
        </View>
        <View style={styles.roundedBox}>
          <Text style={[officeInfoStyle, styles.smallerTopMargin]}>Office</Text>
          <Text style={officeInfoStyle}>(555) 555-5555</Text>
          <Text style={officeInfoStyle}>Address</Text>
          <Text style={officeInfoStyle}>1234 Office Pkwy, Bellingham, Wa 98229</Text>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
    roundedBox: {
      marginTop: 20,
      height: 200,
      marginLeft: 10,
      marginRight: 10,
      backgroundColor: GlobalColors.grey,
      borderRadius: 20
    },
    horizontalCenter: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    largeWhiteText: {
      color: GlobalColors.softWhite,
      fontSize: 30
    },
    smallerWhiteText: {
      color: GlobalColors.softWhite,
      fontSize: 23
    },
    largerTopMargin: {
      marginTop: 40
    },
    smallerTopMargin: {
      marginTop: 10
    },
    leftMargin: {
      marginLeft: 10
    }
})

const officeInfoStyle = [styles.smallerWhiteText, styles.leftMargin]
