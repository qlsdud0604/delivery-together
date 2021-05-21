import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, } from 'react-native';

export default class InfoPage extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 9, justifyContent: 'center' }}>
                    <View style={styles.formStyle}>
                        <Text style={{fontSize:18}}>제목 : {this.props.title}</Text>
                    </View>
                    <View style={styles.formStyle}>
                        <Text style={{fontSize:18}}>카테고리 : {this.props.category}</Text>
                    </View>
                    <View style={styles.formStyle}>
                        <Text style={{fontSize:18}}>최대 지불가격(원) : {this.props.money}</Text>
                    </View>
                    <View style={styles.contentStyle}>
                        <Text style={{fontSize:18}}>내용 : {this.props.content}</Text>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity style={styles.buttonStyle} >
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
    formStyle: {
        width: 350,
        borderBottomWidth: 1,
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 5,
        flexDirection: 'row'
    },
    contentStyle: {
        width: 350,
        height: 150,
        borderBottomWidth: 1,
        marginVertical: 10,
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
    buttonTextStyle: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "500",
        textAlign: "center"
    }
})