import React, {useState} from 'react';
import { TextInput, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import List from './List'
import ListSettings from './ListSettings'

export default function ListTemplate({listItems}) {

  const [items, pressFunct] = useState(listItems);

  const ConsoleLog = (list) => {
    console.log("reload");
    console.log(list);
    return false;
  }


  /* returning !change is essential to tell the array that the state changed*/
  function onPress() {
    console.log(items);
    const temp = items[0];
    items[0] = items[1];
    items[1] = temp;
    var newItems = [];
    if (newItems === items) {
      console.log("new items equal old items");
    }
    else {
      console.log("new items do not equal old items");
    }
    for (item of items) {
      newItems.push(item)
    }
    return newItems;
  }

  return (
    <View style={{ flex: 1}}>
      <ConsoleLog>{items}</ConsoleLog>
      <TextInput
        placeholder='Search...'
      />
      <View style={styles.flexRow}>
        <ListSettings description='Tags' pressHandler = {() => pressFunct(onPress)} listItems = {items} />
        <ListSettings description='Sort by' pressHandler = {() => pressFunct(onPress)} listItems = {items}/>
      </View>
      <List listItems={items} />
    </View>
  );
}

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row'
  }
})
