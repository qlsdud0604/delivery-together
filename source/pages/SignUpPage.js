import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';

import { Actions } from 'react-native-router-flux';

import Form from '../components/Form';

export default class SignUpPage extends React.Component {

    loginPage(){
        Actions.pop();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Form type='Sign Up' />
                </View>

                <View style={styles.loginContainer}>
                    <Text style={styles.textStyle}>이미 계정이 있으신가요? </Text>
                    <TouchableOpacity onPress={this.loginPage}>
                        <Text style={styles.buttonStyle}> 로그인</Text>
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
    loginContainer: {
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