import React from 'react';
import { Text } from 'react-native';

export default class CategoryPage extends React.Component {
    render() {
        return (
            <Text style={styles.container}>카테고리 페이지 입니다.</Text>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});