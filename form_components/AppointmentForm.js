import React from 'react';
import { View, TextInput, Picker, TouchableOpacity, StyleSheet, Text} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { GlobalColors } from '../assets/GlobalStyle';
import { Formik } from 'formik';
import {
    defaultOpenParams,
    allSchemas,
} from '../realm/DatabaseConfig';

// const Realm = require('realm');

function AppointmentForm({ addAppoint, goBack }){

    return(
        
       <View style={styles.container}>  
            <Text style={styles.formName}> New Appointment Information </Text>
           <Formik
            initialValues = {{provider:'', time:'', notes:''}}
            onSubmit = {(values, actions) => {
                console.log(values.provider);
                actions.resetForm();
                addAppoint(values);
            }}
           >
               {(formProps) => (
                   <View>
                       <TextInput 
                            style={styles.textInputBox}
                            placeholder='Appointment With'
                            //two way data binding
                            onChangeText={formProps.handleChange('text')}
                            value={formProps.values.text}
                       />
                        <TextInput
                            style={styles.textInputBox}
                            placeholder='Day'
                            //two way data binding
                            onChangeText={formProps.handleChange('time')}
                            value={formProps.values.time}
                        /> 
                        <TextInput
                            style={styles.textInputBox}
                            placeholder='Time'
                            //two way data binding
                            onChangeText={formProps.handleChange('notes')}
                            value={formProps.values.notes}
                        />  
                        <TouchableOpacity
                            onPress={formProps.handleSubmit}
                            style={styles.addButton}
                        >
                            <Text style={{left:30}}>Add Appointment</Text>
                        </TouchableOpacity>
                   </View>
               )}
           </Formik>
       </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: GlobalColors.backgroundColor,
        flex:1,
        paddingTop: 100,
        alignContent:'center'
    },
    textInputBox:{
        borderWidth: 1,
        padding: 10, 
        marginBottom: 5,
        fontSize: 18,
        borderRadius: 6,
        backgroundColor:'#EDEFEF',
        width: 400,
        alignSelf: 'center'
    },
    addButton:{
        backgroundColor:'white',
        padding:10,
        width:200,
        left:100
    },
    formName: {
        paddingBottom: 100,
        textAlign: 'center',
        fontSize: 50,
        color: '#5e5e5d'
    }
});

export default AppointmentForm