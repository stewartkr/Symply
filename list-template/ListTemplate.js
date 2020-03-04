import React, {useState} from 'react';
import { TextInput, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import List from './List';
import DropdownSelector from './DropdownSelector';
import DropdownList from './DropdownList';


export default function ListTemplate({listItems}) {

  const [displaySorts, sortDisplayFunct] = useState(false);

  const [displayFilters, filterDisplayFunct] = useState(false);

  const [items, pressFunct] = useState(listItems);

  const [dropdownItemSelected, setDropdownItemSelected] = useState("");

  const sortAZ = '1';
  const sortZA = '2';


  const sortOptions = [
    {text: 'Name A-Z', key: sortAZ},
    {text: 'Name Z-A', key: sortZA}
  ]

  const filterOptions = [
    {text: 'filter1', key: '1'},
    {text: 'filter2', key: '2'}
  ]

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
      i ++;
    }
    console.log("list item is " + item.text);
  }


  /*when user presses a specific item on the dropdown list*/
  const filterItemPress = (key) => {
    console.log("filter by press");
    var item = null;
    i = 0;
    while (item == null  &&  i < filterOptions.length) {
      if (filterOptions[i].key == key) {
        item = filterOptions[i];
      }
      i ++;
    }
    if (item == null) {
      console.log("uh oh item is null");
    }
    else {
      setDropdownItemSelected(item.text);
    }

  }



  const sortItemPress = (key) => {
    console.log("sort by press");
    var item = null;
    i = 0;
    while (item == null  &&  i < sortOptions.length) {
      if (sortOptions[i].key == key) {
        item = sortOptions[i];
      }
      i ++;
    }
    if (item == null) {
      console.log("uh oh item is null");
    }
    else {
      setDropdownItemSelected(item.text);
    }
    sortDisplayFunct(false);

  }



  /*remove later*/
  const DropdownDisplay = ({display, dropdownItems, onClick}) => {
    if (!display) {
      return null;
    }
    console.log("should display");
    return (
      <View style={{position: 'absolute', top: 90, width: '100%'}}>
        <DropdownList listItems={dropdownItems} pressHandler={onClick} />
      </View>
    );
  }


  function showHideFilters() {
    if (displaySorts) {
      sortDisplayFunct(false);
    }
    else {
      filterDisplayFunct(!displayFilters);
    }
  }


  function showHideSort() {
    if (displayFilters) {
      filterDisplayFunct(false);
    }
    else {
      sortDisplayFunct(!displaySorts);
    }
  }


  return (
    <View style={{ flex: 1}}>
      <ConsoleLog>{items}</ConsoleLog>
      <TextInput
        placeholder='Search...'
      />
      <View style={styles.flexRow}>
        <DropdownSelector description='Tags' pressHandler = {showHideFilters} listItems = {items} />
        <DropdownSelector description='Sort by' pressHandler = {showHideSort} listItems = {items}/>
      </View>
      <List listItems={items} pressHandler={listPressHandler}/>
      <Text>Just selected: {dropdownItemSelected}</Text>
      <DropdownDisplay display={displaySorts} dropdownItems={sortOptions} onClick={sortItemPress}/>
      <DropdownDisplay display={displayFilters} dropdownItems={filterOptions} onClick={filterItemPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row'
  }
})
