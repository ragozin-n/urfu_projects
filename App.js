// eslint-disable-next-line unicorn/filename-case
import React, {Component} from 'react';
// eslint-disable-next-line import/named
import {AppLoading} from 'expo';
import {Root} from 'native-base';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createStore, applyMiddleware} from 'redux';
import {toast} from './src/middleware/toast';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
import config from './src/config';
import Router from './src/router';

export default class App extends Component {
	state = {
		appIsReady: false
	}
	async componentWillMount() {
		/* eslint-disable camelcase, import/no-extraneous-dependencies  */
		await Expo.Font.loadAsync({
			Roboto: require('native-base/Fonts/Roboto.ttf'),
			Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
			Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf')
		});
		/* eslint-enable camelcase, import/no-extraneous-dependencies  */
		firebase.initializeApp(config);
		this.setState({appIsReady: true});
	}

	render() {
		const store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(ReduxThunk, toast)));
		if (!this.state.appIsReady) {
			return <AppLoading/>;
		}
		return (
			<Root>
				<Provider store={store}>
					<Router/>
				</Provider>
			</Root>
		);
	}
}
