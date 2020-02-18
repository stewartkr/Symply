import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import SymptomItem from './list-components/SymptomItem'
import AddSymptom from './list-components/AddSymptom'

export default function List() {
  const [symptoms, setSymptom] = useState([
    {text:'nasea', key:'1'},
    {text: 'upset stomach', key: '2'},
    {text: 'headache', key: '3'}
  ]);

  // Removes Item corresponding  to Key
  const pressHandler = (key) => {
    setSymptom((prevsymptoms) => {
      return prevsymptoms.filter(todo => todo.key != key);
    });
  }

  const submitSymp = (text) => {
    setSymptom((prevsymptoms) => {
      return [
        {text: text, key: Math.random().toString()},
        ...prevsymptoms
      ]
    });
  }
  return (
    /*list content*/
    <View style={styles.container}>
      {/* form*/}
      <View style={styles.inside}>
        <AddSymptom submitSymp = {submitSymp}/>
        <View style={styles.listBody}>
          <FlatList 
            data = {symptoms}
            renderItem={({ item })=>(
              <SymptomItem item={item} pressHandler = {pressHandler}/>
            )}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inside:{

    padding:50
  },
  listBody:{
    
    marginTop: 20
  }
});
