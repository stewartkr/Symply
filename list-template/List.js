import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import SymptomItem from './list-components/SymptomItem'
import AddSymptom from './list-components/AddSymptom'

export default function List({listItems, pressHandler}) {


  return (
    <View style={styles.container}>
        <View style={styles.listBody}>
          <FlatList
            data = {listItems}
            renderItem={({ item })=>(
              <SymptomItem item={item} pressHandler = {pressHandler}/>
            )}
          />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listBody:{
    marginTop: 2
  }
});
