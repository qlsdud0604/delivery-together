import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Avatar, Title, Caption } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';

import USER_INFO from '../components/UserInfo';


export default class InfoPage extends React.Component {

    /* ChatPage 이동 함수 */
    chatPage() {
        if (USER_INFO.isLoggedIn === false)
            Alert.alert('로그인이 필요합니다.', '', [{ text: '확인', style: 'cancel' }]);
        else
            Actions.chatPage({ chatRoom: this.props.postUid + USER_INFO.uid, title: '채팅' });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 9 }}>
                    {/* 제목, 카테고리, 가격 */}
                    <View style={styles.titleStyle}>
                        <Avatar.Image
                            source={{ uri: this.props.postPhotoURL }}
                            size={55} />

                        <View>
                            <Title style={{ marginLeft: 15, fontSize: 20 }}>{this.props.postTitle}</Title>
                            <Caption style={{ marginLeft: 15, fontSize: 15 }} >작성자 : {this.props.postName}</Caption>
                        </View>
                    </View>

                    {/* 카테고리, 최대 지불가격 */}
                    <View style={styles.categoryStyle}>
                        <Caption style={{ fontSize: 13 }} >카테고리 : {this.props.postCategory}</Caption>
                        <Caption style={{ fontSize: 13 }}>최대 지불가격 : {this.props.postMoney}원</Caption>
                    </View>

                    {/* 내용 */}
                    <View style={styles.contentStyle}>
                        <Text style={{ fontSize: 17 }}>{this.props.postContent}</Text>
                    </View>
                </View>

                {/* 매칭 신청 버튼 */}
                <View style={{ flex: 1 }}>
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => this.chatPage()}>
                        <Text style={styles.buttonTextStyle}>매칭 신청</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleStyle: {
        flex: 3,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'flex-end',
        paddingLeft: 20,
        paddingBottom: 10,
        borderBottomWidth: 0.5,
        borderColor: '#ddd',
        width: 380
    },
    categoryStyle: {
        flex: 1,
        width: 380,
        paddingLeft: 20,
        borderBottomWidth: 0.5,
        borderColor: '#ddd',
        justifyContent: 'center'
    },
    contentStyle: {
        flex: 5,
        width: 380,
        paddingLeft: 20,
        paddingTop: 20
    },
    buttonStyle: {
        backgroundColor: "#000",
        width: 350,
        borderRadius: 25,
        marginVertical: 5,
        paddingVertical: 12
    },
    buttonTextStyle: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "500",
        textAlign: "center"
    }
})