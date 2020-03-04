import React from 'react';
import { View, TextInput, Picker, TouchableOpacity, StyleSheet, Text} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { GlobalColors } from '../assets/GlobalStyle';
import { Formik, Form } from 'formik';


function TreatmentForm({ addTreatments }){

    return(
       <View style={styles.container}>  
           <Formik
           // rest of props for treatment form; , frequency:'', dosage:''
                initialValues={{ text: '', frequency:'', dosage:''}}
            onSubmit = {(values, actions) => {
                actions.resetForm();
                addTreatments(values);
                
            }}
           >
               {(formProps) => (
                   <View>
                       <TextInput 
                            style={styles.textInputBox}
                            placeholder='Treatment Name'
                            //two way data binding
                            onChangeText={formProps.handleChange('text')}
                            value={formProps.values.text}
                       />
                        <TextInput
                            style={styles.textInputBox}
                            placeholder='Frequency'
                            //two way data binding
                            onChangeText={formProps.handleChange('frequency')}
                            value={formProps.values.frequency}
                        /> 
                        <TextInput
                            style={styles.textInputBox}
                            placeholder='Dosage (If applicable)'
                            //two way data binding
                            onChangeText={formProps.handleChange('dosage')}
                            value={formProps.values.dosage}
                        />  
                        <TouchableOpacity
                            onPress={formProps.handleSubmit}
                            style={styles.addButton}
                        >
                            <Text style={{ left: 30 }}>Add Treatment</Text>
                        </TouchableOpacity>
                   </View>
               )}
           </Formik>
       </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: GlobalColors.backgroundColor,
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    textInputBox: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 5,
        fontSize: 18,
        borderRadius: 6,
        backgroundColor: '#EDEFEF'
    },
    addButton: {
        backgroundColor: 'white',
        padding: 10,
        width: 200,
        left: 100
    }
});

export default TreatmentForm