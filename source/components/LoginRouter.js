import React from 'react';
import { Router, Scene } from 'react-native-router-flux';

import firebase from 'firebase';
import firebaseConfig from '../config/FirebaseConfig';

import LoginPage from '../pages/LoginPage';
import MyPage from '../pages/MyPage';
import USER_INFO from '../components/UserInfo';

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

export default class LoginRouter extends React.Component {

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
            }else{
                this.setState({ isLoggedIn: false });
            }
        }.bind(this));
    }

    componentWillUnmount(){
        this.setState({ isLoggedIn: USER_INFO.isLoggedIn });
    }

    render() {
        return (
            <Router>
                <Scene>
                    <Scene key="root" hideNavBar={true} initial={!this.state.isLoggedIn}>
                        <Scene key="loginPage" component={LoginPage} initial={true} />
                    </Scene>

                    <Scene key="app" hideNavBar={true} initial={this.state.isLoggedIn}>
                        <Scene key="myPage" component={MyPage} initial={true} />
                    </Scene>
                </Scene>
            </Router>
        )
    }
}