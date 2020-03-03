import React, {useState} from 'react';
import { TextInput, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import List from './List';
import ListSettings from './ListSettings';


export default function ListTemplate({listItems}) {

  const [pleaseHide, hideFunct] = useState(true);

  const [items, pressFunct] = useState(listItems);

  const [dropdownSelected, dropdownSelector] = useState("");

  const tempList = [
    {text:'firstThing', key:'1'},
    {text: 'second', key: '2'},
    {text: 'third', key: '3'},
    {text:'firstThing', key:'4'},
    {text: 'second', key: '5'},
    {text: 'third', key: '6'},
    {text:'firstThing', key:'7'},
    {text: 'second', key: '8'},
    {text: 'third', key: '9'}
  ];

  const ConsoleLog = (list) => {
    console.log("reload");
    console.log(list);
    return false;
  }



  const listPressHandler = (key) => {
    console.log("press handler stub");
    var item = null;
    i = 0;
    while (item == null  &&  i < listItems.length) {
      if (listItems[i].key == key) {
        item = listItems[i];
      }
      i ++;var item = null;
    i = 0;
    while (item == null  &&  i < listItems.length) {
      if (listItems[i].key == key) {
        item = listItems[i];
      }
      i ++;
    }
    }
    console.log("list item is " + item.text);
  }


  /*when user presses a specific item on the dropdown list*/
  const dropdownListPress = (key) => {
    console.log("actual dropdown press handler");
    var item = null;
    i = 0;
    while (item == null  &&  i < tempList.length) {
      if (tempList[i].key == key) {
        item = tempList[i];
      }
      i ++;
    }
    if (item == null) {
      console.log("uh oh item is null");
    }
    else {
      dropdownSelector(item.text);
    }
    hideFunct(true);

  }



  /*remove later*/
  const MyView = ({hide}) => {
    if (hide) {
      return null;
    }
    console.log("should display")
    return (
      <View style={{position: 'absolute', top: 90, width: '100%'}}>
        <List listItems={tempList} pressHandler={dropdownListPress} />
      </View>
    );
  }
  /*function ListOptions() {


    const optionStyles = StyleSheet.create({

    })
  }*/


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
    hideFunct(!pleaseHide); //change later
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
      <List listItems={items} pressHandler={listPressHandler}/>
      <Text>Just selected: {dropdownSelected}</Text>
      <MyView hide={pleaseHide} />
    </View>
  );
}

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row'
  }
})
