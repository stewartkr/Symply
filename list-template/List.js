import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import SymptomItem from './list-components/SymptomItem'
import AddSymptom from './list-components/AddSymptom'

export default function List({listItems}) {
  const [symptoms, setSymptom] = useState(listItems);
  /*const [symptoms, setSymptom] = useState([
    {text:'nausea', key:'1'},
    {text: 'upset stomach', key: '2'},
    {text: 'headache', key: '3'}
  ]);*/



  const pressHandler = (key) => {
    setSymptom((prevsymptoms) => {
      return prevsymptoms.filter(todo => todo.key != key);
    });
  }


  return (
    /*list content*/
    <View style={styles.container}>
        <View style={styles.listBody}>
          <FlatList
            data = {symptoms}
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
