import React from 'react';
import { View, TextInput, Picker, TouchableOpacity, StyleSheet, Text} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { GlobalColors } from '../assets/GlobalStyle';
import { Formik, Form } from 'formik';


function TreatmentForm({ addTreatments }){

    return(
        
       <View style={styles.container}>  
            <Text style={styles.formName}> New Treatment Information </Text>
           <Formik
           // rest of props for treatment form; , frequency:'', dosage:''
                initialValues={{ name: '', medication:'', dose:'', doseUnit:''}}
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
                            onChangeText={formProps.handleChange('name')}
                            value={formProps.values.text}
                       />
                        <TextInput
                            style={styles.textInputBox}
                            placeholder='Dose'
                            onChangeText={formProps.handleChange('dose')}
                            value={formProps.values.frequency}
                        /> 
                        <TextInput
                            style={styles.textInputBox}
                            placeholder='Dosage (If applicable)'
                            //two way data binding
                            onChangeText={formProps.handleChange('doseUnit')}
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
        alignContent: 'center',
        flex:1,
        paddingTop:100
    },
    textInputBox: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 5,
        fontSize: 18,
        borderRadius: 6,
        backgroundColor: '#EDEFEF',
        width:400,
        alignSelf:'center'
    },
    addButton: {
        backgroundColor: 'white',
        padding: 10,
        width: 200,
        left: 100
    },
    formName:{
        paddingBottom:100,
        textAlign:'center',
        fontSize:50,
        color: '#5e5e5d'
    }
});

export default TreatmentForm