import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import SymptomItem from './list-components/SymptomItem'


export default function List({listItems}) {
  console.log('in list');
  //console.log(listItems.length);
  return (
    <View style={styles.container}>
        <View style={styles.listBody}>
          <FlatList
            data = {listItems}
            renderItem={({ item, index })=>(
              <SymptomItem item={item} pressHandler={() => {console.log("SymptomItem clicked.")}}/> // This component requires a prop of pressHandler
            )}
            keyExtractor={(item, index) => index.toString()}
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
