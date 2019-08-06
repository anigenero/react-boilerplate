import * as fs from 'fs';
import * as path from 'path';
import * as React from 'react';
import { TranslateFunction, TranslateOptions, TranslatePlaceholderData, TranslateValue } from 'react-localize-redux';

const _LOCALE_DIR = path.join(__dirname, '../src/assets/locale');
const _LOCALES: { [key: string]: any } = {};

(() => {

    const files: string[] = fs.readdirSync(_LOCALE_DIR);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < files.length; i++) {
        handleLocale(files[i]);
    }

    function handleLocale(file: string) {

        if (/\w+-\w+\.json/.test(file)) {

            const locale = file.match(/\w+-\w+\.json/)[0].replace('_', '-').replace('.json', '');
            const values = JSON.parse(fs.readFileSync(`${_LOCALE_DIR}/${file}`, 'utf-8'));

            if (_LOCALES[locale]) {
                _LOCALES[locale] = {
                    ..._LOCALES[locale],
                    ...values
                };
            } else {
                _LOCALES[locale] = values;
            }
        }

    }

})();

export const mockTranslate: TranslateFunction =
    (value: TranslateValue, data?: TranslatePlaceholderData, options?: TranslateOptions): any => {

        // sometimes we pass blank in cases like when validation errors are missing
        if (value === '') {
            return (<span />);
        }

        _verifyLocaleValueExists(value instanceof Array ? value : [value]);
        return (<span/>);

    };

/**
 * Verifies that the locale index exists across all locales
 *
 * @private
 *
 * @param {string[]} values - the keys to verify
 */
function _verifyLocaleValueExists(values: string[]) {

    const count = values.length;
    for (let i = 0; i < count; i++) {
        // tslint:disable-next-line:forin
        for (const key in _LOCALES) {
            try {
                expect(_LOCALES[key]).toHaveProperty(values[i]);
            } catch (err) {
                // tslint:disable-next-line:no-console
                console.error(`Missing translation for key '${values[i]}' in locale: '${key}'`);
                throw err;
            }
        }
    }

}
