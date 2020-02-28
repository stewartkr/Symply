import React from 'react';
import { View, TextInput, Picker, TouchableOpacity, StyleSheet} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';


function AddAppointment(){

    state={language: 'example'}
    //switch this 
    updatePicker = (language) => {
        this.setState({language: language})
    }

    return(
       <View>  
           <View style={styles.textInputBox}>
                <TextInput
                placeholder='Name'
                />
            </View>
            <View style={styles.textInputBox}>
                <TextInput
                placeholder='Frequency (If applicable)'
                />
            </View>
            <View style={styles.textInputBox}>
                <TextInput
                placeholder='Dosage'
                />
            </View>

            {/* <Picker
                selectedValue={this.state.language}
                style={{ height: 50, width: 100 }}
                onValueChange={(itemValue, itemIndex) =>
                    this.setState({ language: itemValue })
                }>
                <Picker.Item label="tag 1" value="tag 1" />
                <Picker.Item label="tag 2" value="tag 2" />
            </Picker> */}
            {/* </View> */}
       </View>
    );
}

const styles = StyleSheet.create({
    textInputBox:{
        backgroundColor:'#fff',
        width:350,
        height:40,
        marginBottom:10,
        fontSize:100
    }
});

export default AddAppointment