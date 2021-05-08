import React from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';

import MatchingPage from '../pages/MatchingPage';
import CategoryPage from '../pages/CategoryPage';

export default class MatchingRouter extends React.Component {
    render() {
        return (
            <Router>
                <Stack key="root" hideNavBar={true} >
                    <Scene key="matchingPage" component={MatchingPage} initial={true} />
                    <Scene key="categoryPage" component={CategoryPage} />
                </Stack>
            </Router>
        )
    }
}