import React, { useLayoutEffect, useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';

import firebaseConfig from '../config/FirebaseConfig';
import firebase from 'firebase';
import { db, auth } from '../config/FirebaseConfig';
import { Actions } from 'react-native-router-flux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


if (firebase.apps.length === 0)
    firebase.initializeApp(firebaseConfig);

const ChatPage = () => {
    const [messages, setMessages] = useState([]);

    /* 메시지를 시간 순서대로 정렬 */
    useLayoutEffect(() => {
        const unsubscribe = db.collection('chats').
            orderBy('createdAt', 'desc').onSnapshot
            (snapshot => setMessages(
                snapshot.docs.map(doc => ({
                    _id: doc.data()._id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user: doc.data().user
                }))
            ))
        return unsubscribe;
    }, [])

    /* 메시지 전송 버튼 클릭 시 동작 정의 메소드 */
    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        const {
            _id,
            createdAt,
            text,
            user
        } = messages[0]

        db.collection('chats').add({
            _id,
            createdAt,
            text,
            user
        })
    }, [])

    /* 말풍선 커스텀 */
    const renderBubble = (props) => {
        return (
            <Bubble  {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#159DF7'
                    }
                }}
                textStyle={{
                    right: {
                        color: '#fff'
                    }
                }} />
        );
    }

    /* 텍스트바 커스텀 */
    const renderSend = (props) => {
        return (
            <Send {...props}>
                <View>
                    <MaterialCommunityIcons
                        name='send-circle'
                        style={{ marginBottom: 7, marginRight: 7 }}
                        size={30}
                        color='#159DF7' />
                </View>
            </Send>
        );
    }

    return (
        <View style={styles.container}>
            <GiftedChat
                style={styles.container}
                messages={messages}
                showAvatarForEveryMessage={true}
                onSend={messages => onSend(messages)}
                user={{
                    _id: auth?.currentUser?.email,
                    name: auth?.currentUser?.displayName,
                    avatar: auth?.currentUser?.photoURL
                }}
                alwaysShowSend
                renderBubble={renderBubble}
                renderSend={renderSend}
                placeholder='메시지를 입력해주세요.'
            />
        </View>

    )
}

export default ChatPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})