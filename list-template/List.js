import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import SymptomItem from './list-components/SymptomItem'


export default function List({listItems}) {
  console.log('in list');
  
  return (
    <View style={styles.container}>
        <View style={styles.listBody}>
          <FlatList
            data = {listItems}
            renderItem={({ item })=>(
              <SymptomItem item={item}/>
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
