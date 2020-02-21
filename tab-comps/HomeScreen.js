import React, {useState, useEffect} from 'react';
import {Text, SafeAreaView, View, Button, StyleSheet, Picker, FlatList} from 'react-native';
import Slider from '@react-native-community/slider';
import {Dropdown} from 'react-native-material-dropdown';
import {GlobalColors, GlobalStyle} from '../assets/GlobalStyle';
import TopBar from '../navigation/TopBar';
import { DEBUG } from '../debug/debugStatus';
import TestRealmButtons from '../debug/TestRealmButtons';

import {schemaVersion, Symptom, Treatment, Provider, Contact, Tag, Activity, Note } from '../Schemas';

const Realm = require('realm');

const sliderText = {
  0: {
    min: 'Worst pain',
    max: 'No pain',
    title: "I'm feeling...",
  },
  1: {
    min: 'Worst day ever',
    max: 'Best day ever',
    title: 'Today was...',
  },
};

const styles = StyleSheet.create({
  slider: {
    width: '80%',
    height: 12,
    alignSelf: 'center',
  },
  sliderBox: {
    top: 10,
    width: '96%',
    height: '20%',
    backgroundColor: GlobalColors.softWhite,
    borderRadius: 20,
    flex: 1,
  },
  dropdown: {
    backgroundColor: GlobalColors.softWhite,
    height: 40,
  },
});

export function HomeScreen() {
  const [sliderState, setSlider] = useState(0);
  const [sliderValue, setValue] = useState(5);
  const [inputFields, setInput] = useState({});
  const [realm, setRealm] = useState(null);

  const refs = [];

  const types = [
    ['Symptom', 'Provider', 'Treatment', 'Tag'],
    ['Sleep', 'Diet', 'Activity', 'Tag'],
  ];

  const labels = [
    ['I feel...', 'I can talk to...', 'I can try...', 'Tags'],
    ['Last night, I slept...', 'Today, my diet was...', 'Today, I...', 'Tags'],
  ];

  const choices = [
    [
      // incident recording choices
      [],
      [],
      [],
      [],
    ],
    [
      // reflection recording choices
      [
        {value: '>12 hours'},
        {value: '10-12 hours'},
        {value: '8-10 hours'},
        {value: '6-8 hours'},
        {value: '4-6 hours'},
        {value: '<4 hours'},
      ],
      [
        {value: 'Great'},
        {value: 'Good'},
        {value: 'Okay'},
        {value: 'Poor'},
        {value: 'Bad'},
      ],
      [
        {value: 'Exercised'},
        {value: 'Socialized'},
        {value: 'Played videogames'},
      ],
      [{value: 'Good Day'}, {value: 'Bad Day'}],
    ],
  ];

  function populateIncidentChoices(realm) {
    let iter;
    let schemaNumber = 0;
    let incChoices = choices[0];
    let incTypes = types[0];

    for (const schemaName of incTypes){
      schemaNumber++;
      // TESTING
      console.log(realm)
      iter = realm.objects(schemaName).values();
      for (const entry of iter) {
        if (schemaName === 'Provider') {
          incChoices[schemaNumber].push({
            value: entry.firstName + ' ' + entry.lastName
          })
        } else {
          incChoices[schemaNumber].push({
            value: entry.name
          })
        }
      }
    }
  }

  useEffect(() => {
    Realm.open({
      schema: [Symptom, Treatment, Provider, Contact, Tag, Activity, Note],
      schemaVersion,
      deleteRealmIfMigrationNeeded: true,
    }).then(r => {
      console.log('opened realm');
      setRealm(r);
      populateIncidentChoices(r);
    });

    return () => {
      if (realm !== null && !realm.isClosed) {
        console.log('closed realm');
        realm.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // empty dependency array used to ensure realm only opened once

  return (
    <SafeAreaView style={{flex: 1}}>
      <TopBar pageName="Home" />
      <View style={[GlobalStyle.container, {alignItems: 'center'}]}>
        <View style={styles.sliderBox}>
          <Text style={GlobalStyle.titleText}>
            {sliderText[sliderState].title}
          </Text>
          <SliderContainer
            sliderMin={sliderText[sliderState].min}
            sliderMax={sliderText[sliderState].max}
            setValue={setValue}
          />
        </View>
        <View
          style={{
            position: 'relative',
            top: 20,
            flexDirection: 'row',
            paddingBottom: 40,
          }}>
          <Button
            title={'Change Type'}
            onPress={() => {
              setSlider((sliderState + 1) % 2);
              resetRefs(refs);
            }}
          />
        </View>
        <View
          style={{
            flex: 3,
            width: '96%',
            backgroundColor: GlobalColors.softWhite,
          }}>
          <IncidentContainer
            types={types[sliderState]}
            choices={choices[sliderState]}
            labels={labels[sliderState]}
            inputHandler={setInput}
            refs={refs}
          />
        </View>
        <View style={{height: 20}} />
      </View>
      {DEBUG ? <TestRealmButtons/> : <View/>}
    </SafeAreaView>
  );
}

const SliderContainer = ({sliderMin, sliderMax, setValue}) => {
  return (
    <View>
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={10}
        value={5}
        step={1}
        minimumTrackTintColor={GlobalColors.fontColor}
        maximumTrackTintColor={GlobalColors.fontColor}
        onSlidingComplete={newValue => {
          setValue(newValue);
        }}
      />
      <Text
        style={[
          GlobalStyle.text,
          {position: 'absolute', right: '10%', top: 12, fontSize: 15},
        ]}>
        {sliderMin}
      </Text>
      <Text
        style={[
          GlobalStyle.text,
          {position: 'absolute', left: '10%', top: 12, fontSize: 15},
        ]}>
        {sliderMax}
      </Text>
    </View>
  );
};

const resetRefs = refs => {
  refs.forEach(ref => {
    if (ref !== null) {
      ref.setState({value: ''});
    }
  });
};

const IncidentContainer = ({inputHandler, types, labels, choices, refs}) => {
  const [currentInput, setInput] = useState({});

  return (
    <View style={[GlobalStyle.container]}>
      <FlatList
        data={labels}
        renderItem={q => (
          <View>
            <Dropdown
              label={q.item}
              data={choices[q.index]}
              onChangeText={value => {
                setInput(prevInput => ({
                  [types[q.index]]: value,
                  ...prevInput,
                }));
              }}
              ref={c => refs.push(c)}
            />
            <View style={{flex: 1, height: 10}} />
          </View>
        )}
        keyExtractor={(item, index) => index}
      />
      <Button
        title={'Submit'}
        onPress={() => {
          inputHandler(currentInput);
          setInput({});
          resetRefs(refs);
        }}
      />
    </View>
  );
};
