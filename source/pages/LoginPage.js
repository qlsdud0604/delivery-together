import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';

import USER_INFO from '../components/UserInfo';
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

                    var query = firebase.database().ref('userInfo').orderByKey();

                    query.on('value', (snapshot) => {
                        const data = snapshot.val();

                        if (!(result.user.uid in data)) {
                            firebase.database().ref('userInfo/' + result.user.uid).set({
                                profileImage: result.user.photoURL,
                                name: result.user.displayName,
                                createdAt: Date.now()

                            })
                        }
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
                //behavior: 'web',
                androidClientId: '173212582846-agrook6pkl3144a383j2bt1sf2i2pfmp.apps.googleusercontent.com',
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
                <TouchableOpacity style={styles.buttonStyle01} onPress={() => this.signInWithGoogleAsync()}>
                    <Text style={styles.textStyle}>Google 로그인</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonStyle02} >
                    <Text style={styles.textStyle}>Facebook 로그인</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonStyle03} >
                    <Text style={styles.textStyle}>Kakao 로그인</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonStyle04} >
                    <Text style={styles.textStyle}>Naver 로그인</Text>
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
    buttonStyle01: {
        backgroundColor: "#000",
        width: 350,
        borderRadius: 25,
        marginVertical: 5,
        paddingVertical: 12
    },
    buttonStyle02: {
        backgroundColor: "#3b5998",
        width: 350,
        borderRadius: 25,
        marginVertical: 5,
        paddingVertical: 12
    },
    buttonStyle03: {
        backgroundColor: "#FEE500",
        width: 350,
        borderRadius: 25,
        marginVertical: 5,
        paddingVertical: 12
    },
    buttonStyle04: {
        backgroundColor: "#2DB400",
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