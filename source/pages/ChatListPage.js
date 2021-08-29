import React from 'react';
import { FlatList, Text, StyleSheet, View, TouchableOpacity } from 'react-native';

import Item from '../components/ChatItem'
import firebase from 'firebase';
import firebaseConfig from '../config/FirebaseConfig';

import USER_INFO from "../components/UserInfo";

/* 파이버베이스 연결 */
if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

export default class ChatListPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [[]]
        }
    }

    /* 파이어베이스로부터 나의 채팅 리스트 로드 */
    componentDidMount() {
        //this.state.items.pop();

        var query = firebase.database().ref('Messages')

        query.on('value', (snapshot) => {
            const data = snapshot.val();

            for (var chatRoom in data) {

                if (USER_INFO.uid === chatRoom.substring(0, 28)) {
                    var getUserQuery = firebase.database().ref('UsersInfo/' + chatRoom.substring(28, 56))

                    getUserQuery.on('value', (snapshot) => {
                        const otherUser = snapshot.val();

                        this.state.items.push([otherUser.name, otherUser.profileImage, data[chatRoom].lastText, data[chatRoom].lastTextTime, chatRoom])
                    })
                }

                else if (USER_INFO.uid === chatRoom.substring(28, 56)) {
                    var getUserQuery = firebase.database().ref('UsersInfo/' + chatRoom.substring(0, 28))

                    getUserQuery.on('value', (snapshot) => {
                        const otherUser = snapshot.val();

                        this.state.items.push([otherUser.name, otherUser.profileImage, data[chatRoom].lastText, data[chatRoom].lastTextTime, chatRoom])

                    })
                }
            }
        })

    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    keyExtractor={item => item.toString()}
                    data={this.state.items}
                    renderItem={({ item }) => <Item data={item} />} />
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        alignItems: 'center'
    }
});
