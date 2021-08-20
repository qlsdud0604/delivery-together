import React from 'react';
import { StyleSheet, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import firebaseConfig from '../config/FirebaseConfig';
import MATCHING_INFO from '../components/MatchingInfo';

/* 파이어베이스 연결 */
if (firebase.apps.length === 0)
    firebase.initializeApp(firebaseConfig);

export default class MapPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            markers: []
        };
    }

    componentDidMount() {
        var query = firebase.database().ref('MatchingInfo').orderByKey();

        query.on('value', (snapshot) => {
            const data = snapshot.val();
            this.setState({ markers: Object.values(data) });
        })
    }

    /* InfoPage 이동 함수 */
    infoPage(title, email, category, money, content, uid) {
        Actions.infoPage({ title: title, email: email, category: category, money: money, content: content, uid: uid });
    }

    render() {
        return (
            <MapView
                style={styles.container}
                initialRegion={{
                    latitude: MATCHING_INFO.latitude,
                    longitude: MATCHING_INFO.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005
                }}>
                {
                    this.state.markers.map((marker, index) => (
                        <Marker
                            key={index}
                            coordinate={{
                                latitude: marker.latitude,
                                longitude: marker.longitude
                            }}
                            onPress={() => this.infoPage(marker.title, marker.email, marker.category, marker.money, marker.content, marker.uid)}>
                            <Image
                                source={require('../Images/Marker.png')}
                                style={{ width: 35, height: 35 }} />
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