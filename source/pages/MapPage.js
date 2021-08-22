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
        Actions.infoPage({ postTitle: title, postEmail: email, postCategory: category, postMoney: money, postContent: content, uid: uid, title: '매칭 상대 확인' });
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
                            {marker.category === "한식" ? <Image source={require('../Images/한식.png')} style={{ width: 40, height: 40 }} /> :
                                marker.category === "분식" ? <Image source={require('../Images/떡볶이.png')} style={{ width: 40, height: 40 }} /> :
                                    marker.category === "카페, 디저트" ? <Image source={require('../Images/카페.png')} style={{ width: 40, height: 40 }} /> :
                                        marker.category === "돈까스, 회, 일식" ? <Image source={require('../Images/초밥.png')} style={{ width: 40, height: 40 }} /> :
                                            marker.category === "치킨" ? <Image source={require('../Images/치킨.png')} style={{ width: 40, height: 40 }} /> :
                                                marker.category === "피자" ? <Image source={require('../Images/피자.png')} style={{ width: 40, height: 40 }} /> :
                                                    marker.category === "양식" ? <Image source={require('../Images/양식.png')} style={{ width: 40, height: 40 }} /> :
                                                        marker.category === "중식" ? <Image source={require('../Images/짜장면.png')} style={{ width: 40, height: 40 }} /> :
                                                            marker.category === "족발, 보쌈" ? <Image source={require('../Images/족발.png')} style={{ width: 40, height: 40 }} /> :
                                                                marker.category === "야식" ? <Image source={require('../Images/야식.png')} style={{ width: 40, height: 40 }} /> :
                                                                    marker.category === "찜, 탕" ? <Image source={require('../Images/탕.png')} style={{ width: 40, height: 40 }} /> :
                                                                        <Image source={require('../Images/패스트푸드.png')} style={{ width: 40, height: 40 }} />}
                        </Marker>))
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