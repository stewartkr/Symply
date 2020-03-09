import React from 'react';
import { View, TextInput, KeyboardAvoidingView, Picker, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { GlobalColors } from '../assets/GlobalStyle';
import { Formik, Form } from 'formik';
import { ScrollView } from 'react-native-gesture-handler';


function ProviderForm({ addProvider }) {

    return (
      <KeyboardAvoidingView behavior="padding">  
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.formName}> New Provider Information </Text>
            <Formik
                enableReinitialize
                // rest of props for treatment form; , frequency:'', dosage:''
                initialValues={{firstN: '', lastN:'', address:'', occupation:'' }}
                onSubmit={(values, actions) => {
                    actions.resetForm();
                    addProvider(values);

                }}
            >
                {(formProps) => (
                    <View>
                        <TextInput
                            style={styles.textInputBox}
                            placeholder='First Name'
                            //two way data binding
                            onChangeText={formProps.handleChange('firstN')}
                            value={formProps.values.text}
                        />
                        <TextInput
                            style={styles.textInputBox}
                            placeholder='Last Name'
                            //two way data binding
                            onChangeText={formProps.handleChange('lastN')}
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
                            placeholder='Occupation/Specialty'
                            //two way data binding
                            onChangeText={formProps.handleChange('occupation')}
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
        </ScrollView>
      </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: GlobalColors.backgroundColor,
        flex: 1,
        paddingTop: 100,
        alignContent: 'center'
    },
    textInputBox: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 5,
        fontSize: 18,
        borderRadius: 6,
        backgroundColor: '#EDEFEF',
        width: 400,
        alignSelf: 'center'
    },
    addButton: {
        backgroundColor: 'white',
        padding: 10,
        width: 200,
        left: 100
    },
    formName: {
        paddingBottom: 100,
        textAlign: 'center',
        fontSize: 50,
        color: '#5e5e5d'
    }
});

export default ProviderForm