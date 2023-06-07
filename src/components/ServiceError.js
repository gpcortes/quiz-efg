import { Button, Typography } from '@material-ui/core';
import React from 'react';

export default function ServiceUnavailableError() {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 25,
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <Typography
                variant="h1"
                style={{
                    textAlign: 'center',
                }}
            >
                Serviço Indisponível
            </Typography>
            <Typography
                variant="h5"
                style={{
                    textAlign: 'center',
                }}
            >
                Este serviço está temporariamente indisponível. <br /> Por favor,
                tente novamente mais tarde.
            </Typography>
            <Typography
                variant="h5"
                style={{
                    textAlign: 'center',
                }}
            >
                Recarregue a página para tentar novamente.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => window.location.reload(true)}
            >
                Recarregar
            </Button>
        </div>
    );
}
