// eslint-disable-next-line unicorn/filename-case
import React from 'react';
import renderer from 'react-test-renderer';
// eslint-disable-next-line import/no-unresolved
import App from './app';

it('renders without crashing', () => {
	const rendered = renderer.create(<App/>).toJSON();
	expect(rendered).toBeTruthy();
});
