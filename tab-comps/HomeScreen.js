import React, {useState, useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  Button,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {GlobalColors, GlobalStyle} from '../assets/GlobalStyle';
import TopBar from '../navigation/TopBar';
import {DEBUG} from '../debug/debugStatus';
import TestRealmButtons from '../debug/TestRealmButtons';

import SliderContainer from '../home/SliderContainer';
import ChoiceContainer from '../home/ChoiceContainer';

import {defaultOpenParams, dataEnum} from '../realm/DatabaseConfig';

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

const resetRefs = refs => {
  refs.forEach(ref => {
    if (ref !== null) {
      ref.setState({value: ''});
    }
  });
};

const populateChoices = (r, config, setChoices) => {
  const choices = [];

  for (let i = 0; i < config.normalChoices.length; i++) {
    choices.push(config.normalChoices[i]);
  }

  config.schemaTypes.forEach(schema => {
    // TODO: Add filtering such that only Tags with 'Incident' in the associates field are returned
    const data = r.objects(schema);
    const schemaChoices = [];
    data.forEach(entry => {
      schemaChoices.push(
        entry.firstName
          ? {value: `${entry.firstName} ${entry.lastName}`}
          : {value: entry.name},
      );
    });
    choices.push(schemaChoices);
  });

  setChoices(choices);
};

export function HomeScreen() {
  const refs = []; // references to Dropdown components for use in resetting values

  const choiceConfig = [
    {
      normalTypes: [],
      normalChoices: [],
      schemaTypes: ['Symptom', 'Provider', 'Treatment', 'Tag'],
      labels: ['I feel...', 'I can talk to...', 'I can try...', 'Tags'],
    },
    {
      normalTypes: ['Sleep', 'Diet'],
      normalChoices: [
        [
          // sleep duration
          {value: '>12 hours'},
          {value: '10-12 hours'},
          {value: '8-10 hours'},
          {value: '6-8 hours'},
          {value: '4-6 hours'},
          {value: '<4 hours'},
        ],
        [
          // diet quality
          {value: 'Great'},
          {value: 'Good'},
          {value: 'Okay'},
          {value: 'Poor'},
          {value: 'Bad'},
        ],
      ],
      schemaTypes: ['Activity', 'Tag'],
      labels: [
        'Last night, I slept...',
        'Today, my diet was...',
        'Today, I...',
        'Tags',
      ],
    },
  ];

  // state setup
  const [sliderState, setSlider] = useState(0);
  const [sliderValue, setValue] = useState(5);
  const [inputFields, setInput] = useState({});
  const [incidentChoices, setIncidentChoices] = useState([]);
  const [reflectChoices, setReflectChoices] = useState([]);
  const [realm, setRealm] = useState(null);
  const [debugVisible, setVisible] = useState(false);
  const [submitDisabled, disableSubmit] = useState(true);

  // set up realm on component mount, close it on component unmount
  useEffect(() => {
    Realm.open(defaultOpenParams).then(r => {
      setRealm(r);
      populateChoices(r, choiceConfig[0], setIncidentChoices);
      populateChoices(r, choiceConfig[1], setReflectChoices);

      r.addListener('change', () => {
        console.log('Listener triggered');
        populateChoices(r, choiceConfig[0], setIncidentChoices);
        populateChoices(r, choiceConfig[1], setReflectChoices);
      });
    });

    return () => {
      if (realm !== null && !realm.isClosed) {
        realm.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // empty dependency array used to ensure realm only opened once

  const changeInput = input => {
    const newInput = {};

    Object.keys(inputFields).forEach(key => {
      newInput[key] = inputFields[key];
    });

    Object.keys(input).forEach(key => {
      newInput[key] = input[key];
    });

    if (
      Object.keys(newInput).length === choiceConfig[sliderState].labels.length
    ) {
      disableSubmit(false);
    }

    setInput(newInput);
  };

  const submitInput = () => {
    const schemaType = sliderState === 0 ? 'Incident' : 'Reflection';
    const inputObject = {
      logDate: new Date(Date.now()),
      notes: [],
    };

    if (sliderState === 0) {
      inputObject.severity = sliderValue;
      inputObject.symptoms = [];
      inputObject.providers = [];
      inputObject.treatments = [];
      inputObject.tags = [];

      realm
        .objects('Symptom')
        .filtered(`name = "${inputFields.Symptom}"`)
        .forEach(symptom => {
          inputObject.symptoms.push(symptom);
        });

      const providerName = inputFields.Symptom.split(' ');

      realm
        .objects('Provider')
        .filtered(
          `firstName = "${providerName[0]}" and lastName = "${
            providerName[1]
          }"`,
        )
        .forEach(provider => {
          inputObject.providers.push(provider);
        });

      realm
        .objects('Treatment')
        .filtered(`name = "${inputFields.Treatment}"`)
        .forEach(treatment => {
          inputObject.treatments.push(treatment);
        });

      realm
        .objects('Tag')
        .filtered(`name = "${inputFields.Tag}"`)
        .forEach(tag => {
          inputObject.tags.push(tag);
        });
    } else {
      inputObject.diet = parseInt(
        Object.keys(dataEnum.diet).find(
          key => dataEnum.diet[key] === inputFields.Diet,
        ),
        10,
      );
      inputObject.sleepQuality = parseInt(
        Object.keys(dataEnum.diet).find(
          key => dataEnum.sleep[key] === inputFields.Sleep,
        ),
        10,
      );
      inputObject.sleepDuration = 0.0; // TODO: This puts dummy value
      inputObject.activities = [];

      realm
        .objects('Activity')
        .filtered(`name = "${inputFields.Activity}"`)
        .forEach(activity => {
          inputObject.activities.push(activity);
        });
    }
    realm.write(() => {
      realm.create(schemaType, inputObject);
    });

    disableSubmit(true);
    setInput({});
    resetRefs(refs);
  };

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
            minText={sliderText[sliderState].min}
            maxText={sliderText[sliderState].max}
            updateValue={setValue}
            sliderStyle={styles.slider}
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
          <ChoiceContainer
            config={choiceConfig[sliderState]}
            choices={sliderState === 0 ? incidentChoices : reflectChoices}
            refs={refs}
            changeInput={changeInput}
            submitInput={submitInput}
            submitDisabled={submitDisabled}
          />
        </View>
      </View>
      {DEBUG ? (
        <View>
          <TouchableOpacity
            onPress={() => {
              setVisible(true);
            }}>
            <Text>Open Debug</Text>
          </TouchableOpacity>
          <Modal visible={debugVisible}>
            <TestRealmButtons setVisible={setVisible} />
          </Modal>
        </View>
      ) : null}
    </SafeAreaView>
  );
}
