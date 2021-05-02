import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, TextInput } from 'react-native';

export default class Form extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.inputStyle}
                    placeholder='Email'
                    selectionColor="#6E6E6E"
                    keyboardType="email-address" />
                <TextInput style={styles.inputStyle}
                    placeholder='Password'
                    selectionColor="#6E6E6E"
                    secureTextEntry={true} />
                <TouchableOpacity style={styles.buttonStyle}>
                    <Text style={styles.textStyle}>Login</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputStyle: {
        width: 300,
        borderWidth: 1,
        fontSize: 15,
        marginVertical: 5,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 25
    },
    buttonStyle: {
        backgroundColor: "#000000",
        width: 300,
        borderRadius: 25,
        marginVertical: 5,
        paddingVertical: 12
    },
    textStyle: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "500",
        textAlign: "center"
    }
})