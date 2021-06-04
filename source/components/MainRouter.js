import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { StyleSheet, View, Text } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';
import firebaseConfig from '../config/FirebaseConfig';

import MapPage from '../pages/MapPage';
import InfoPage from '../pages/InfoPage';
import ChatPage from '../pages/ChatPage';

import MatchingPage from '../pages/MatchingPage';
import CategoryPage from '../pages/CategoryPage';

import LoginPage from '../pages/LoginPage';
import MyPage from '../pages/MyPage';
import USER_INFO from '../components/UserInfo';

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}


export default class MainRouter extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false
        }
    }

    componentDidMount() {
        this.checkIfLoggedIn();
    }

    checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                USER_INFO.isLoggedIn = true;
                USER_INFO.name = user.providerData[0].displayName;
                USER_INFO.email = user.providerData[0].email;
                USER_INFO.uid = user.uid;
                USER_INFO.photoURL = user.providerData[0].photoURL;
                USER_INFO.phoneNumber = user.providerData[0].phoneNumber;
                this.setState({ isLoggedIn: true });
            } else {
                this.setState({ isLoggedIn: false });
            }
        }.bind(this));
    }

    componentWillUnmount() {
        this.setState({ isLoggedIn: USER_INFO.isLoggedIn });
    }

    /* 화면 전환바 아이콘 */
    tabIcon = ({ focused, title }) => {
        switch (title) {
            case '나의 주변':
                return (
                    <View style={{ alignItems: 'center' }}>
                        {focused && <Icon name='ios-location-sharp' size={25} color='#000' />}
                        {!focused && <Icon name='ios-location-outline' size={25} color='#000' />}
                        <Text style={{ fontSize: 10 }}>나의 주변</Text>
                    </View>)
            case '매칭 등록':
                return (
                    <View style={{ alignItems: 'center' }}>
                        {focused && <Icon name='ios-add-circle' size={25} color='#000' />}
                        {!focused && <Icon name='ios-add-circle-outline' size={25} color='#000' />}
                        <Text style={{ fontSize: 10 }}>매칭 등록</Text>
                    </View>)
            case '마이페이지':
                return (
                    <View style={{ alignItems: 'center' }}>
                        {focused && <Icon name="ios-person" size={25} color="#000" />}
                        {!focused && <Icon name="ios-person-outline" size={25} color="#000" />}
                        <Text style={{ fontSize: 10 }}>마이페이지</Text>
                    </View>)
        }
    }



    render() {
        return (
            <Router>
                <Scene key='root'>
                    <Scene
                        key='tabbar'
                        tabs={true}
                        showLabel={false}
                        tabBarStyle={{ backgroundColor: '#fff' }}
                        hideNavBar={true} >

                        {/* MapPage -> InfoPage -> ChatPage */}
                        <Scene key='mapButton' title='나의 주변' hideNavBar={true} icon={this.tabIcon}>
                            <Scene key='mapPage' component={MapPage} />
                            <Scene key='infoPage' component={InfoPage} />
                            <Scene key='chatPage' component={ChatPage} />
                        </Scene>

                        {/* MatchingPage -> CategoryPage */}
                        <Scene key='matchingButton' title='매칭 등록' hideNavBar={true} icon={this.tabIcon}>
                            <Scene key='matchingPage' component={MatchingPage} />
                            <Scene key="categoryPage" component={CategoryPage} />
                        </Scene>

                        {/* LoginPage -> MyPage */}
                        <Scene key='myButton' title='마이페이지' hideNavBar={true} icon={this.tabIcon}>
                            <Scene key="root" hideNavBar={true} initial={!this.state.isLoggedIn} >
                                <Scene key="loginPage" component={LoginPage} />
                            </Scene>

                            <Scene key="app" hideNavBar={true} initial={this.state.isLoggedIn}>
                                <Scene key="myPage" component={MyPage} />
                            </Scene>
                        </Scene>
                    </Scene>



                </Scene>
            </Router>
        )
    }
}