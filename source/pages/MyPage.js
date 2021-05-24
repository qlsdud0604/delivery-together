import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Avatar, Title, Caption } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import firebase from 'firebase';
import firebaseConfig from '../config/FirebaseConfig';
import USER_INFO from '../components/UserInfo';

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

export default class MyPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: USER_INFO.name,
            email: USER_INFO.email,
            photoUrl: USER_INFO.photoURL,
            phoneNumber: USER_INFO.phoneNumber
        }
    }

    /* 로그아웃 함수 */
    logout() {
        USER_INFO.isLoggedIn = false;
        firebase.auth().signOut();
    }

    render() {
        return (
            <View style={styles.container}>

                {/* 사용자 정보 */}
                <View style={styles.userInfoStyle}>
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <Avatar.Image
                            source={{ uri: this.state.url }}
                            size={70} />
                        <View style={{ marginLeft: 20, justifyContent: 'center' }}>
                            <Title style={[styles.nameStyle,
                            {
                                marginTop: 15,
                                marginBottom: 5
                            }]}>{this.state.name}</Title>
                            <Caption style={styles.emailStyle}>{this.state.email}</Caption>
                        </View>
                    </View>
                </View>

                {/* 매칭 정보 */}
                <View style={styles.boxWrapperStyle}>
                    <View style={[styles.boxStyle, {
                        borderRightColor: '#ddd',
                        borderRightWidth: 1,
                    }]}>
                        <Title>0.0 / 5</Title>
                        <Caption>매너 점수</Caption>
                    </View>
                    <View style={styles.boxStyle}>
                        <Title>0</Title>
                        <Caption>성사된 거래</Caption>
                    </View>
                </View>

                <View style={{ flex: 0.1 }}></View>

                {/* 메뉴 */}
                <View style={styles.menuStyle}>

                    <TouchableOpacity >
                        <View style={styles.menuItemStyle}>
                            <Icon name='ios-chatbubble-ellipses' size={22} color='#000' />
                            <Text style={styles.menuTextStyle}>채팅 목록</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <View style={styles.menuItemStyle}>
                            <Icon name='ios-document' size={22} color='#000' />
                            <Text style={styles.menuTextStyle}>등록 게시물</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <View style={styles.menuItemStyle}>
                            <Icon name='ios-person-circle' size={22} color='#000' />
                            <Text style={styles.menuTextStyle}>프로필 수정</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.logout()}>
                        <View style={styles.menuItemStyle}>
                            <Icon name='ios-log-out' size={22} color='red' />
                            <Text style={[styles.menuTextStyle, { color: 'red' }]}>로그아웃</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>


        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    userInfoStyle: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    nameStyle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    emailStyle: {
        fontSize: 15,
        lineHeight: 15,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    boxWrapperStyle: {
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
    },
    boxStyle: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuStyle: {
        marginTop: 10,
    },
    menuItemStyle: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuTextStyle: {
        color: '#000',
        marginLeft: 20,
        fontWeight: '500',
        fontSize: 15,
        lineHeight: 25,
    }
});