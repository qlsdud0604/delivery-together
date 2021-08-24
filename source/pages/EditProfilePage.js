import React from 'react';
import { StyleSheet, View, TouchableOpacity, ImageBackground, TextInput, TouchableWithoutFeedback, Text, Keyboard, SafeAreaView } from 'react-native';

import { Actions } from 'react-native-router-flux';
import USER_INFO from "../components/UserInfo";
import Icon from 'react-native-vector-icons/Ionicons';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import firebase from "firebase";

/* 파이어베이스 연결 */
if (firebase.apps.length === 0)
    firebase.initializeApp(firebaseConfig);

/* 스크린 빈공간을 눌렀을 때 키보드 제거 함수 */
const DissmissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

export default class EditProfilePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputText: '',

            name: USER_INFO.name,
            photoURL: USER_INFO.photoURL,
            email: USER_INFO.email,
            phoneNumber: USER_INFO.phoneNumber
        };
    }

    /* 수정된 프로필 정보로 갱신 */
    componentDidMount() {
        var query = firebase.database().ref('UsersInfo').orderByKey();

        query.on('value', (snapshot) => {
            const data = snapshot.val();
            this.setState({ name: data[USER_INFO.uid].name });
            this.setState({ photoURL: data[USER_INFO.uid].profileImage });
        })
    }

    /* 이전 페이지 이동 */
    myPage() {
        Actions.pop();
    }

    /* firebase에 수정된 프로필 정보 갱신 */
    editPofile() {
        firebase.database().ref('UsersInfo/' + USER_INFO.uid).update(
            {
                name: this.state.inputText,
                profileImage: this.state.photoURL

            }
        )
        Actions.pop();
    }

    /* 사용자 갤러리 접근 */
    pickImage = async () => {
        const { status_roll } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
        });
        if (!result.cancelled) {
            this.setState({ photoURL: result.uri });
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <DissmissKeyboard>
                    {/* 사진 변경창 */}
                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 9 }}>
                        <TouchableOpacity onPress={this.pickImage}>
                            <View style={{
                                height: 100,
                                width: 100,
                                borderRadius: 15,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <ImageBackground
                                    source={{ uri: this.state.photoURL }}
                                    style={{ height: 100, width: 100 }}
                                    imageStyle={{ borderRadius: 15 }}
                                >
                                    <View style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <Icon name="camera" size={35} color="#fff" style={{
                                            opacity: 0.7,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderWidth: 1,
                                            borderColor: '#fff',
                                            borderRadius: 10,
                                        }} />
                                    </View>
                                </ImageBackground>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ marginTop: 10, fontSize: 13, color: '#6E6E6E' }}>프로필 사진 변경</Text>
                            </View>
                        </TouchableOpacity>

                        {/* 닉네임 입력창 */}
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <View style={styles.inputStyle}>
                                <TextInput style={styles.inputTextStyle}
                                    placeholder=" 변경할 이름을 입력해 주세요."
                                    placeholderTextColor="#6E6E6E"
                                    autoCorrect={false}
                                    selectionColor='#6E6E6E'
                                    onChangeText={value => { this.setState({ inputText: value }) }} />
                            </View>
                        </View>
                    </View>
                </DissmissKeyboard>

                {/* 수정 버튼 */}
                <View style={{ flex: 1 }}>
                    <TouchableOpacity style={styles.buttonStyle} onPress={this.editPofile.bind(this)}>
                        <Text style={styles.textStyle}>프로필 수정</Text>
                    </TouchableOpacity>
                </View>
            </View >
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
    inputTextStyle: {
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingTop: 10,
        fontSize: 17,
        color: '#000'
    },
    inputStyle: {
        width: 350,
        borderBottomWidth: 0.5,
        borderBottomColor: '#000',
        marginVertical: 20,
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    buttonStyle: {
        backgroundColor: "#000",
        width: 350,
        borderRadius: 25,
        marginVertical: 5,
        paddingVertical: 12
    },
    textStyle: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "500",
        textAlign: "center"
    }
});
