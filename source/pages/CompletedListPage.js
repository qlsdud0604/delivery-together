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
            items: []
        }
    }


    componentDidMount() {
        setTimeout(() => { this.setState({ items: this.getCompletedMatching() }) }, 1000);
    }

    /* 파이어베이스로부터 성사된 매칭 데이터 로드 */
    getCompletedMatching() {
        var completedList = [];

        var query = firebase.database().ref('completedMatching/' + USER_INFO.uid).orderByKey();

        query.on('value', (snapshot) => {
            const data = snapshot.val();

            for (var x in data) {
                completedList.push([data[x].title, data[x].category, data[x].star, x]);
            }
        })
        return completedList.reverse();
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.items.length === 0 &&
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20 }}>성사된 매칭 정보가 없습니다.</Text>
                    </View>}

                {this.state.items.length != 0 &&
                    <FlatList
                        keyExtractor={item => item.toString()}
                        data={this.state.items}
                        renderItem={({ item }) => <Item data={item} />}
                    />}
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        alignItems: 'center'
    }
});
