import React from 'react';
import renderer from 'react-test-renderer';
/* eslint-disable import/no-unresolved */
import App from './app';
/* eslint-enable import/no-unresolved */

it('renders without crashing', () => {
	const rendered = renderer.create(<App/>).toJSON();
	expect(rendered).toBeTruthy();
});
