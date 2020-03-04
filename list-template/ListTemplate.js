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

  const [tagArrowPosition, setTagArrowPosition] = useState('ios-arrow-down');

  const [sortArrowPosition, setSortArrowPosition] = useState('ios-arrow-down');


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


  function swapArrow(position) {
    var newVal = 'ios-arrow-up';
    if (position == 'ios-arrow-up') {
      newVal = 'ios-arrow-down';
    }
    return newVal;
  }


  function hideSortDisplay() {
    sortDisplayFunct(false);
    setSortArrowPosition('ios-arrow-down');
  }

  function hideFilterDisplay() {
    filterDisplayFunct(false);
    setTagArrowPosition('ios-arrow-down');
  }

  function showSortDisplay() {
    sortDisplayFunct(true);
    setSortArrowPosition('ios-arrow-up');
  }

  function showFilterDisplay() {
    filterDisplayFunct(true);
    setTagArrowPosition('ios-arrow-up');
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


  /*when user presses specific item on sort list*/
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
      if(key == sortAZ) {
        sortList();
      }
      else if(key == sortZA) {
        sortListReverse();
      }
    }
    hideSortDisplay();

  }


  function sortList() {
    listItems.sort(function (a, b) {
      return ('' + a.text).localeCompare(b.text);
    });
    const sortedItems = []
    for(item of listItems) {
      sortedItems.push(item)
    }
    pressFunct(sortedItems);
  }


  function sortListReverse() {
    listItems.sort(function (a, b) {
      return ('' + a.text).localeCompare(b.text);
    });
    const reverseSortedItems = [];
    var i = listItems.length - 1;
    while (i >= 0) {
      reverseSortedItems.push(listItems[i])
      i -= 1
    }
    pressFunct(reverseSortedItems);
  }



  /*remove later*/
  const DropdownDisplay = ({display, dropdownItems, onClick}) => {
    if (!display) {
      return null;
    }
    return (
      <View style={{position: 'absolute', top: 85, width: '100%'}}>
        <DropdownList listItems={dropdownItems} pressHandler={onClick} />
      </View>
    );
  }


  function showHideFilters() {
    if (displaySorts) {
      hideSortDisplay();
    }
    else if(displayFilters){
      hideFilterDisplay();
    }
    else {
      showFilterDisplay();
    }
  }


  function showHideSort() {
    if (displayFilters) {
      hideFilterDisplay();
    }
    else if (displaySorts){
      hideSortDisplay();
    }
    else {
      showSortDisplay();
    }
  }


  return (
    <View style={{ flex: 1}}>
      <ConsoleLog>{items}</ConsoleLog>
      <TextInput
        placeholder='Search...'
      />
      <View style={styles.flexRow}>
        <DropdownSelector iconName={tagArrowPosition} description='Tags' pressHandler = {showHideFilters} listItems = {items} />
        <DropdownSelector iconName={sortArrowPosition} description='Sort by' pressHandler = {showHideSort} listItems = {items}/>
      </View>
      <List listItems={items} pressHandler={listPressHandler}/>
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
