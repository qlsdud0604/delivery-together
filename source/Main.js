import React from 'react';
import { StyleSheet, View } from 'react-native';

import MainPage from './pages/MainPage';

export default class Main extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <MainPage />
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});