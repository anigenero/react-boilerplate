import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

// set the configuration variables here
(global as any).configuration = {
    googleAnalyticsId: '',
    graphqlEndpoint: 'http://localhost:4000/graphql'
};

const nodeFetch = jest.requireActual('node-fetch');
const fetchMock = require('fetch-mock').sandbox();

Object.assign(fetchMock.config, nodeFetch, {
    fetch: nodeFetch
});

(global as any).fetch = fetchMock;

// tslint:disable:no-duplicate-string
jest.mock('react-localize-redux', () => {

    const LocalizeProvider = require.requireActual('react-localize-redux').LocalizeProvider;
    const localizeReducer = require.requireActual('react-localize-redux').localizeReducer;

    const translate = require.requireActual('./test/translate.mock').mockTranslate;

    return {
        localizeReducer,
        withLocalize: (component: any) => component,
        LocalizeProvider,
        Translate: (props: any) => {
            if (props.children) {
                return props.children({translate});
            } else {
                return translate(props.id);
            }
        }
    };

});
