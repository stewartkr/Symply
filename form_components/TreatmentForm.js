import React from 'react';
import { View, TextInput, KeyboardAvoidingView, TouchableOpacity, Switch, Text} from 'react-native';
import { GlobalStyle } from '../assets/GlobalStyle';
import { Formik } from 'formik';
import { ScrollView } from 'react-native-gesture-handler';


function TreatmentForm({ addTreatments }){

  return(
    // TODO: Debug KAV - padding looks hecka weird. (sb). Debug medication switch also.
    <KeyboardAvoidingView behavior="padding">
      <ScrollView>
        <View style={GlobalStyle.formContainer}>
          <Text style={GlobalStyle.formName}> New Treatment Information </Text>
          <Formik
            // rest of props for treatment form; , frequency:'', dosage:''
            initialValues={{ name: '', medication: false, dose:'', doseUnit:''}}
            onSubmit = {(values, actions) => {
              actions.resetForm();
              addTreatments(values);
            }}
          >
            {(formProps) => (
              <View>
                <TextInput
                  style={GlobalStyle.textInputBox}
                  placeholder='Treatment Name'
                  //two way data binding
                  onChangeText={formProps.handleChange('name')}
                  value={formProps.values.text}
                />

                {/* <Switch
                  onValueChange={formProps.handleChange('medication')}
                /> */}

                <TextInput
                  style={GlobalStyle.textInputBox}
                  placeholder='Dose'
                  onChangeText={formProps.handleChange('dose')}
                  value={formProps.values.frequency}
                  keyboardType='number-pad'
                />

                <TextInput
                  style={GlobalStyle.textInputBox}
                  placeholder='Dosage (If applicable)'
                  //two way data binding
                  onChangeText={formProps.handleChange('doseUnit')}
                  value={formProps.values.dosage}
                />

                <TouchableOpacity
                  onPress={formProps.handleSubmit}
                  style={GlobalStyle.addButton}
                >
                  <Text style={GlobalStyle.addButtonText}>Add Treatment</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default TreatmentForm
