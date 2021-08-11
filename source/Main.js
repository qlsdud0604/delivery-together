import React from 'react';
import { StyleSheet, View } from 'react-native';

import LoadingPage from './pages/LoadingPage';
import MainRouter from './components/MainRouter';

export default class Main extends React.Component {
    state = {
        isLoading: true
    }
    render() {
        return (
            <View style={styles.container}>
                {(this.state.isLoading === true) && <LoadingPage />}
                {(this.state.isLoading !== true) && <MainRouter />}
            </View>

        )
    }

    async componentDidMount() {
        setTimeout(() => { this.setState({ isLoading: false }) }, 11000);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});