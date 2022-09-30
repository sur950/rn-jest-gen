
// Auto-generated do not edit


/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';
import App from '../Home';


describe(`App Test`, () => {
  it('App - ', () => {
      const component = renderer.create(<App
         />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    })
	 
});
