import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, Alert, ScrollView } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Toast from 'react-native-root-toast'

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

export default class MatchingPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            category: '',
            money: '',
            content: '',
            name:USER_INFO.name,
            photoURL: USER_INFO.photoURL
        };
    }

    componentDidMount() {
        var query = firebase.database().ref('userInfo').orderByKey();

        query.on('value', (snapshot) => {
            const data = snapshot.val();
            this.setState({ name: data[USER_INFO.uid].name });
            this.setState({ photoURL: data[USER_INFO.uid].profileImage });
        })
    }

    /* 양식 입력 확인 함수 */
    checkTextInput() {
        if (USER_INFO.isLoggedIn === false)
            Alert.alert('로그인이 필요합니다.', '', [{ text: '확인', style: 'cancel', }]);
        else if (this.state.title === '' || this.state.category === '' || this.state.money === '' || this.state.content === '')
            Alert.alert('양식을 모두 입력해주세요.', '', [{ text: '확인', style: 'cancel', }]);
        else
            Alert.alert('매칭을 등록하시겠습니까?',
                '',
                [
                    { text: '취소' },
                    { text: '확인', onPress: this.submit.bind(this) }
                ])
    }

    /* 버튼 이벤트 정의 함수 */
    submit() {
        firebase.database().ref('matchingInfo').orderByKey().equalTo(USER_INFO.uid).once('value', snapshot => {
            if (snapshot.exists()) {
                Alert.alert('이미 등록된 게시물이 존재합니다.', '', [{ text: '확인', style: 'cancel', }]);
                this.setState({ title: '', category: '', money: '', content: '' });
            } else {

                /* 파이어베이스에 사용자 정보 삽입 */
                firebase.database().ref('matchingInfo/' + USER_INFO.uid).set(
                    {
                        latitude: MATCHING_INFO.latitude,
                        longitude: MATCHING_INFO.longitude,
                        title: this.state.title,
                        category: this.state.category,
                        money: this.state.money,
                        content: this.state.content,
                        name: this.state.name,
                        photoURL:this.state.photoURL,
                        uid: USER_INFO.uid
                    }
                )

                Toast.show('게시물이 등록되었습니다.', {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.CENTER,
                    shadow: false,
                    animation: true
                });

                this.setState({ title: '', category: '', money: '', content: '' });
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>

                <DissmissKeyboard>
                    <View style={{ flex: 9, justifyContent: 'center' }}>
                        <ScrollView >
                            {/* 제목 양식 */}
                            <Text style={{ fontSize: 22, fontWeight: '400', marginLeft: 5, marginTop:30 }}>제목</Text>
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
                <View style={{ flex: 1 }}>
                    <TouchableOpacity style={styles.buttonStyle} onPress={this.checkTextInput.bind(this)}>
                        <Text style={styles.buttonTextStyle}>매칭 등록</Text>
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
    buttonStyle: {
        backgroundColor: '#000',
        width: 350,
        borderRadius: 25,
        marginVertical: 5,
        paddingVertical: 12
    },
    buttonTextStyle: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center'
    }
});