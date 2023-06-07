import React from 'react';
import { Typography, CircularProgress } from '@material-ui/core';

export default function LoadingSpinner(props) {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 15,
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <CircularProgress />
            <Typography
                variant="h6"
                style={{
                    textAlign: 'center',
                }}
            >
                {props.message}
            </Typography>
        </div>
    );
};