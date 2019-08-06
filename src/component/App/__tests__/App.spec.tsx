import * as React from 'react';
import { create } from 'react-test-renderer';

import App from '../App';

describe('App', () => {

    test('should render correctly', () => {

        const tree = create(
            <App/>
        ).toJSON();

        expect(tree).toMatchSnapshot();

    });

});
