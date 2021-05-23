import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';

import MATCHING_INFO from '../components/MatchingInfo';
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
            latitude: MATCHING_INFO.latitude,
            longitude: MATCHING_INFO.longitude,
            title: MATCHING_INFO.title,
            category: MATCHING_INFO.category,
            money: MATCHING_INFO.money,
            content: MATCHING_INFO.content
        };
        MATCHING_INFO.matchingPage = this;
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
            Alert.alert('매칭을 등록하시겠습니까?',
                '',
                [
                    { text: '취소' },
                    { text: '확인', onPress: this.submit.bind(this) }
                ])
    }

    /* 버튼 이벤트 정의 함수 */
    submit() {
        var number = 3;

        /* 파이어베이스의 저장된 데이터의 갯수 확인 */
        // var ref = firebase.database().ref('MatchingInfo/');
        // ref.once('value').then(function (snapshot) {
        //     var length = snapshot.numChildren();
        //     number = number + length;
        // })

        // console.log(number);
        
        /* 파이어베이스에 사용자 정보 삽입 */
        firebase.database().ref('MatchingInfo/' + number.toString()).set(
            {
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                title: this.state.title,
                category: this.state.category,
                money: this.state.money,
                content: this.state.content
            }
        )

        MATCHING_INFO.title = '';
        MATCHING_INFO.category = '카테고리 선택';
        MATCHING_INFO.money = '';
        MATCHING_INFO.content = '';

        this.setState({ title: '', category: '카테고리 선택', money: '', content: '' });
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
                    <View style={{ flex: 9, justifyContent: 'center' }}>
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