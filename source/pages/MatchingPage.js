import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default class MatchingPage extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 9, justifyContent: 'center' }}>
                    <TextInput style={styles.inputStyle}
                        placeholder='제목'
                        selectionColor="#6E6E6E" />
                    <TouchableOpacity style={styles.inputStyle}>
                        <View>
                            <Text style={styles.textStyle}>카테고리 선택</Text>
                        </View>
                        <View style={{justifyContent:'flex-end', alignItems:'flex-end'}}>
                            <Icon name='ios-chevron-forward-outline' size={21} color='#000000'  />
                        </View>
                    </TouchableOpacity>
                    <TextInput style={styles.inputStyle}
                        placeholder='최대 지불가격 (원)'
                        selectionColor="#6E6E6E" />
                </View>

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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputStyle: {
        width: 350,
        borderBottomWidth: 1,
        fontSize: 18,
        marginVertical: 15,
        paddingVertical: 10,
        paddingHorizontal: 5,
        flexDirection: 'row'
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