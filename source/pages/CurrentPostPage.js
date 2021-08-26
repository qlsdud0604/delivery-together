import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, Alert, ScrollView } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Toast from 'react-native-root-toast'

import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

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

export default class MatchingPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            category: '',
            money: '',
            content: ''
        };
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

    /* 양식 입력 확인 함수 */
    checkTextInput() {
        if (this.state.title === '' || this.state.category === '' || this.state.money === '' || this.state.content === '')
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
                title: this.state.title,
                category: this.state.category,
                money: this.state.money,
                content: this.state.content
            }
        )

        Toast.show('게시물이 수정되었습니다.', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER,
            shadow: false,
            animation: true
        });

        Actions.pop();
    }

    /* 현재 게시물 삭제 */
    submitDeletion() {
        var uid = USER_INFO.uid;
        firebase.database().ref('MatchingInfo/' + uid).remove();

        this.setState({ title: '', category: '', money: '', content: '' });

        Toast.show('게시물이 삭제되었습니다.', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER,
            shadow: false,
            animation: true
        });

        Actions.pop();
    }

    render() {
        return (
            <View style={styles.container}>

                <DissmissKeyboard>
                    <View style={{ flex: 9, justifyContent: 'center' }}>
                        <ScrollView >
                            {/* 제목 양식 */}
                            <Text style={{ fontSize: 22, fontWeight: '400', marginLeft: 5, marginTop: 30 }}>제목</Text>
                            <TextInput style={styles.inputStyle}
                                placeholder='제목을 입력해 주세요.'
                                selectionColor='#6E6E6E'
                                value={this.state.title}
                                onChangeText={value => this.setState({ title: value })} />

                            {/* 카테고리 양식 */}
                            <Text style={{ fontSize: 22, fontWeight: '400', marginLeft: 5, marginBottom: 5 }}>카테고리</Text>
                            <RadioButton.Group value={this.state.category} onValueChange={value => this.setState({ category: value })} >
                                <View style={{ flexDirection: 'row', justifyContent: 'center', width: 350 }}>
                                    <RadioButton.Item style={{ borderTopWidth: 0.3, borderBottomWidth: 0.3, borderRightWidth: 0.3, width: 120 }} label='한식' labelStyle={{ fontSize: 13 }} value='한식' color='black' />
                                    <RadioButton.Item style={{ borderTopWidth: 0.3, borderBottomWidth: 0.3, borderRightWidth: 0.3, width: 120 }} label='분식' labelStyle={{ fontSize: 13 }} value='분식' color='black' />
                                    <RadioButton.Item style={{ borderTopWidth: 0.3, borderBottomWidth: 0.3, borderRightWidth: 0.3, width: 120 }} label='디저트' labelStyle={{ fontSize: 13 }} value='디저트' color='black' />
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', width: 350 }}>
                                    <RadioButton.Item style={{ borderBottomWidth: 0.3, borderRightWidth: 0.3, width: 120 }} label='일식' labelStyle={{ fontSize: 13 }} value='일식' color='black' />
                                    <RadioButton.Item style={{ borderBottomWidth: 0.3, borderRightWidth: 0.3, width: 120 }} label='치킨' labelStyle={{ fontSize: 13 }} value='치킨' color='black' />
                                    <RadioButton.Item style={{ borderBottomWidth: 0.3, borderRightWidth: 0.3, width: 120 }} label='중식' labelStyle={{ fontSize: 13 }} value='중식' color='black' />
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', width: 350 }}>
                                    <RadioButton.Item style={{ borderBottomWidth: 0.3, borderRightWidth: 0.3, width: 120 }} label='피자' labelStyle={{ fontSize: 13 }} value='피자' color='black' />
                                    <RadioButton.Item style={{ borderBottomWidth: 0.3, borderRightWidth: 0.3, width: 120 }} label='양식' labelStyle={{ fontSize: 13 }} value='양식' color='black' />
                                    <RadioButton.Item style={{ borderBottomWidth: 0.3, borderRightWidth: 0.3, width: 120 }} label='야식' labelStyle={{ fontSize: 13 }} value='야식' color='black' />
                                </View>
                            </RadioButton.Group>

                            {/* 지불가격 양식 */}
                            <Text style={{ fontSize: 22, fontWeight: '400', marginLeft: 5, marginTop: 30 }}>최대 지불가격</Text>
                            <TextInput style={styles.inputStyle}
                                placeholder='최대 지불가격(원)'
                                keyboardType='numeric'
                                selectionColor='#6E6E6E'
                                value={this.state.money}
                                onChangeText={value => this.setState({ money: value })} />

                            {/* 내용 양식 */}
                            <Text style={{ fontSize: 22, fontWeight: '400', marginLeft: 5 }}>내용</Text>
                            <TextInput style={styles.contentStyle}
                                placeholder='내용을 입력해주세요.'
                                selectionColor='#6E6E6E'
                                multiline={true}
                                value={this.state.content}
                                onChangeText={value => this.setState({ content: value })} />
                        </ScrollView>
                    </View>
                </DissmissKeyboard>

                {/* 매칭 등록 버튼 */}
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View>
                        <TouchableOpacity style={styles.buttonStyle01} onPress={this.checkTextInput.bind(this)}>
                            <Text style={styles.buttonTextStyle}>매칭 수정</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.buttonStyle02} onPress={() => Alert.alert(
                            '게시물을 삭제하시겠습니까?',
                            '',
                            [
                                { text: '취소' },
                                { text: '확인', onPress: () => this.submitDeletion() }
                            ])}>
                            <Text style={styles.buttonTextStyle}>매칭 삭제</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center'
    },
    scrollViewStyle: {
        flex: 9,
        justifyContent: 'center'
    },
    inputStyle: {
        width: 350,
        borderWidth: 0.5,
        borderRadius: 10,
        fontSize: 18,
        marginTop: 5,
        marginBottom: 30,
        paddingVertical: 10,
        paddingHorizontal: 5,
        flexDirection: 'row'
    },
    contentStyle: {
        width: 350,
        height: 150,
        borderWidth: 0.5,
        borderRadius: 10,
        fontSize: 18,
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    textStyle: {
        fontSize: 18,
        fontWeight: '500'
    },
    buttonStyle01: {
        backgroundColor: '#000',
        width: 170,
        borderRadius: 25,
        marginVertical: 5,
        paddingVertical: 12,
        marginRight: 5
    },
    buttonStyle02: {
        backgroundColor: 'red',
        width: 170,
        borderRadius: 25,
        marginVertical: 5,
        paddingVertical: 12,
        marginLeft: 5
    },
    buttonTextStyle: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center'
    }
});