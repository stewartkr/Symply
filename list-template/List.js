import React from 'react';
import { View, FlatList } from 'react-native';
import ListItem from './list-components/ListItem';
import { GlobalStyle } from '../assets/GlobalStyle';

export default function List({listItems, textExtractor, pressHandler}) {

  // TODO: Update so that it doesn't call textExtractor twice. Note this might require state and event hook? (sb)
  return (
    <View style={GlobalStyle.listContainer}>
      <FlatList
        data = {listItems}
        renderItem={({ item, index })=>(
          <ListItem item={item} itemName={textExtractor(item)[0]} itemSecondary={textExtractor(item)[1]} pressHandler={pressHandler}/>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
