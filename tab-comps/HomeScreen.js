import React, {useState, Component} from 'react';
import {Text, View, Button} from 'react-native';
import Slider from '@react-native-community/slider';
import {GlobalColors, GlobalStyle} from '../assets/GlobalStyle';

export function HomeScreen() {
  return (
    <View style={[GlobalStyle.container, {alignItems: 'center'}]}>
      <View
        style={{
          top: 10,
          width: '98%',
          height: '20%',
          backgroundColor: GlobalColors.softWhite,
          borderRadius: 20,
        }}>
        <Text style={GlobalStyle.titleText}>I'm feeling...</Text>
        <SliderContainer sliderMin="Worst pain" sliderMax="No pain" />
      </View>
      <View style={{position: 'relative', top: 20, flexDirection: 'row'}}>
        <Button
          title={'Add Symptom'}
          onPress={() => {
            console.log('add symptom');
          }}
        />
        <Button
          title={'Change Record'}
          onPress={() => {
            console.log('change record');
          }}
        />
      </View>
    </View>
  );
}

class SliderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {slider: 5};
  }

  render() {
    return (
      <View>
        {/*<View*/}
        {/*  style={{*/}
        {/*    backgroundColor: 'red',*/}
        {/*    alignSelf: 'center',*/}
        {/*    height: 12,*/}
        {/*    width: '80%',*/}
        {/*  }}*/}
        {/*/>*/}
        <Slider
          style={{width: '80%', height: 12, alignSelf: 'center'}}
          minimumValue={1}
          maximumValue={10}
          value={5}
          step={1}
          minimumTrackTintColor={GlobalColors.fontColor}
          maximumTrackTintColor={GlobalColors.fontColor}
          onValueChange={value => {
            console.log(value);
          }}
        />
        <Text
          style={[
            GlobalStyle.text,
            {position: 'absolute', right: '10%', top: 12, fontSize: 15},
          ]}>
          {this.props.sliderMin}
        </Text>
        <Text
          style={[
            GlobalStyle.text,
            {position: 'absolute', left: '10%', top: 12, fontSize: 15},
          ]}>
          {this.props.sliderMax}
        </Text>
      </View>
    );
  }
}
