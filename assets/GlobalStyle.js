import { StyleSheet } from 'react-native';

const background_color = "#9bcdd5";
const pin_container_background = "#BAE0E6";
const circle_color = "#85b0b7";
const header_color = "#D1D1D1";
const footer_color = "#D1D1D1";
const dropdown_bg_color = "#D1D1D1";
const font_color = "#878786";
const inactive_icon_color = "#878786";
const active_icon_color = "#005BC7";
const soft_white = "#F6F6FA";
const grey = "#808080";
const soft_grey = "#878786";
const light_grey = "#a9a9a9";

const GlobalColors = {
  backgroundColor: background_color,
  pinContainerBG: pin_container_background,
  circleColor: circle_color,
  headerColor: header_color,
  footerColor: footer_color,
  dropdownBGColor: dropdown_bg_color,
  fontColor: font_color,
  inactiveIconColor: inactive_icon_color,
  activeIconColor: active_icon_color,
  softWhite: soft_white,
  grey: grey,
  softGrey: soft_grey,
  lightGrey: light_grey
}

const GlobalStyle = StyleSheet.create({
  text: {
    fontSize: 18,
    fontFamily: 'Roboto-Light',
    color: font_color,
  },

  addButtonText: {
    fontSize: 18,
    fontFamily: 'Roboto-Light',
    color: font_color,
    textAlign: 'center',
  },

  titleText: {
    fontSize: 50,
    fontFamily: 'Roboto-Thin',
    color: font_color,
    textAlign: 'center',
    textAlignVertical: 'center'
  },

  container: {
    flex: 1,
    backgroundColor: background_color,
  },

  formContainer: {
    backgroundColor: background_color,
    flex:1,
    paddingTop: 100,
    alignContent:'center'
  },

  listContainer: {
    flex: 1,
    marginTop: 2,
  },

  textInputBox: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 5,
    fontSize: 18,
    borderRadius: 6,
    backgroundColor: soft_white,
    width: 400,
    alignSelf: 'center'
  },

  formName: {
    height: 250,
    textAlign: 'center',
    fontSize: 50,
    color: font_color
  },

  providerFormName: {
    height: 200,
    textAlign: 'center',
    fontSize: 50,
    color: font_color
  },

  addButton:{
    backgroundColor: soft_white,
    padding: 10,
    width: 200,
    left: 100,
    marginBottom: 10,
    borderRadius: 10
  },

  backButton:{
    marginTop: 50,
    alignSelf: 'flex-end',
    width:55,
    height:35,
    paddingTop:5,
    fontSize:100,
    borderRadius:5,
    right:1
  }
})

export { GlobalStyle, GlobalColors };
