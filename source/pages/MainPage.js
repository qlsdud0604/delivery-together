import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import MapRouter from '../components/MapRouter';
import MatchingRouter from '../components/MatchingRouter';
import LoginRouter from '../components/LoginRouter';

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

    matchingPage() {
        this.setState({ mode: 2 })
    }

    myPage() {
        this.setState({ mode: 3 });
    }

    render() {
        return (
            <View style={styles.container}>


                <View style={styles.viewContainer}>
                    {(this.state.mode === 1) && <MapRouter /> }
                    {(this.state.mode === 2) && <MatchingRouter />}
                    {(this.state.mode === 3) && <LoginRouter />}
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonStyle} onPress={this.mapPage.bind(this)}>
                        {(this.state.mode === 1) && <Icon name='ios-location-sharp' size={25} color='#000' />}
                        {(this.state.mode != 1) && <Icon name='ios-location-outline' size={25} color='#000' />}
                        <Text style={styles.textStyle}>나의 주변</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonStyle} onPress={this.matchingPage.bind(this)}>
                        {(this.state.mode === 2) && <Icon name='ios-add-circle' size={25} color='#000' />}
                        {(this.state.mode != 2) && <Icon name='ios-add-circle-outline' size={25} color='#000' />}
                        <Text style={styles.textStyle}>매칭 등록</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonStyle} onPress={this.myPage.bind(this)}>
                        {(this.state.mode === 3) && <Icon name="ios-person" size={25} color="#000" />}
                        {(this.state.mode != 3) && <Icon name="ios-person-outline" size={25} color="#000" />}
                        <Text style={styles.textStyle}>마이페이지</Text>
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
        flex: 12
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
        color: '#000',
        fontWeight: '400',
        fontSize: 10
    }
});
