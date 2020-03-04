import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import DropdownItem from './list-components/DropdownItem';

export default function DropdownList({listItems, pressHandler}) {


  return (
    <View style={styles.container}>
      <FlatList
        data = {listItems}
        renderItem={({ item })=>(
          <DropdownItem item={item} pressHandler = {pressHandler}/>
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
