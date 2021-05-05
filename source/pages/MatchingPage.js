import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';

const DissmissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

export default class MatchingPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            category: '카테고리 선택'
        }
    }


    categoryPage() {
        Actions.categoryPage();
    }

    render() {
        return (
            <View style={styles.container}>
                <DissmissKeyboard>
                    <View style={{ flex: 9, justifyContent: 'center' }}>
                        <TextInput style={styles.inputStyle}
                            placeholder='제목'
                            selectionColor='#6E6E6E' />
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
                            selectionColor='#6E6E6E' />
                        <TextInput style={styles.contentStyle}
                            placeholder='내용을 입력해주세요.'
                            selectionColor='#6E6E6E'
                            multiline={true}
                        />
                    </View>
                </DissmissKeyboard>

                <View style={{ flex: 1 }}>
                    <TouchableOpacity style={styles.buttonStyle}>
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