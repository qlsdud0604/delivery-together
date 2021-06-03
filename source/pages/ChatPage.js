import React, { useLayoutEffect, useCallback,useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

import firebaseConfig from '../config/FirebaseConfig';
import firebase from 'firebase';
import { db, auth } from '../config/FirebaseConfig';


if (firebase.apps.length === 0)
    firebase.initializeApp(firebaseConfig);

const ChatPage = () => {
    const [messages, setMessages] = useState([]);

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


    return (
        <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={true}
            onSend={messages => onSend(messages)}
            user={{
                _id: auth?.currentUser?.email,
                name: auth?.currentUser?.displayName,
                avatar: auth?.currentUser?.photoURL
            }}
        />
    )
}

export default ChatPage