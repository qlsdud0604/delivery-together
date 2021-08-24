import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';

import MATCHING_INFO from '../components/MatchingInfo';
import USER_INFO from '../components/UserInfo';
import firebaseConfig from '../config/FirebaseConfig';

/* 파이어베이스 연결 */
if (firebase.apps.length === 0)
    firebase.initializeApp(firebaseConfig);

/* 스크린 빈공간을 눌렀을 때 키보드 제거 함수 */
const DissmissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

export default class CurrentPostPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            category: '',
            money: '',
            content: ''
        };
        // MATCHING_INFO.matchingPage = this;
    }

    componentDidMount() {
        var query = firebase.database().ref('MatchingInfo').orderByKey();

        query.on('value', (snapshot) => {
            const data = snapshot.val();
            if ((USER_INFO.uid in data)) {
                this.setState({
                    title: data[USER_INFO.uid].title,
                    category: data[USER_INFO.uid].category,
                    money: data[USER_INFO.uid].money,
                    content: data[USER_INFO.uid].content
                });
            }
        })


    }

    /* CategoryPage 이동 함수 */
    categoryPage() {
        Actions.categoryPage();
    }

    /* 양식 입력 확인 함수 */
    checkTextInput() {
        let state = this.state;

        if (state.title === '' || state.category === '카테고리 선택' || state.money === '' || state.content === '')
            Alert.alert('양식을 모두 입력해주세요.', '', [{ text: '확인', style: 'cancel', }]);
        else
            Alert.alert('게시물을 수정하시겠습니까?',
                '',
                [
                    { text: '취소' },
                    { text: '확인', onPress: this.submitCorrection.bind(this) }
                ])
    }

    /* 수정 버튼 정의 함수 */
    submitCorrection() {
        var uid = USER_INFO.uid;

        /* 파이어베이스에 사용자 정보 삽입 */
        firebase.database().ref('MatchingInfo/' + uid).update(
            {
                money: this.state.money,
                content: this.state.content,
                email: USER_INFO.email,
                uid: uid
            }
        )

        MATCHING_INFO.title = '';
        MATCHING_INFO.category = '카테고리 선택';
        MATCHING_INFO.money = '';
        MATCHING_INFO.content = '';

        this.setState({ title: '', category: '카테고리 선택', money: '', content: '' });

        Actions.pop();
    }

    /* 현재 게시물 삭제 */
    submitDeletion() {
        var uid = USER_INFO.uid;
        firebase.database().ref('MatchingInfo/' + uid).remove();

        this.setState({ title: '', category: '카테고리 선택', money: '', content: '' });
        
        Actions.pop();
    }

    /* 양식 내용 유지 함수 */
    setTitle(value) {
        MATCHING_INFO.title = value;
        this.setState({ title: MATCHING_INFO.title });
    }

    setMoney(value) {
        MATCHING_INFO.money = value;
        this.setState({ money: MATCHING_INFO.money });
    }

    setContent(value) {
        MATCHING_INFO.content = value;
        this.setState({ content: MATCHING_INFO.content });
    }

    render() {
        return (
            <View style={styles.container}>


                <DissmissKeyboard>
                    <View style={{ flex: 7, justifyContent: 'flex-start' }}>
                        <View style={{ flex: 0.5, flexDirection: 'row' }}>
                            <View style={{ flex: 9 }}></View>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => Alert.alert(
                                    '게시물을 삭제하시겠습니까?',
                                    '',
                                    [
                                        { text: '취소' },
                                        { text: '확인', onPress: () => this.submitDeletion() }
                                    ])}>
                                    <Icon name='ios-trash-outline' size={25} color='red' />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TextInput style={styles.inputStyle}
                            placeholder='제목'
                            selectionColor='#6E6E6E'
                            onChangeText={value => this.setTitle(value)}
                            value={this.state.title} />
                        <TouchableOpacity style={styles.inputStyle} onPress={this.categoryPage}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.textStyle}>{this.state.category}</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <Icon name='ios-chevron-forward-outline' size={21} color='#000000' />
                            </View>
                        </TouchableOpacity>
                        <TextInput style={styles.inputStyle}
                            placeholder='최대 지불가격 (원)'
                            keyboardType='numeric'
                            selectionColor='#6E6E6E'
                            onChangeText={value => this.setMoney(value)}
                            value={this.state.money} />
                        <TextInput style={styles.contentStyle}
                            placeholder='내용을 입력해주세요.'
                            selectionColor='#6E6E6E'
                            multiline={true}
                            onChangeText={value => this.setContent(value)}
                            value={this.state.content} />
                    </View>
                </DissmissKeyboard>

                <View style={{ flex: 1 }}>
                    <TouchableOpacity style={styles.buttonStyle} onPress={this.checkTextInput.bind(this)}>
                        <Text style={styles.buttonTextStyle}>게시물 수정</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputStyle: {
        width: 350,
        borderBottomWidth: 1,
        fontSize: 18,
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 5,
        flexDirection: 'row'
    },
    contentStyle: {
        width: 350,
        height: 150,
        borderBottomWidth: 1,
        fontSize: 18,
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    textStyle: {
        fontSize: 18,
        fontWeight: '500'
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
});