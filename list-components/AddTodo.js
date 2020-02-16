import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';

export default function AddTodo({ submitSymp }) {

    const [text, setText] = useState('');
    const changeHandler = (val) => {
        setText(val);
    }

    return (
        <View>
            <TextInput
                style={styles.input}
                placeholder='new symptom...'
                onChangeText={changeHandler}
            />
            <Button onPress={() => submitSymp(text)} title='Add Symptom' />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        marginTop:50,
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: 'silver',
        borderBottomColor: 'grey'
    }
})