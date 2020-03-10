import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';

export default function ListItem( { item, pressHandler}){
    return(
      <View style={styles.listItem}>
        <TouchableOpacity onPress={() => pressHandler(item.key)}>
            <Text style={styles.paleGrey}>
                {item.name}
            </Text>
        </TouchableOpacity>
      </View>
    )
}

const styles = StyleSheet.create({
    listItem: {
      height: 40,
      justifyContent: 'center',
      backgroundColor: '#f6f6fa',
      borderWidth:1,
      borderStyle:'dashed',
      borderColor:'grey',
      color: '#888888'
    },
    paleGrey: {
      color: '#888888',
    }
})
