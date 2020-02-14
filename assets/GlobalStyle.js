import { StyleSheet } from 'react-native';

const background_color = "#9bcdd5";
const pin_container_background = "#BAE0E6";
const circle_color = "#85b0b7";
const header_color = "#D1D1D1";
const footer_color = "#D1D1D1";
const font_color = "#878786";
const inactive_icon_color = "#878786";
const active_icon_color = "#005BC7";
const soft_white = "#F6F6FA";

export const GlobalColors = StyleSheet.create({
  backgroundColor: background_color,
  headerColor: header_color,
  footerColor: footer_color,
  fontColor: font_color,
  inactiveIconColor: inactive_icon_color,
  activeIconColor: active_icon_color,
  softWhite: soft_white
})

export const GlobalStyle = StyleSheet.create({
  text: {
    fontSize: 18,
    fontFamily: 'Roboto',
    color: font_color
  },

  titleText: {
    fontSize: 22,
    fontFamily: 'Roboto',
    color: font_color
  },

  container: {
    flex: 1,
    backgroundColor: background_color
  },

  pinContainer: {
    backgroundColor: pin_container_background
  },

  pinTextInput: {
    backgroundColor: soft_white
  },

  circle: {
    borderColor: circle_color,
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 4
  }
}) 