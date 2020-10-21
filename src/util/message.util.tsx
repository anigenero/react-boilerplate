import { isEmpty } from 'lodash';
import React, { ReactElement } from 'react';
import { Translate } from 'react-localize-redux';

export const helperText = (messages: string[]): ReactElement[] =>
    !isEmpty(messages) && messages.map((id, index) => (
        <Translate key={index} id={id}/>
    ));
