import React from 'react';
import { StyleSheet, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import INFO from '../components/MatchingInfo';

export default class MapPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MapView style={styles.container}>
                {(INFO.latitude !== null) && (INFO.longitude !== null) &&
                    <Marker
                        coordinate={{
                            latitude: INFO.latitude,
                            longitude: INFO.longitude
                        }}
                        title={INFO.title} >
                        <Image
                            source={require('../Images/Marker.png')}
                            style={{ width: 50, height: 50 }} />
                    </Marker>
                }
            </MapView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})