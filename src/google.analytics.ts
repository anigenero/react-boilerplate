import * as GoogleAnalytics from 'react-ga';
import { browserHistory } from './redux/redux.store';
import { getGoogleAnalyticsId } from './util/config.util';

GoogleAnalytics.initialize(getGoogleAnalyticsId(), {
    debug: process.env.NODE_ENV !== 'production'
});

GoogleAnalytics.pageview(location.pathname + window.location.search);

// set the location in the Google Analytics when connect-react-router navigates
browserHistory.listen((location) => {
    GoogleAnalytics.set({page: location.pathname + location.search});
    GoogleAnalytics.pageview(location.pathname);
});
