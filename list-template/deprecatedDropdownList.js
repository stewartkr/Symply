import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import ListItem from './list-components/ListItem';

export default function DropdownList({listItems, pressHandler}) {

  return (
    <View style={styles.container}>
      <FlatList
        data = {listItems}
        renderItem={({ item })=>(
          <ListItem item={item} pressHandler = {pressHandler}/>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
