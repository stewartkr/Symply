import React, {useState, useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  Button,
  StyleSheet,
  FlatList,
} from 'react-native';
import Slider from '@react-native-community/slider';
import {Dropdown} from 'react-native-material-dropdown';
import {GlobalColors, GlobalStyle} from '../assets/GlobalStyle';
import TopBar from '../navigation/TopBar';
import {DEBUG} from '../debug/debugStatus';
import TestRealmButtons from '../debug/TestRealmButtons';

import {defaultOpenParams, allSchemas} from '../realm/DatabaseConfig';

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
  // consts setup
  const refs = []; // TODO: Add context for the purpose of this?

  const types = [
    ['Symptom', 'Provider', 'Treatment', 'Tag'],
    ['Sleep', 'Diet', 'Activity', 'Tag'], // note: only last two are populated from realm. structure such that all manually-set vars come first.
  ];
  // store the index of the first realm-populated field described in types[1]
  const reflectSchemaStartIndex = 2;

  const labels = [
    ['I feel...', 'I can talk to...', 'I can try...', 'Tags'],
    ['Last night, I slept...', 'Today, my diet was...', 'Today, I...', 'Tags'],
  ];

  const baseReflectChoices = [
    // reflection recording choices
    [ // sleep duration
      {value: '>12 hours'},
      {value: '10-12 hours'},
      {value: '8-10 hours'},
      {value: '6-8 hours'},
      {value: '4-6 hours'},
      {value: '<4 hours'},
    ],
    [ // diet quality
      {value: 'Great'},
      {value: 'Good'},
      {value: 'Okay'},
      {value: 'Poor'},
      {value: 'Bad'},
    ],
    // Start of Realm-populated fields
    [], // activities
    [], // reflection tags
  ];

  // state setup
  const [sliderState, setSlider] = useState(0);
  const [sliderValue, setValue] = useState(5); // TODO: Neither this nor the var below is used, though the setters are called. Do the values have a function? (sb)
  const [inputFields, setInput] = useState({});
  const [incidentChoices, setIncidentChoices] = useState([]);
  const [reflectChoices, setReflectChoices] = useState([]);
  const [realm, setRealm] = useState(null);

  // setup functions
  function populateIncidentChoices(realm) {
    let schemaNumber = 0;
    let incTypes = types[0];
    let newIncidentChoices = [[],[],[],[]];

    for (const schemaName of incTypes) {
      console.log(
        `Retrieving objects with schema ${schemaName} from realm ${realm}`,
      );

      const iter = realm.objects(schemaName); // TODO: Add filtering such that only Tags with 'Incident' in the associates field are returned

      console.log(`Retrieved: ${iter}`);
      for (const entry of iter) {
        if (schemaName === 'Provider') {
          newIncidentChoices[schemaNumber].push({
            value: entry.firstName + ' ' + entry.lastName,
          });
        } else {
          newIncidentChoices[schemaNumber].push({
            value: entry.name,
          });
        }
      }
      schemaNumber++;
    }
    setIncidentChoices(newIncidentChoices);
  }

  function populateReflectChoices(realm) {
    let schemaNumber = reflectSchemaStartIndex;
    let reflectTypes = types[1].slice(reflectSchemaStartIndex);
    let tempReflect = baseReflectChoices;

    for (const schemaName of reflectTypes) {
      console.log(
        `Retrieving objects with schema ${schemaName} from realm ${realm}`,
      );

      const iter = realm.objects(schemaName); // TODO: Add filtering such that only Tags with 'Reflection' in the associates field are 

      console.log(`Retrieved: ${iter}`);
      for (const entry of iter) {
        if (schemaName === 'Provider') {
          tempReflect[schemaNumber].push({
            value: entry.firstName + ' ' + entry.lastName,
          });
        } else {
          tempReflect[schemaNumber].push({
            value: entry.name,
          });
        }
      }
      schemaNumber++;
    }
    setReflectChoices(tempReflect);
  }

  // set up realm on component mount, close it on component unmount
  useEffect(() => {
    Realm.open(defaultOpenParams).then(r => {
      console.log('opened realm');
      setRealm(r);
      populateIncidentChoices(r);
      populateReflectChoices(r);
    });

    return () => {
      if (realm !== null && !realm.isClosed) {
        console.log('closed realm');
        realm.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // empty dependency array used to ensure realm only opened once

  // display
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
            choices={sliderState == 0 ? incidentChoices : reflectChoices}
            labels={labels[sliderState]}
            inputHandler={setInput}
            refs={refs}
          />
        </View>
        <View style={{height: 20}} />
      </View>
      {DEBUG ? <TestRealmButtons /> : <View />}
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
