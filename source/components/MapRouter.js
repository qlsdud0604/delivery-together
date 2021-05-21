import React from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';

import MapPage from '../pages/MapPage';
import InfoPage from '../pages/InfoPage';

export default class MapRouter extends React.Component {
    render() {
        return (
            <Router>
                <Stack key="root" hideNavBar={true} >
                    <Scene key="mapPage" component={MapPage} initial={true} />
                    <Scene key="infoPage" component={InfoPage} />
                </Stack>
            </Router>
        )
    }
}