import React from 'react';
import { ValidatorProvider } from 'react-class-validator';
import { Provider } from 'react-redux';
import { create } from 'react-test-renderer';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { AppState } from '../../../redux/app.state';
import App from '../App';

const mockStore = configureStore<Partial<AppState>>([]);

describe('App', () => {

    let store: MockStoreEnhanced<Partial<AppState>>;

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
                <ValidatorProvider>
                    <App/>
                </ValidatorProvider>
            </Provider>
        ).toJSON();

        expect(tree).toMatchSnapshot();

    });

});
