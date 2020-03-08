import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import SymptomItem from './list-components/SymptomItem'


export default function List({listItems}) {
  console.log('in list');
  //console.log(listItems.length);
  return (
    /*list content*/
    <View style={styles.container}>
        <View style={styles.listBody}>
          <FlatList
            data = {listItems}
            renderItem={({ item, index })=>(
              <SymptomItem item={item}/>
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
    /*backgroundColor: "#9bcdd5"*/
  },
  listBody:{
    marginTop: 2
  }
});



/*extra Mario stuff (currently removed -- maybe useful as an example/showing how things work)*/
/*
// Removes Item corresponding  to Key




const submitSymp = (text) => {
  setSymptom((prevsymptoms) => {
    return [
      {text: text, key: Math.random().toString()},
      ...prevsymptoms
    ]
  });
}



*/
