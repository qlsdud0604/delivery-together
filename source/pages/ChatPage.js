import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
import firebaseConfig from '../config/FirebaseConfig';
import firebase from 'firebase';
import { auth } from '../config/FirebaseConfig';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

/* 파이어베이스 연결 */
if (firebase.apps.length === 0)
    firebase.initializeApp(firebaseConfig);

const database = firebase.database().ref("messages");

export default class ChatPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            message: []
        };
    }

    componentDidMount() {
        this.loadMessage(message => {
            this.setState(
                previousState => ({
                    messages: GiftedChat.append(previousState.messages, messages)
                })
            );
        })
    }

    /* 메시지 로드 */
    loadMessage(callback) {
        firebase.database().ref('messages').off();

        const onReceive = data => {
            const message = data.val();

            callback({
                _id: data.key,
                text: message.text,
                createdAt: message.createdAt,
                user: message.user
            })
        }


    }

    /* 메시지 전송 */
    sendMessage(message = []) {
        
        let today = new Date();
        let timestamp = today.toISOString();

        firebase.database().ref('messages').push({
            _id: message[0]._id,
            createdAt: timestamp,
            text: message[0].text,
            user: message[0].user
        })
    }

    /* 말풍선 커스텀 */
    renderBubble = (props) => {
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
    renderSend = (props) => {
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

    render() {
        return (
            <View style={styles.container}>
                <GiftedChat
                    style={styles.container}
                    messages={this.state.messages}
                    showAvatarForEveryMessage={true}
                    onSend={message => this.sendMessage(message)}
                    user={{
                        _id: auth?.currentUser?.email,
                        name: auth?.currentUser?.displayName,
                        avatar: auth?.currentUser?.photoURL
                    }}
                    alwaysShowSend
                    renderBubble={this.renderBubble}
                    renderSend={this.renderSend}
                    placeholder='메시지를 입력해주세요.'
                />
            </View>

        )
    }
} ``

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})