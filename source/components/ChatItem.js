import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Caption, Title } from "react-native-paper";

import firebaseConfig from '../config/FirebaseConfig';
import firebase from 'firebase';

import { Actions } from 'react-native-router-flux';


/* 파이어베이스 연결 */
if (firebase.apps.length === 0)
    firebase.initializeApp(firebaseConfig);

export default function ChatItem({ data }) {

    function chatPage() {
        Actions.chatPage({ chatRoom: data[4], title: '채팅' })
    }


    return (
        <View >
            <TouchableOpacity style={styles.itemStyle} onPress={chatPage}>
                <Image source={{ uri: data.url }} style={{ width: 60, height: 60, borderRadius: 30, marginTop: 10, marginRight: 20 }} />

                <View style={{ justifyContent: 'center', flex: 1 }}>
                    <Title style={{ fontSize: 18 }}>{data.name}</Title>
                    <Caption style={{ fontSize: 13 }} >마지막 대화 : {data.lastText}</Caption>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                    <Text style={{ color: 'green' }}>{calDay(data.lastTextTime)}</Text>
                </View>
            </TouchableOpacity>
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

