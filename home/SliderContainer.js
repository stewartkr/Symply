import React from 'react';
import {View, Text} from 'react-native';
import Slider from '@react-native-community/slider';
import {GlobalColors, GlobalStyle} from '../assets/GlobalStyle';

export default function SliderContainer({
  minText,
  maxText,
  updateValue,
  sliderStyle,
}) {
  return (
    <View>
      <Slider
        style={sliderStyle}
        minimumValue={1}
        maximumValue={10}
        value={5}
        step={1}
        minimumTrackTintColor={GlobalColors.fontColor}
        maximumTrackTintColor={GlobalColors.fontColor}
        onSlidingComplete={newValue => {
          updateValue(newValue);
        }}
      />
      <Text
        style={[
          GlobalStyle.text,
          {position: 'absolute', right: '10%', top: 12, fontSize: 15},
        ]}>
        {minText}
      </Text>
      <Text
        style={[
          GlobalStyle.text,
          {position: 'absolute', left: '10%', top: 12, fontSize: 15},
        ]}>
        {maxText}
      </Text>
    </View>
  );
}
