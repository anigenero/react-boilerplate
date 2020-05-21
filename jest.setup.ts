import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

// set the configuration variables here
(global as any).configuration = {
    googleAnalyticsId: '',
    graphqlEndpoint: 'http://localhost:4000/graphql'
};

jest.mock('react-localize-redux', () => {

    const LocalizeProvider = jest.requireActual('react-localize-redux').LocalizeProvider;
    const localizeReducer = jest.requireActual('react-localize-redux').localizeReducer;
    const withLocalize = jest.requireActual('react-localize-redux').withLocalize;

    const translate = jest.requireActual('./src/__testutils__/translate.mock').mockTranslate;

    return {
        initialize: jest.fn(),
        LocalizeProvider,
        localizeReducer,
        Translate: (props: any) => {
            if (props.children) {
                return props.children({translate});
            } else {
                return translate(props.id);
            }
        },
        withLocalize
    };

});
