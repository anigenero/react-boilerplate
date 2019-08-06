import { configure, getLogger as getLog4js2Logger } from '@log4js2/core';

configure({
    layout: '%d{DEFAULT} [%p] %c - %m %ex',
    appenders: ['Console'],
    virtualConsole: false
});

export const getLogger = (context?: any) =>
    getLog4js2Logger(context);
