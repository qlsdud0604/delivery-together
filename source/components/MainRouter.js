import React from 'react';
import { Actions, Router, Scene } from 'react-native-router-flux';
import { View, Text, TouchableOpacity } from 'react-native';

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
import EditProfilePage from '../pages/EditProfilePage';
import CompletedListPage from '../pages/CompletedListPage';
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
                        {focused && <Icon name='ios-person' size={25} color='#000' />}
                        {!focused && <Icon name='ios-person-outline' size={25} color='#000' />}
                        <Text style={{ fontSize: 10 }}>마이페이지</Text>
                    </View>)
        }
    }

    /* 뒤로가기 버튼 커스텀 */
    renderBackButton() {
        return (
            <TouchableOpacity
                onPress={() => Actions.pop()}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text> </Text>
                    <Icon name='ios-arrow-back' size={30} color='#000' />
                </View>
            </TouchableOpacity>
        );
    };



    render() {
        return (
            <Router>
                <Scene key='root'>
                    <Scene
                        key='tabbar'
                        tabs={true}
                        showLabel={false}
                        tabBarStyle={{ backgroundColor: '#fff', height: 50 }}
                        hideNavBar={true}>

                        {/* MapPage -> InfoPage -> ChatPage */}
                        <Scene key='mapButton' title='나의 주변' hideNavBar={true} icon={this.tabIcon}>
                            <Scene key='mapPage' component={MapPage} />
                            <Scene key='infoPage' hideNavBar={false} back={true} tintColor='black' renderBackButton={this.renderBackButton} component={InfoPage} />
                            <Scene key='chatPage' hideNavBar={false} back={true} tintColor='black' renderBackButton={this.renderBackButton} component={ChatPage} />
                        </Scene>

                        {/* MatchingPage -> CategoryPage */}
                        <Scene key='matchingButton' title='매칭 등록' hideNavBar={true} icon={this.tabIcon}>
                            <Scene key='matchingPage' component={MatchingPage} />
                            <Scene key='categoryPage' hideNavBar={false} back={true} tintColor='black' title='카테고리 선택' renderBackButton={this.renderBackButton} component={CategoryPage} />
                        </Scene>

                        {/* LoginPage -> MyPage */}
                        <Scene key='myButton' title='마이페이지' icon={this.tabIcon} initial={true}>
                            <Scene key='root' hideNavBar={true} initial={!this.state.isLoggedIn} >
                                <Scene key='loginPage' component={LoginPage} />
                            </Scene>

                            <Scene key='app' hideNavBar={true} initial={this.state.isLoggedIn}>
                                <Scene key='myPage' component={MyPage} />
                                <Scene key='editProfilePage' hideNavBar={false} back={true} tintColor='black' title='프로필 수정' renderBackButton={this.renderBackButton} component={EditProfilePage} />
                                <Scene key='completedListPage' hideNavBar={false} back={true} tintColor='black' title='성사된 매칭' renderBackButton={this.renderBackButton} component={CompletedListPage} />
                            </Scene>
                        </Scene>
                    </Scene>



                </Scene>
            </Router>
        )
    }
}