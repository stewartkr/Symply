import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import { GlobalColors } from '../../assets/GlobalStyle';

export default function ListItem({ item, itemName, itemSecondary, pressHandler }){
    return(
      <View style={styles.listItem}>
        <TouchableOpacity style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}} onPress={() => pressHandler(item.key)}>
            <Text style={{color: GlobalColors.fontColor}}>
                {itemName}
            </Text>
            <Text style={{color: GlobalColors.softGrey}}>
                {itemSecondary}
            </Text>
        </TouchableOpacity>
      </View>
    )
}

const styles = StyleSheet.create({
    listItem: {
      height: 40,
      paddingLeft: 20,
      paddingRight: 20,
      justifyContent: 'center',
      backgroundColor: GlobalColors.softWhite,
      borderWidth:1,
      borderStyle:'dashed',
      borderColor:GlobalColors.grey,
      color: GlobalColors.softGrey
    },
})
