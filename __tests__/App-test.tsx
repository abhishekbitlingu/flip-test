/**
 * @format
 */

import 'react-native';
import 'jest-fetch-mock';
import React from 'react';
import renderer from 'react-test-renderer';
import App from './../src/App';

it('renders correctly', () => {
  jest.useFakeTimers();
  const app = renderer.create(<App />).toJSON();
  expect(app).toMatchSnapshot();
});
