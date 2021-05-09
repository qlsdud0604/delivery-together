import React from 'react';
import { StyleSheet, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { locations } from '../components/Locations';

export default class MapPage extends React.Component {

    render() {
        return (
            <MapView
                style={styles.container}
                initialRegion={{
                    latitude: 35.8318287,
                    longitude: 128.7609706,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}>
                {
                    locations.map((marker, index) => (
                        <Marker
                            key={index}
                            coordinate={{
                                latitude: marker.latitude,
                                longitude: marker.longitude
                            }}
                            title={marker.title} >
                            <Image
                                source={require('../Images/Marker.png')}
                                style={{ width: 50, height: 50 }} />
                        </Marker>
                    ))
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