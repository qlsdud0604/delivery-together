import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';

const category = [
    {
        label: '한식'
    },
    {
        label: '분식'
    },
    {
        label: '카페, 디저트'
    },
    {
        label: '돈까스, 회, 일식'
    },
    {
        label: '치킨'
    },
    {
        label: '피자'
    },
    {
        label: '양식'
    },
    {
        label: '중식'
    },
    {
        label: '족발, 보쌈'
    },
    {
        label: '야식'
    },
    {
        label: '찜, 탕'
    },
    {
        label: '패스트푸드'
    }
]

export default class CategoryPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ''
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 9, justifyContent: 'center' }}>
                    <RadioButton.Group onValueChange={value => this.setState({ value })} value={this.state.value}>
                        {category.map((data, index) =>
                            <RadioButton.Item key={index} style={styles.radioStyle} label={data.label} value={data.label} color='black' />
                        )}
                    </RadioButton.Group>
                </View>

                <View style={{ flex: 1, alignItems: 'center' }}>
                    <TouchableOpacity style={styles.buttonStyle}>
                        <Text style={styles.buttonTextStyle}>선택 완료</Text>
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
        justifyContent: 'center'
    },
    radioStyle: {
        borderBottomWidth: 0.3,
        paddingBottom: 2.5
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