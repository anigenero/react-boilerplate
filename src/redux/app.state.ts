import { RouterState } from 'connected-react-router';
import { LocalizeState } from 'react-localize-redux';

export interface IAppState {

    localize: LocalizeState;
    router: RouterState;

}
