import React, { Component } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';

function Greeting({name}){
    return(
        <View style={styles.greetingContainer}>
            <Text style={styles.greeting}>Greetings</Text>
            <Text style={{fontSize: 50, textAlign:'center'}}>{name}</Text>
        </View>
    );
}
function Profile({navigation}){
    return (
        <View style={styles.container}>
            <Greeting name='User'/>
        <View style={styles.navButtons}>
            <View style={styles.buttonContainer}>
                <View style={styles.realButtonContainer}>
                    <Button color='grey' title='Your Treatments' onPress={() => navigation.navigate('Treatments')}/>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.realButtonContainer}>
                    <Button color='grey' title='Your Providers' onPress={() => navigation.navigate('Providers')}/>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.realButtonContainer}>
                    <Button color='grey' title='Preferences' onPress={() => navigation.navigate('Preferences')}/>
                </View>
            </View>
        </View>
        </View>
    );
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#9bcdd5",
        alignItems: 'center',
        justifyContent:'center'
    },
    navButtons:{
        flex: 2
    },
    greetingContainer:{
        flex:1,
        paddingTop: 50
    },
    greeting:{
        fontSize:50
    },
    styleButton:{
        fontSize:25
    },
    buttonContainer:{
        backgroundColor:'grey',
        borderRadius: 5,
        marginTop:15,
        width:400,
        height:40
    },
    realButtonContainer:{
        flex:1,
        justifyContent:'center',
        backgroundColor: 'grey'
    }

});
