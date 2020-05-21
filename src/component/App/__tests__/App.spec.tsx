import React from 'react';
import {create} from 'react-test-renderer';
import App from '../App';
import {Provider} from "react-redux";
import configureStore from 'redux-mock-store';
import {AppState} from "../../../redux/app.state";

const mockStore = configureStore<Partial<AppState>>([]);

describe('App', () => {

    let store: any;

    beforeEach(() => {
        store = mockStore({
            task: {
                tasks: []
            },
        });
    });

    test('should render correctly', () => {

        const tree = create(
            <Provider store={store}>
                <App/>
            </Provider>
        ).toJSON();

        expect(tree).toMatchSnapshot();

    });

});
