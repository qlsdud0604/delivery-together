import React from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import * as Location from 'expo-location';

import INFO from '../components/MatchingInfo';

export default class LoadingPage extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textStyle}>Loading...</Text>
            </View>
        )
    }

    async componentDidMount() {
        /* 사용자 위치 정보 획득 */
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted')
                Alert.alert('위치정보 사용이 거부되었습니다.');

            let location = await Location.getCurrentPositionAsync({});

            INFO.latitude = location.coords.latitude;
            INFO.longitude = location.coords.longitude;

            console.log(INFO);
        } catch (error) {
            Alert.alert('오류');

        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyle: {
        fontSize: 20
    }
});