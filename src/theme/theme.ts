import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { GreenColor } from './colors';

export const theme = createMuiTheme({
    palette: {
        primary: {
            ...GreenColor
        },
        secondary: {
            main: '#fff',
            contrastText: GreenColor['400']
        }
    }
});
