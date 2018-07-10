import * as React from 'react';

import {LocalizeContextProps, Translate, withLocalize} from "react-localize-redux";
import injectSheet, {WithStyles} from "react-jss";
import {appStyles} from "./App.style";

export class App extends React.Component<WithStyles & LocalizeContextProps> {

    constructor(props: Readonly<WithStyles & LocalizeContextProps>) {

        super(props);

        const {initialize, addTranslationForLanguage} = this.props;

        initialize({
            languages: [{
                code: 'en-US',
                name: 'English (US)'
            }],
            options: {
                defaultLanguage: 'en-US',
                renderInnerHtml: false,
                renderToStaticMarkup: false
            }
        });

        const englishTranslations = require('../../assets/locale/en_US.json');

        addTranslationForLanguage(englishTranslations, 'en-US');

    }

    public render() {

        return (
            <Translate>
                {({translate}) => (
                    <div>{translate('app.name')}</div>
                )}
            </Translate>
        );
    }
}

export default withLocalize(injectSheet(appStyles)(App));
