import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as Google from 'expo-google-app-auth';


export default class LoginPage extends React.Component {

    signInWithGoogleAsync = async () => {
        try {
            const result = await Google.logInAsync({
                //androidClientId: YOUR_CLIENT_ID_HERE,
                //behavior: 'web',
                iosClientId: '874477126743-14qu6m36hc483urbpm6gonq558i1jep2.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
                return result.accessToken;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.buttonStyle} onPress={() => this.signInWithGoogleAsync()}>
                    <Text style={styles.textStyle}>Google 로그인</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonStyle: {
        backgroundColor: "#000",
        width: 350,
        borderRadius: 25,
        marginVertical: 5,
        paddingVertical: 12
    },
    textStyle: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "500",
        textAlign: "center"
    }

})