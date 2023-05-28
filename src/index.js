import React, { StrictMode } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ReactDOM from 'react-dom';
import theme from './Theme';

import App from './App';

const rootElement = document.getElementById('root');
ReactDOM.render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </StrictMode>,
    rootElement
);
