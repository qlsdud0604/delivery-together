import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';

import { Actions } from 'react-native-router-flux';

import Form from '../components/Form';

export default class LoginPage extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Form />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})