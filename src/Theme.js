import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';

const theme = createTheme({
    typography: {
        fontFamily: ['Open Sans'].join(','),
    },
    overrides: {
        MuiButton: {
            root: {
                background: 'linear-gradient(45deg, #047FA2 30%, #2DAB6A 90%)',
                borderRadius: 10,
                border: 0,
                color: 'white',
                minHeight: 48,
                padding: '0 30px',
                // boxShadow: '0 3px 5px 2px rgba(82, 78, 78, .5)',
            },
        },
        MuiRadio: {
            root: {
                color: '#2DAB6A',
                '&$checked': {
                    color: '#2DAB6A',
                },
            },
        },
        MuiIconButton: {
            root: {
                '&:hover': {
                    color: '#2DAB6A',
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
        color: '#2DAB6A',
    },
    h2: {
        ...theme.typography.h2,
        fontSize: '2rem',
        fontWeight: 700,
        color: '#2DAB6A',
    },
    h3: {
        ...theme.typography.h3,
        fontSize: '1.75rem',
        fontWeight: 700,
        color: '#2DAB6A',
    },
    h4: {
        ...theme.typography.h4,
        fontSize: '1.5rem',
        color: '#2DAB6A',
    },
    h5: {
        ...theme.typography.h5,
        fontSize: '1.25rem',
        color: '#2DAB6A',
    },
    h6: {
        ...theme.typography.h6,
        fontSize: '1rem',
        color: '#2DAB6A',
    },
    body1: {
        ...theme.typography.body1,
        fontSize: '1.5rem',
        textAlign: 'justify',
        color: '#2DAB6A',
    },
    body2: {
        ...theme.typography.body2,
        fontSize: '0.875rem',
        textAlign: 'justify',
        color: '#2DAB6A',
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
        default: '#FAFAFA',
    },
};

export default responsiveFontSizes(theme);
