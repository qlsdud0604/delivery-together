import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Caption, Title } from "react-native-paper";

import firebaseConfig from '../config/FirebaseConfig';
import firebase from 'firebase';


/* 파이어베이스 연결 */
if (firebase.apps.length === 0)
    firebase.initializeApp(firebaseConfig);

export default function CompletedItem({ data }) {
    return (
        <View style={styles.itemStyle}>

            <View style={{ justifyContent: 'center' }}>
                {data[2] === 1 ? <Image source={require('../Images/1점.png')} style={{ width: 40, height: 40, marginRight: 15 }} /> :
                    data[2] === 2 ? <Image source={require('../Images/2점.png')} style={{ width: 40, height: 40, marginRight: 15 }} /> :
                        data[2] === 3 ? <Image source={require('../Images/3점.png')} style={{ width: 40, height: 40, marginRight: 15 }} /> :
                            data[2] === 4 ? <Image source={require('../Images/4점.png')} style={{ width: 40, height: 40, marginRight: 15 }} /> :
                                <Image source={require('../Images/5점.png')} style={{ width: 40, height: 40, marginRight: 15 }} />}
            </View>

            <View style={{ justifyContent: 'center', flex: 1 }}>
                <Title style={{ fontSize: 15 }}>{data[0]}</Title>
                <Caption style={{ fontSize: 12 }} >카테고리 : {data[1]}</Caption>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                <Text style={{ color: 'green' }}>{calDay(data[3])}</Text>
            </View>
        </View>
    )
}

/* 현재 날짜로부터 몇일이 지났는지 계산하는 함수 */
function calDay(num) {
    var now = Date.now();
    now = Math.floor(now / 8.64e+7);
    num = Math.floor(num / 8.64e+7);

    var result = now - num

    if (result === 0) {
        return ('오늘')
    } else {
        return (String(result) + '일 전')
    }
}

const styles = StyleSheet.create({
    itemStyle: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        marginTop: 10,

        padding: 10,
        height: 100,
        width: 400,
        borderWidth: 0.5,
        borderRadius: 10
    }
});

