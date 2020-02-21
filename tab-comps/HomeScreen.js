import React, {useState, Component} from 'react';
import {Text, View, Button, StyleSheet, Picker, FlatList} from 'react-native';
import Slider from '@react-native-community/slider';
import {Dropdown} from 'react-native-material-dropdown';
import {GlobalColors, GlobalStyle} from '../assets/GlobalStyle';

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

  return (
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
          title={'Add Record'}
          onPress={() => {
            console.log('add record');
          }}
        />
        <Button
          title={'Change Type'}
          onPress={() => {
            setSlider((sliderState + 1) % 2);
          }}
        />
      </View>
      <View style={{flex: 4, width: '96%', backgroundColor: 'red'}}>
        <RecordContainer inputHandler={setInput} />
      </View>
    </View>
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

const RecordContainer = ({inputHandler, types, labels, choices}) => {
  return (
    <View style={GlobalStyle.container}>
      <IncidentContainer
        inputHandler={inputHandler}
        types={['Symptom', 'Provider', 'Treatment', 'Tag']}
        labels={['I feel...', 'I can talk to...', 'I can try...', 'Tags']}
        choices={[
          [{value: 'Stomachache'}, {value: 'Headache'}, {value: 'Heartburn'}],
          [{value: 'John Smith'}, {value: 'Michelle Alphabet'}],
          [{value: 'Soup'}],
          [{value: 'Physical'}, {value: 'Mental'}],
        ]}
      />
    </View>
  );
};

const IncidentContainer = ({inputHandler, types, labels, choices}) => {
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
        }}
      />
    </View>
  );
};
