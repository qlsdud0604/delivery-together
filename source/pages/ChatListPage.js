import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

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
            items: []
        }
    }

    /* 파이어베이스로부터 나의 채팅 리스트 로드 */
    componentDidMount() {
        setTimeout(() => { this.setState({ items: this.getChatData() }) }, 1000)
    }


    getChatData() {
        var chatList = []
        var query = firebase.database().ref('Messages')

        query.on('value', (snapshot) => {
            const data = snapshot.val();

            for (let chatRoom in data) {
                let check = true

                if (USER_INFO.uid === chatRoom.substring(0, 28)) {
                    let otherUid = chatRoom.substring(28, 56)
                    let getUserQuery = firebase.database().ref('UsersInfo/' + otherUid)
                    getUserQuery.on('value', (snapshot) => {
                        const otherUser = snapshot.val();
                        for (var x = 0; x < chatList.length; x++) {
                            if (otherUid === chatList[x].id)
                                check = false
                        }
                        if (check)
                            chatList.push({
                                id: otherUid,
                                name: otherUser.name,
                                url: otherUser.profileImage,
                                link: chatRoom,
                                lastText: data[chatRoom].lastText,
                                lastTextTime: data[chatRoom].lastTextTime,
                            }
                            )
                    })
                }
                else if (USER_INFO.uid === chatRoom.substring(28, 56)) {
                    let otherUid = chatRoom.substring(0, 28)
                    let getUserQuery = firebase.database().ref('UsersInfo/' + otherUid)
                    getUserQuery.on('value', (snapshot) => {
                        const otherUser = snapshot.val();

                        for (var x = 0; x < chatList.length; x++) {
                            if (otherUid === chatList[x].id)
                                check = false
                        }
                        if (check)
                            chatList.push({
                                id: otherUid,
                                name: otherUser.name,
                                url: otherUser.profileImage,
                                link: chatRoom,
                                lastText: data[chatRoom].lastText,
                                lastTextTime: data[chatRoom].lastTextTime,
                            }
                            )
                    })
                }
            }

        })
        return chatList
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
