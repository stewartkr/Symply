import { StyleSheet } from 'react-native';

const backgroundColor = "#9bcdd5";
const pinContainerBackground = "#BAE0E6";
const circleColor = "#85b0b7";
const headerColor = "#D1D1D1";
const footerColor = "#D1D1D1";
const fontColor = "#878786";
const inactiveIconColor = "#878786";
const activeIconColor = "#005BC7";
const softWhite = "#F6F6FA";


export const GlobalColors = StyleSheet.create({
  backgroundColor: backgroundColor,
  headerColor: headerColor,
  footerColor: footerColor,
  fontColor: fontColor,
  inactiveIconColor: inactiveIconColor,
  activeIconColor: activeIconColor,
  softWhite: softWhite,
})

export const GlobalStyle = StyleSheet.create({
  text: {
    fontSize: 18,
    fontFamily: 'Roboto',
    color: fontColor,
  },

  titleText: {
    fontSize: 22,
    fontFamily: 'Roboto',
    color: fontColor
  },

  container: {
    flex: 1,
    backgroundColor: backgroundColor,
  },

  pinContainer: {
    backgroundColor: pinContainerBackground
  },

  pinTextInput: {
    backgroundColor: softWhite,
  },

  circle: {
    borderColor: circleColor,
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 4
  }
}) 