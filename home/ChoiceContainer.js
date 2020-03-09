import React from 'react';
import {Button, FlatList, View} from 'react-native';
import {GlobalStyle} from '../assets/GlobalStyle';
import {Dropdown} from 'react-native-material-dropdown';

export default function ChoiceContainer({
  config,
  choices,
  refs,
  changeInput,
  submitInput,
    submitDisabled,
}) {
  return (
    <View style={[GlobalStyle.container]}>
      <FlatList
        data={config.labels}
        renderItem={q => (
          <View>
            <Dropdown
              label={q.item}
              data={choices[q.index]}
              onChangeText={value => {
                changeInput({
                  [config.normalTypes.concat(config.schemaTypes)[
                    q.index
                  ]]: value,
                });
              }}
              ref={c => refs.push(c)}
            />
            <View style={{flex: 1, height: 10}} />
          </View>
        )}
        keyExtractor={item => item}
      />
      <Button title={'Submit'} onPress={() => submitInput()} disabled={submitDisabled}/>
    </View>
  );
}
