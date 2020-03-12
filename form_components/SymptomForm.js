import React from 'react';
import { View, TextInput, KeyboardAvoidingView, TouchableOpacity, Text } from 'react-native';
import { GlobalStyle } from '../assets/GlobalStyle';
import { Formik } from 'formik';
import { ScrollView } from 'react-native-gesture-handler';


function SymptomForm({ addSymptom }) {

    return (
        <KeyboardAvoidingView behavior="padding">
            <ScrollView>
                <View style={GlobalStyle.formContainer}>
                    <Text style={GlobalStyle.formName}> New Symptom </Text>

                    <Formik
                        enableReinitialize
                        // rest of props for treatment form; , frequency:'', dosage:''
                        initialValues={{ name: '' }}
                        onSubmit={(values, actions) => {
                            actions.resetForm();
                            addSymptom(values);
                        }}
                    >
                        {(formProps) => (
                            <View>
                                <TextInput
                                    style={GlobalStyle.textInputBox}
                                    placeholder='Symptom (Ex. nausea, headache, etc.)'
                                    //two way data binding
                                    onChangeText={formProps.handleChange('name')}
                                    value={formProps.values.text}
                                />
                                <TouchableOpacity
                                    onPress={formProps.handleSubmit}
                                    style={GlobalStyle.addButton}
                                >
                                    <Text style={GlobalStyle.addButtonText}>Add Symptom</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Formik>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default SymptomForm;