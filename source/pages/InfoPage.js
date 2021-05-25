import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, } from 'react-native';
import { Title, Caption } from 'react-native-paper';

export default class InfoPage extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                {/* 제목, 카테고리, 가격 */}
                <View style={styles.titleStyle}>
                    <View style={{ alignItems: 'flex-start' }}>
                        <Title style={{ fontSize: 18 }}>{this.props.title}</Title>
                        <Caption style={{ fontSize: 13 }} >{this.props.email}</Caption>
                        <Caption style={{ fontSize: 13 }} >카테고리 : {this.props.category}</Caption>
                        <Caption style={{ fontSize: 13 }}>최대 지불가격 : {this.props.money}원</Caption>
                    </View>
                </View>

                {/* 내용 */}
                <View style={styles.contentStyle}>
                    <Text style={{fontSize:15}}>{this.props.content}</Text>
                </View>

                {/* 매칭 신청 버튼 */}
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
    titleStyle: {
        flex: 4.5,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'flex-end',
        paddingLeft: 20,
        paddingBottom:20
    },
    contentStyle:{
        flex:4.5,
        borderTopWidth:0.5,
        borderColor:'#ddd',
        width:'100%',
        paddingLeft: 20,
        paddingTop:20

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