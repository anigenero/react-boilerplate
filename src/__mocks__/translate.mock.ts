import { TranslateFunction, TranslateOptions, TranslatePlaceholderData, TranslateValue } from 'react-localize-redux';

import * as fs from 'fs';
import * as path from 'path';

const _LOCALE_DIR = path.join(__dirname, '../assets/locale');
const _LOCALES: { [key: string]: any } = {};

(() => {

    const files: string[] = fs.readdirSync(_LOCALE_DIR);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < files.length; i++) {
        handleLocale(files[i]);
    }

    function handleLocale(file: string) {
        const locale = file.replace('_', '-').replace('.json', '');
        _LOCALES[locale] = JSON.parse(fs.readFileSync(`${_LOCALE_DIR}/${file}`, 'utf-8'));
    }

})();

export const translate: TranslateFunction =
    (value: TranslateValue, data?: TranslatePlaceholderData, options?: TranslateOptions): string => {
        _verifyLocaleValueExists(value instanceof Array ? value : [value]);
        return '';
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
                console.error(`Missing translation for key '${values[i]}' in locale: '${key}'`);
                throw err;
            }
        }
    }

}
