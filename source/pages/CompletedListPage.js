import React from 'react';
import { FlatList, Text, StyleSheet, View, TouchableOpacity } from 'react-native';

import Item from '../components/CompletedItem'
import firebase from 'firebase';
import firebaseConfig from '../config/FirebaseConfig';

import USER_INFO from "../components/UserInfo";

/* 파이버베이스 연결 */
if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

export default class CompletedListPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [[]]
        }
    }

    /* 파이어베이스로부터 성사된 매칭 데이터 로드 */
    componentDidMount() {
        var query = firebase.database().ref('userInfo/' + USER_INFO.uid + '/completedMatching').orderByKey();

        query.on('value', (snapshot) => {
            const data = snapshot.val();
            this.state.items.pop();

            for (var x in data) {
                this.state.items.push([data[x].title, data[x].category, data[x].star, x])
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    keyExtractor={item => item.toString()}
                    data={this.state.items}
                    renderItem={({ item }) => <Item data={item} />} />
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        alignItems:'center'
    }
});
