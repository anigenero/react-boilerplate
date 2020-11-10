import green from '@material-ui/core/colors/green';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

export const theme = createMuiTheme({
    palette: {
        primary: {
            ...green
        },
        secondary: {
            main: '#fff',
            contrastText: green['400']
        }
    }
});
