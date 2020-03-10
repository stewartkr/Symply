import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import ListItem from './list-components/ListItem'


export default function List({listItems, pressHandler}) {
  console.log('in list');

  return (
    <View style={styles.container}>
      <FlatList
        data = {listItems}
        renderItem={({ item, index })=>(
          <ListItem item={item} pressHandler={pressHandler}/>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 2
  }
});
