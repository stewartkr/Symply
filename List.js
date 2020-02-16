import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import Header from './list-components/Header'
import ToDoItem from './list-components/ToDoItem'
import AddToDo from './list-components/AddTodo'

export default function List() {
  const [todos, setTodo] = useState([
    {text:'nasea', key:'1'},
    {text: 'upset stomach', key: '2'},
    {text: 'headache', key: '3'}
  ]);

  const pressHandler = (key) => {
    setTodo((prevTodos) => {
      return prevTodos.filter(todo => todo.key != key);
    });
  }

  const submitSymp = (text) => {
    setTodo((prevTodos) => {
      return [
        {text: text, key: Math.random().toString()},
        ...prevTodos
      ]
    });
  }
  return (
    /*list content*/
    <View style={styles.container}>
      {/* form*/}
      <View style={styles.inside}>
        <AddToDo submitSymp = {submitSymp}/>
        <View style={styles.listBody}>
          <FlatList 
            data = {todos}
            renderItem={({ item })=>(
              <ToDoItem item={item} pressHandler = {pressHandler}/>
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
    backgroundColor: '#ffecb3',
  },
  inside:{

    padding:50
  },
  listBody:{
    
    marginTop: 20
  }
});
