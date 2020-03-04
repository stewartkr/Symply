import React from 'react';
import { View, TextInput, Picker, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { GlobalColors } from '../assets/GlobalStyle';
import { Formik, Form } from 'formik';


function ProviderForm({ addProvider }) {

    return (
        <View style={styles.container}>
            <Formik
                enableReinitialize
                // rest of props for treatment form; , frequency:'', dosage:''
                initialValues={{ text: '', field: '', address: '', primary_contact:'' }}
                onSubmit={(values, actions) => {
                    actions.resetForm();
                    addProvider(values);

                }}
            >
                {(formProps) => (
                    <View>
                        <TextInput
                            style={styles.textInputBox}
                            placeholder='Provider Name'
                            //two way data binding
                            onChangeText={formProps.handleChange('text')}
                            value={formProps.values.text}
                        />
                        <TextInput
                            style={styles.textInputBox}
                            placeholder='Specialization (?)'
                            //two way data binding
                            onChangeText={formProps.handleChange('field')}
                            value={formProps.values.field}
                        />
                        <TextInput
                            style={styles.textInputBox}
                            placeholder='Address (If applicable)'
                            //two way data binding
                            onChangeText={formProps.handleChange('address')}
                            value={formProps.values.address}
                        />
                        <TextInput
                            style={styles.textInputBox}
                            placeholder='Contact Number'
                            //two way data binding
                            onChangeText={formProps.handleChange('primary_contact')}
                            value={formProps.values.primary_contact}
                        />
                        <TouchableOpacity
                            onPress={formProps.handleSubmit}
                            style={styles.addButton}
                        >
                            <Text style={{ left: 45 }}>Add Provider</Text>
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

export default ProviderForm