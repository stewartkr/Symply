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

const GlobalColors = {
  backgroundColor: background_color,
  headerColor: header_color,
  footerColor: footer_color,
  fontColor: font_color,
  inactiveIconColor: inactive_icon_color,
  activeIconColor: active_icon_color,
  softWhite: soft_white
}

const GlobalStyle = StyleSheet.create({
  text: {
    fontSize: 18,
    fontFamily: 'Roboto',
    color: font_color
  },

  titleText: {
    fontSize: 40,
    fontFamily: 'Roboto',
    color: font_color,
    textAlign: 'center',
  },

  container: {
    flex: 1,
    backgroundColor: background_color,
  },

  logoContainer: {
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200
  },

  pinContainer: {
    alignContent: 'center'
  },

  pinTextInput: {
  
  },

  circle: {
    borderColor: circle_color,
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4
  }
}) 

export { GlobalStyle, GlobalColors };