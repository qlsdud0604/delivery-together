import React from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';

import LoginPage from '../pages/LoginPage';
import signUpPage from '../pages/SignUpPage';

export default class LoginRouter extends React.Component {
    render() {
        return (
            <Router>
                <Stack key="root" hideNavBar={true} >
                    <Scene key="loginPage" component={LoginPage} initial={true} />
                    <Scene key="signUpPage" component={signUpPage} />
                </Stack>
            </Router>
        )
    }
}