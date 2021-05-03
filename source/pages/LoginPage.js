import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';

import { Actions } from 'react-native-router-flux';

import Form from '../components/Form';

export default class LoginPage extends React.Component {
    
    signUpPage(){
        Actions.signUpPage();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Form type='로그인' />
                </View>

                <View style={styles.signUpContainer}>
                    <Text style={styles.textStyle}>아직 계정이 없으신가요? </Text>
                    <TouchableOpacity onPress={this.signUpPage}>
                        <Text style={styles.buttonStyle}> 회원가입</Text>
                    </TouchableOpacity>
                </View>
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
    formContainer: {
        flex: 9,
        alignItems: 'center',
        justifyContent: 'center'
    },
    signUpContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15,
        flexDirection: 'row'
    },
    textStyle: {
        color: '#6e6e6e'
    },
    buttonStyle: {
        color: '#000',
        fontWeight: '500'
    },

})