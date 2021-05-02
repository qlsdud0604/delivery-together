import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default class MainPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            mode: 1
        };
    }

    mapPage() {
        this.setState({ mode: 1 });
    }

    myPage() {
        this.setState({ mode: 2 });
    }

    render() {
        return (
            <View style={styles.container}>


                <View style={styles.viewContainer}>
                    {(this.state.mode === 1) && <Text>Map 페이지 입니다.</Text>}
                    {(this.state.mode === 2) && <Text>My 페이지 입니다.</Text>}
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonStyle} onPress={this.mapPage.bind(this)}>
                        <Text style={styles.textStyle}>Map</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonStyle} onPress={this.myPage.bind(this)}>
                        <Text style={styles.textStyle}>My</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    viewContainer: {
        flex: 12,
        alignItems:'center',
        justifyContent:'center'
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 15,
        borderTopColor: 'black',
        borderTopWidth: 1
    },
    buttonStyle: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15,
    },
    textStyle: {
        color: '#000000',
        fontWeight: '400',
        fontSize: 30
    }
});
