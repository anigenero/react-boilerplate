import * as React from 'react';
import { FunctionComponent, useEffect } from 'react';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { AppLocale } from '../../assets/locale/generated';

const englishTranslations = require('../../assets/locale/en-US.json');

export const App: FunctionComponent<LocalizeContextProps> = ({initialize, addTranslationForLanguage}) => {

    useEffect(() => {

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

        addTranslationForLanguage(englishTranslations, 'en-US');

    }, []);

    return (
        <div>
            <Translate id={AppLocale.app.longName}/>
        </div>
    );

};

export default withLocalize(App);
