import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';

const theme = createTheme({
    typography: {
        fontFamily: ['Open Sans'].join(','),
    },
    overrides: {
        MuiButton: {
            root: {
                background: 'linear-gradient(45deg, #007ea5 30%, #2dac6a 90%)',
                borderRadius: 10,
                border: 0,
                color: 'white',
                height: 48,
                padding: '0 30px',
                boxShadow: '0 3px 5px 2px rgba(82, 78, 78, .5)',
            },
        },
        MuiRadio: {
            root: {
                color: '#2dac6a',
                '&$checked': {
                    color: '#2dac6a',
                },
            },
        },
        MuiIconButton: {
            root: {
                '&:hover': {
                    color: '#2dac6a',
                },
            },
        },
    },
});

theme.typography = {
    ...theme.typography,
    h1: {
        ...theme.typography.h1,
        fontSize: '2.5rem',
        fontWeight: 700,
        color: '#2dac6a',
    },
    h2: {
        ...theme.typography.h2,
        fontSize: '2rem',
        fontWeight: 700,
        color: '#2dac6a',
    },
    h3: {
        ...theme.typography.h3,
        fontSize: '1.75rem',
        fontWeight: 700,
        color: '#2dac6a',
    },
    h4: {
        ...theme.typography.h4,
        fontSize: '1.5rem',
        color: '#2dac6a',
    },
    h5: {
        ...theme.typography.h5,
        fontSize: '1.25rem',
        color: '#2dac6a',
    },
    h6: {
        ...theme.typography.h6,
        fontSize: '1rem',
        color: '#2dac6a',
    },
    body1: {
        ...theme.typography.body1,
        fontSize: '1.5rem',
        textAlign: 'justify',
        color: '#2dac6a',
    },
    body2: {
        ...theme.typography.body2,
        fontSize: '0.875rem',
        textAlign: 'justify',
        color: '#2dac6a',
    },
    button: {
        ...theme.typography.button,
        fontSize: '0.875rem',
    },
    caption: {
        ...theme.typography.caption,
        fontSize: '0.75rem',
    },
    overline: {
        ...theme.typography.overline,
        fontSize: '0.75rem',
    },
};

theme.breakpoints = {
    ...theme.breakpoints,
    xs: 0,
    sm: 425,
    md: 960,
    lg: 1280,
    xl: 1920,
};

theme.palette = {
    ...theme.palette,
    background: {
        default: '#fafafa',
    },
};

export default responsiveFontSizes(theme);
