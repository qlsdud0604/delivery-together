import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import MapView from 'react-native-maps';

export default class MapPage extends React.Component {

    render() {
        return (
            <MapView
                style={styles.container}
                showsUserLocation />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})