 // eslint-disable-next-line unicorn/filename-case
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
import config from './src/config';
import Router from './src/router';

export default class App extends Component {
	componentWillMount() {
		firebase.initializeApp(config);
	}

	render() {
		const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

		return (
			<Provider store={store}>
				<Router/>
			</Provider>
		);
	}
}
