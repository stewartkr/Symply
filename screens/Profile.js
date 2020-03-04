import React, { Component } from 'react';
import { StyleSheet, View, Button, Text, TouchableOpacity } from 'react-native';

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
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Treatments')}
                    >
                    <Text style={styles.buttonText}>Your Treatments</Text>
                    </TouchableOpacity>

            </View>
            <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Providers')}
                    >
                    <Text style={styles.buttonText}>Your Providers</Text>
                    </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Preferences')}
                    >
                    <Text style={styles.buttonText}>Preferences</Text>
                    </TouchableOpacity>
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
        backgroundColor:'#f7f7f0',
        borderRadius: 5,
        marginTop:15,
        width:400,
        height:40,
        alignItems:'center'

    },
    buttonText:{
        fontSize:20,
        color:'#5e5e5d',
        lineHeight:40
    }

});
