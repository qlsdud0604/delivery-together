import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';

import firebaseConfig from '../config/FirebaseConfig';

/* 파이어베이스 연결 */
if (firebase.apps.length === 0)
    firebase.initializeApp(firebaseConfig);

export default class LoginPage extends React.Component {

    /* 사용자가 이미 로그인한 상태인지 확인 */
    isUserEqual = (googleUser, firebaseUser) => {
        if (firebaseUser) {
            var providerData = firebaseUser.providerData;
            for (var i = 0; i < providerData.length; i++) {
                if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                    providerData[i].uid === googleUser.getBasicProfile().getId()) {
                    return true;
                }
            }
        }
        return false;
    }

    /* 로그인한 상태가 아닌 경우 로그인 수행 */
    onSignIn = (googleUser) => {
        var unsubscribe = firebase.auth().onAuthStateChanged(function (firebaseUser) {
            unsubscribe();

            if (!this.isUserEqual(googleUser, firebaseUser)) {
                var credential = firebase.auth.GoogleAuthProvider.credential(
                    googleUser.idToken,
                    googleUser.accessToken
                );

                firebase.auth().signInWithCredential(credential).then(function (result) {
                    firebase.database().ref('UsersInfo/' + result.user.uid).set({
                        gmail: result.user.email,
                        profile_picture: result.user.photoURL,
                        first_name: result.user.displayName,
                        phoneNumber: result.user.phoneNumber,
                        created_at: Date.now()

                    })
                }).catch(function (error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    var email = error.email;
                    var credential = error.credential;
                });
            }
        }.bind(this));
    }

    /* 구글 로그인 요청 */
    signInWithGoogleAsync = async () => {
        try {
            const result = await Google.logInAsync({
                //androidClientId: YOUR_CLIENT_ID_HERE,
                //behavior: 'web',
                iosClientId: '173212582846-2rnqms8pv2ivvu4s7blq6jn00f6d2g17.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
                this.onSignIn(result);
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