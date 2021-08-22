import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import firebaseConfig from '../config/FirebaseConfig';
import firebase from 'firebase';

import USER_INFO from '../components/UserInfo';


/* 파이어베이스 연결 */
if (firebase.apps.length === 0)
    firebase.initializeApp(firebaseConfig);

export default class ChatPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            name:'',
            photoURL:''
        };
    }

    componentDidMount() {
        this.loadMessages(message => {
            this.setState(previousState => {
                return {
                    messages: GiftedChat.append(previousState.messages, message)
                };
            });
        });

        var query = firebase.database().ref('UsersInfo').orderByKey();

        query.on('value', (snapshot) => {
            const data = snapshot.val();
            this.setState({ name: data[USER_INFO.uid].name });
            this.setState({ photoURL: data[USER_INFO.uid].profileImage });
        })
    }

    componentWillUnmount() {
        if (firebase.database().ref('Messages/' + this.props.uid + USER_INFO.uid))
            firebase.database().ref('Messages/' + this.props.uid + USER_INFO.uid).off();
    }

    /* 메시지 전송 */
    sendMessage(message = []) {
        let today = new Date();
        let timestamp = today.toISOString();

        firebase.database().ref('Messages/' + this.props.uid + USER_INFO.uid).push({
            _id: message[0]._id,
            createdAt: timestamp,
            text: message[0].text,
            user: message[0].user
        })
    }

    /* 메시지 로드*/
    loadMessages(callback) {
        firebase.database().ref('Messages/' + this.props.uid + USER_INFO.uid).off();

        const onReceive = data => {
            const message = data.val();
            callback({
                _id: message._id,
                createdAt: message.createdAt,
                text: message.text,
                user: message.user
            });
        };

        firebase.database().ref('Messages/' + this.props.uid + USER_INFO.uid).orderByChild('createdAt').limitToLast(35).on('child_added', onReceive);
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
                        _id: USER_INFO.uid,
                        name: this.state.name,
                        avatar: this.state.photoURL
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