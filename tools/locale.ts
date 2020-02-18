const fs = require('fs');
const {isEmpty, isObjectLike} = require('lodash');
const prettier = require('prettier');

fs.readFile('./src/assets/locale/en-US.json', (err: Error, data: any) => {

    if (err) {
        throw err;
    }

    const obj = JSON.parse(data.toString());
    const output = `export namespace AppLocale {
        ${_handleTree(obj)}
    }`;

    fs.writeFile('./src/assets/locale/generated.ts', prettier.format(output, {
        parser: 'typescript',
        singleQuote: true
    }), (writeError: Error) => {
        if (writeError) {
            throw writeError;
        }
    });

});

function _handleTree(obj: any, longKey?: string) {

    return Object.keys(obj).reduce((groups, value) => {

        const treeKey = !isEmpty(longKey) ? `${longKey}.${value}` : `${value}`;

        let result = groups;
        if (isObjectLike(obj[value])) {
            result += `export namespace ${value} { ${_handleTree(obj[value], treeKey)} };`;
        } else {
            result += `export const ${value} = '${treeKey}';`;
        }

        return result;

    }, '');

}
